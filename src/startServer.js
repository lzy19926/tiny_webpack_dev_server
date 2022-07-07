const Koa = require('koa');
const path = require('path')
const fs = require('fs')
const serve = require("koa-static")
const Webpack = require('../../tiny_webpack/src/bundle')
const { hotUpdate } = require('./hotUpdate')
const webpackConfig = require('../../webpack.config')

function startServer() {
    const app = new Koa();
    const webpack = new Webpack(webpackConfig)
    const topPath = path.resolve(webpack.config.entry, '..', '..')
    app.use(serve(topPath + "/dist", { extensions: ["html"] })) //访问静态html文件


    hotUpdate(webpack, app) //todo 开启热更新功能


    app.listen(8080, () => {
        console.log('dev-server启动在8080端口');
        webpack.bundle()
    })
}


module.exports = { startServer }