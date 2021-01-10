import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from "../src/App"

const PORT: number = 3000;
const app = express()

const serverRenderer = (req, res, next) => {

  const html = ReactDOMServer.renderToString(<App / >);

  // 加载 index.html 的内容
  fs.readFile('../dist/index.html', 'utf8', function (err, data) {
    if (err) throw err;
    // 把渲染后的 React HTML 插入到 div 中
    const document = data.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${html}</div>`);

    // 把响应传回给客户端
    res.send(document);
  });
}

// 服务器使用 static 中间件构建 build 路径
app.use('/build', express.static(path.join(__dirname, 'build')));

// 使用我们的 handleRender 中间件处理服务端请求
app.get('*', handleRender);


app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})
