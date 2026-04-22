# milk 项目总览

milk 是一个原生 HTML/CSS/JS 单页聊天应用，当前内置《恋与深空》五人群聊 starter preset。核心设计目标是在群聊模式下模拟"多人同时说话"的体验，而不是随机挂头像。

## 文档地图

| 文档 | 用途 |
|------|------|
| [README.md](../README.md) | 项目介绍、词卡说明、使用入口、发布前步骤、冒烟脚本 |
| [docs/maintainer-guide.md](maintainer-guide.md) | 核心架构说明、回复生成路径、后台消息语义、稳定边界、推荐重构方向 |
| [docs/regression-checklist.md](regression-checklist.md) | 发布前必须覆盖的回归检查清单 |
| [docs/refactor-backlog.md](refactor-backlog.md) | 按投入产出比排序的重构候选清单 |

> 本文档是上述材料的入口总览层，不重复其中的细节内容。

## 项目定位

- **形态**：静态单页应用（无构建工具、无框架依赖），可直接浏览器打开或静态托管
- **主体功能**：群聊 + 5 个角色单聊（系统 6 聊）；支持词卡分层回复、后台离屏消息、主题切换
- **词卡维护**：集中在 `js/presets.js`，当前共 16 个分组、440 条回复
- **版本机制**：基于 `build-info.json` + `window.__BUILD_INFO__` 做"检测 → 提示 → 受控刷新"，不是热更新

## 维护边界

以下区域已完成一轮重排，应保守对待，改动须做完整浏览器级回归：

- header 导航与首页入口
- 系统 6 聊的会话标识字段
- 前台/后台共享的回复选卡逻辑
- 后台消息配置的语义映射（`主动发消息` / `恢复` 含义不同）
- `build-info.json` 与 `index.html` 的版本参数对应关系

详见 [docs/maintainer-guide.md — 最近改造后的稳定边界](maintainer-guide.md#最近改造后的稳定边界)。

## 版本与回归入口

**发布前最小步骤**（完整说明在 README）：

1. 运行 `scripts/update-build-meta.sh` 更新构建元信息
2. 运行 `scripts/smoke-test.sh` 跑无头冒烟测试
3. 检查本次 diff（`index.html`、`build-info.json`、涉及的 `js/` 文件）
4. `git add / commit / push`

**回归清单**：见 [docs/regression-checklist.md](regression-checklist.md)，涵盖首页导航、系统 6 聊、回复正确性、后台消息、版本更新、外观、移动端七个区域。

## 当前协作方式

本仓库当前使用 **Plane + Multica + Forgejo（策略 A）** 的协作模式：

- **Plane**：任务/需求跟踪，项目 key `MILK`，每轮改动先落 work item
- **Multica**：agent 执行任务，worker 负责实际改文档或代码
- **Forgejo**：主审阅面；本地 review 分支先 push 到 `local-forgejo`
- **GitHub**：正式发布面；通常只在审阅通过后再收最终结果

策略 A 的默认理解是：

1. 本地只维护一条真实工作分支，例如 `a123/<topic>`
2. 需要审阅时，优先把这条分支 push 到 `local-forgejo`
3. 在本地 Forgejo 开 PR / 做 review
4. 审阅通过后，再决定是否把同一分支或最终结果 push 到 GitHub

对 docs-only 任务，仍然要求把 `CR` 对象写清楚：

- 如果只是仓内快速人工确认，可用 `git diff -- '*.md'` 做最小 review
- 如果要测试正式闭环，仍以 Forgejo PR 作为交付物

`claude-personal` lane 适合低风险整理任务（文档起草、复盘、清单归纳）以及边界清楚、后续有人类审阅 gate 的 bounded 改动。

在此协作模式下，**claude-sidecar bot 负责所有 commit 的 author 身份**，reviewer 全程保持独立，不参与代码提交；两者职责严格分离。**Review verdict（Approve / Request changes）只能由 reviewer 给出，bot 不得自我审阅。**

### Plane review index comment

当 Multica issue 进入 `in_review` 状态后，bridge 会在对应 Plane work item 的 activity 区自动写回一条 review index comment，内容包含：

- 关联的 Forgejo PR/MR 链接
- 关联的 Multica issue 链接

如果该条目未出现，说明 bridge 回写失败，需明确报告为失败，不可假设通过。

**两段式建立流程**：Plane review index 不必等 Forgejo PR 完成后才写入，可分两步进行：

1. Multica issue 创建后，leader 可先在 Plane work item 上建立 review index（此时 PR 链接尚为空或待补）
2. Forgejo PR 创建后，再将 PR 跳链补入 review index comment，然后将 Multica issue 推进到 `ready_for_review`

这样可以在 PR 创建之前就让 Plane 侧的 review 入口先行就位，减少因 PR 晚到导致的索引缺失。

### Forgejo PR merge 自动收口

Forgejo PR 被自然 merge 后，bridge 会自动将对应 Multica issue 推进到 `done`，并将 Plane work item 推进到 `Done`。这条链路无需人工操作，merge 即收口；如果状态未自动更新，说明 bridge 事件链路失败，需明确报告，不可假设已收口。

### Review comment 与 Request changes 的区别

在 Forgejo PR review 流程中，两种反馈的含义不同，worker 应区分处理：

- **普通 review comment**：只是活动记录，不触发返工。worker 可阅读后自行判断是否需要跟进，不必自动重启任务。
- **Request changes**：表示 reviewer 明确要求修改，worker 收到后须重新进入 `in_progress`，修复后重新提交并更新 PR。

Approve（或 merge）才代表 review 通过，bridge 随即自动收口。

> **试点约定**：在当前 Plane + Multica + Forgejo 协作试点中，Forgejo PR 的自然 merge 是任务的最终完成信号；未 merge 的 PR 不视为已交付，任何 bridge 状态更新的前提都是 merge 完成。

## Docs-only PR 审阅要点

审阅 docs-only PR 时，reviewer 只需关注：

1. 文档内容是否准确反映当前代码行为和仓库约定
2. 是否与 README / maintainer-guide / regression-checklist 有矛盾
3. 没有意外带入 JS / HTML / CSS 改动（`git diff -- '*.md'` 确认范围）
4. 链接是否指向实际存在的文件

docs-only PR 不要求跑 smoke test，但 approve 前建议快速浏览一遍 diff 确认范围。

## 重构优先级入口

近端安全重构候选见 [docs/refactor-backlog.md](refactor-backlog.md)。当前不建议做的大改：重写存储层、一次性全局状态模块化、同时重做 UI 架构 + 数据架构。
