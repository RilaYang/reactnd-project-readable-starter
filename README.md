# Readable API 服务

这是 Udacity 的 Redux 课程的最终评估项目的初始项目，您将在该应用中构建内容和评论。用户将能够将内容发布到预定义的类别，对他们的帖子和其他用户的帖子发表评论，并对帖子和评论进行投票。用户还可以编辑和删除帖子与评论。

该存储库包括用于开发和与项目前端部分交互的后端 API Server 的代码。

## 立即开始

立即开始开发：

* 安装并启动 API 服务
    - `cd api-server`
    - `npm install`
    - `node server`
* 在另一个终端窗口中，安装并启动 ”Create React App“ 项目
    - `cd frontend`
    - `npm install`
    - `npm start`

## API 服务

有关 API 服务的信息以及使用说明，可以在其 [README file](api-server/README.md) 找到。

## 访问 API 服务器

要访问代码中的后端服务器，我们已经将 URL 存储在环境变量 `REACT_APP_BACKEND` 中，可以使用 `process.env.REACT_APP_BACKEND`在代码中访问 API 服务器。 你可以在 `componentDidMount` 中的 `frontend/src/App.js`看到这一点。
