# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`milk` 是一个原生 HTML/CSS/JS 单页聊天应用，无构建工具、无框架，可直接静态托管或浏览器打开 `index.html`。当前内置《恋与深空》五人群聊 starter preset。所有 JS 通过 `index.html` 底部一串 `<script src="js/*.js?v=<assetVersion>">` 顺序加载到全局作用域 — 没有模块系统，函数和状态都挂在 window 上，加载顺序不可乱（见 `index.html` 末尾的脚本块，依次是 `config → utils → backup-engine → state → presets → core → features/* → games → features → data → onboarding → listeners → app`）。

## Common commands

```bash
# 1) 更新构建元信息（默认用当天日期 + 时间戳；也可显式传参）
scripts/update-build-meta.sh
scripts/update-build-meta.sh 2026.04.19 20260419-2

# 2) 跑无头冒烟（Playwright + python3 静态服务）
scripts/smoke-test.sh

# 可选环境变量
PORT=4174 SCREENSHOT_PATH=/tmp/milk-check.png scripts/smoke-test.sh
```

`smoke-test.sh` 会在 `/tmp/milk-pw` 里自举一个 Playwright 工作目录（首次会 `npm install playwright` 并 `npx playwright install chromium`），然后启 `python3 -m http.server`，跑完整 splash → 声明 → 引导 → 今日公告 → 系统 6 聊 → 设置页版本展示流程，输出一份 JSON checks 结果并落截图（默认 `/tmp/milk-smoke.png`）。任一 check 失败 exit 1。**没有单元测试框架、没有 `npm test` / `npm run lint`**，冒烟脚本是当前唯一的自动化回归。本仓库不提交 `package.json`，所有 npm 依赖只存在于临时目录里。

发布前最小步骤：`update-build-meta.sh` → `smoke-test.sh` → 检查 `index.html` / `build-info.json` / 改动到的 `js/` → commit & push。

## Architecture

### 系统 6 聊数据模型

固定 `1 群聊 + 5 角色单聊`。会话仍然落在通用的 `sessionList` + 各会话独立的 localforage key 上，系统聊天只是在多会话模型上加了 `systemChatKey / systemChatType / systemRoleId` 三个字段做标识。**不要改这些字段名，也不要改 storage key 前缀**（`APP_PREFIX = 'CHAT_APP_V3_'`，定义在 `js/config.js`）— 改了等于丢用户本地数据。

### 两条回复生成路径必须共用选卡内核

- 前台即时回复：`simulateReply()`
- 后台离屏回复：`generateSessionReplies()` → `deliverOffscreenReplies()`
- 调度入口：定时投递 `runBackgroundDeliveryTick()`、回前台补发 `runCatchupDelivery()`

不变量：单聊只能从当前角色专属组或公共组取回复，**绝对不能回退到裸 `customReplies` 池随机抽**；群聊必须先选发言成员、再按 `公共 40% / 角色主池 30% / 暧昧 20% / 链接 10%` 比例从对应池子取句子，发言者和字卡池必须一致。这一收口已经做过一轮，前台/后台不要再各自维护选卡规则，否则会重新出现"角色串卡"或"人对但卡错"。词卡集中在 `js/presets.js`。

### 后台消息的两类语义不要再合并

- `主动发消息` (`allowOffscreenDelivery`) → 控制离屏实时投递，只在用户切到别的会话时生效
- `恢复` (`restoreOnReturn`) → 控制切后台/回前台后的 catchup 补发；当前会话恢复补发时**不增加未读**

之前已经把这两个开关从同一判断里拆开，维护时不要再绑回去。

### 版本更新链路

不是热更新，是"检测 → 提示 → 受控刷新切新版"：页面内嵌 `window.__BUILD_INFO__` ↔ 远端 `build-info.json` 比对 `assetVersion`，发现新版本提示后，点 `立即更新` 先 `saveData()` 再 `location.reload()`。`scripts/update-build-meta.sh` 同步改 `build-info.json`、`index.html` 内嵌的 `version/buildTime/assetVersion`、以及所有 `<script src=...?v=>` / `styles.css?v=` 的 cache-bust 参数 — 三处必须同步，否则远端会拿到旧 JS。

### 稳定边界（改动需做完整浏览器级回归，不只语法检查）

- header 导航与首页入口
- 系统 6 聊的会话标识字段
- 前台/后台共享的回复选卡逻辑
- 后台消息配置的语义映射
- `build-info.json` 与 `index.html` 的版本参数对应关系

最低回归项见 `docs/regression-checklist.md`（首页/导航、系统 6 聊、回复正确性、后台消息、版本更新、外观与主题、移动端 ~390px）。

### 重构态度

仓库刚完成一轮产品形态重排，当前阶段是"边界收清 + 回归补齐"，不是大重构。

- **不要做**：重写 localforage 存储层、一次性把全局状态改成模块化容器、同时重做 UI + 数据架构
- **可以做的近端收口**（按优先级）：见 `docs/refactor-backlog.md` — 提取统一回复内核、提取后台消息模块、收口 header/home UI 状态、抽出版本更新小模块、补浏览器回归脚本

按功能切 `core.js` 可以做但要控节奏 —— 一次切一块，不要一把切完。

## 文件大小提示

`js/core.js`（~197K）、`js/listeners.js`（~131K）、`js/games.js`（~117K）、`js/features/reply-library.js`（~140K）、`css/styles.css`（~336K）和 `index.html`（~170K）都很大。Read 这些文件时务必带 offset/limit 或先 grep 定位，不要默认全量读。

## 协作流程

仓库使用 Plane + Multica + Forgejo 协作模式（详见 `docs/project-overview.md` "当前协作方式" 与 "Plane review index comment" / "Forgejo PR merge 自动收口" 节）。要点：

- claude-sidecar bot 负责所有 commit 的 author 身份；reviewer 全程独立，不参与提交。两者职责严格分离。
- **Review verdict（Approve / Request changes）只能由 reviewer 给出，bot 不得自我审阅。**
- Forgejo PR 的自然 merge 是任务最终完成信号；merge 前的任何状态更新（包括 bridge 的 in_review / ready_for_review 回写）都属过程状态，不代表最终交付。
- 普通 review comment 只是活动记录，不触发返工；只有 Request changes 才要求 worker 重新 `in_progress`。
- docs-only PR 不要求跑 smoke test，但 approve 前快速浏览 diff 确认范围（`git diff -- '*.md'`）。
