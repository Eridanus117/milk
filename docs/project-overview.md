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

本仓库当前使用 **Plane + Multica + git docs review** 的协作模式：

- **Plane**：任务/需求跟踪，项目 key `MILK`，卡片链接见各 issue 描述
- **Multica**：agent 执行任务，worker 出草稿，主链路审阅后落仓
- **CR 原则**：docs-only 变更（仅改 Markdown）与业务代码变更分开提交，通过 `git diff -- '*.md'` 确认 review 范围

`claude-personal` lane 适合低风险整理任务（文档起草、复盘、清单归纳），不建议放在需要稳定返回的主执行链路。

## 重构优先级入口

近端安全重构候选见 [docs/refactor-backlog.md](refactor-backlog.md)。当前不建议做的大改：重写存储层、一次性全局状态模块化、同时重做 UI 架构 + 数据架构。
