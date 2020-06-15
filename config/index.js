'use strict'
const path = require('path')

//http://129.226.59.201:9111/swagger-ui.html#/Order

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/proxyUrl': {
                target: 'http://tb.njmall.store/proxyUrl', //'http://api.tb.object.cool:8022',//'http://web.tb.object.cool/proxyUrl',
                changeOrigin: true,
                pathRewrite: {
                    '^/proxyUrl': '/'
                }
            },
            '/proxyPoolUrl': {
                target: 'http://api2.njmall.store', //'http://api.tb.object.cool:8022',//'http://web.tb.object.cool/proxyUrl',
                changeOrigin: true,
                pathRewrite: {
                    '^/proxyPoolUrl': '/'
                }
            },
            '/coindog': {
                target: 'http://api.coindog.com', //行情接口
                changeOrigin: true,
                pathRewrite: {
                    '^/coindog': '/'
                }
            },
            '/mallProxy': {
                target: 'http://122.51.200.81:9523', //'http://192.168.0.121:9523', //'http://122.51.200.81:9523', //商城接口
                changeOrigin: true,
                pathRewrite: {
                    '^/mallProxy': '/'
                }
            },
            '/quanProxy': {
                target: 'http://39.99.215.137:8080', //'http://192.168.0.121:9523', //'http://122.51.200.81:9523', //商城接口
                changeOrigin: true,
                pathRewrite: {
                    '^/quanProxy': '/'
                }
            },
        },

        // Various Dev Server settings
        // host: '0.0.0.0', // can be overwritten by process.env.HOST 原为localhost
        // port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        host: 'localhost', // can be overwritten by process.env.HOST 原为localhost
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './', //打包路径修改/

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}