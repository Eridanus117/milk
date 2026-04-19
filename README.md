# milk

当前这个仓库版本内置了一套《恋与深空》五人群聊 starter preset，重点是让 `milk` 在群聊模式下更像真正的“多人同时说话”，而不是随机挂头像。

## 当前内置群聊成员

- 黎猫猫
- 沈星星
- 祁小煜
- 彻子哥
- 哥哥

## 当前实现

- 首次加载且本地没有既有词卡/群聊数据时，会自动写入内置 preset。
- 群聊回复逻辑改为：
  - 先选发言成员
  - 再按预设比例从公共、角色、暧昧、链接四层里取句子
- 当前群聊回复比例为：
  - `40%` 公共字卡
  - `30%` 角色主池
  - `20%` 暧昧/夜话
  - `10%` 链接/传讯语境
- 链接层默认不做角色化，直接从原始字卡里抽取 `塔罗 / 链接 / 信号 / 共振 / 羁绊` 一类更抽象的表达，不再自行扩写。

## 词卡维护位置

主要维护文件：

- `js/presets.js`

里面目前包含：

- 公共词卡组
- 链接词卡组
- 五位成员专属主池
- 五位成员的暧昧/挑逗池
- 单独维护的 `Emoji 库`

当前 starter preset 共 `16` 个分组、`440` 条回复。
另带 `70` 个内置 `customEmojis`，会在重置内置预设时一并写入，不再混进字卡文本里。
五位成员也带有内置默认头像；如果你后来手动换过头像，点 `重置为内置预设` 不会把它们覆盖掉。

## 使用说明

如果你之前已经在浏览器里打开过这个站点并保存过数据，新的内置 preset 不会自动覆盖旧本地数据。

这种情况下要看到新的默认配置，可以：

1. 清空这个站点的本地存储后重开
2. 或使用新的浏览器环境访问
3. 或在群聊设置里点击 `重置为内置预设`

## 维护原则

- 公共功能句不要混进角色专属组
- 链接语境单独维护，不强行写成角色口吻
- 角色专属句优先保证口吻稳定
- 暧昧内容保留在单独分层，不直接稀释日常群聊体验

## 维护文档

- 维护入口说明见 [docs/maintainer-guide.md](/Users/a123/Documents/milk/docs/maintainer-guide.md)
- 里面重点写了：
  - 系统 `6` 聊的数据模型
  - 前台/后台回复生成的边界
  - `主动发消息` 与 `恢复` 的语义
  - 版本更新链路
  - 当前最值得做的收口型重构
- 配套材料：
  - [docs/regression-checklist.md](/Users/a123/Documents/milk/docs/regression-checklist.md)
  - [docs/refactor-backlog.md](/Users/a123/Documents/milk/docs/refactor-backlog.md)

## 发布前最小步骤

建议每次准备提交并推送前，至少按这个顺序做一遍：

1. 更新构建元信息
   - 运行 `scripts/update-build-meta.sh`
   - 如需显式指定版本和资源版本：`scripts/update-build-meta.sh 2026.04.19 20260419-2`
2. 跑一遍无头冒烟
   - 运行 `scripts/smoke-test.sh`
   - 默认会：
     - 本地起一个静态服务
     - 自动走完 `splash -> 声明 -> 引导 -> 今日公告`
     - 校验聊天模式入口、6 个系统聊天、版本信息显示
3. 检查本次 diff
   - 至少看 `index.html`
   - 确认 `build-info.json`
   - 确认这次改动涉及的 `js/` 文件
4. 再提交并推送
   - `git status`
   - `git add ...`
   - `git commit`
   - `git push`

如果你的远端部署依赖静态资源缓存，请确保：

- `index.html` 已带最新 `?v=<assetVersion>`
- `build-info.json` 已同步到远端
- 线上 `index.html` 最好使用 `no-cache`
- 线上 `build-info.json` 最好使用 `no-store`

## 冒烟脚本

- 执行：`scripts/smoke-test.sh`
- 可选环境变量：
  - `PORT=4174 scripts/smoke-test.sh`
  - `SCREENSHOT_PATH=/tmp/milk-check.png scripts/smoke-test.sh`

脚本成功时会输出一份 JSON 结果，并生成截图，默认截图路径是 `/tmp/milk-smoke.png`。
