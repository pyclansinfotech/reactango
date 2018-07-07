/*eslint no-undef: "error"*/

var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.entry = {

    hello: [
        'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://0.0.0.0:3000',
        './assets/pages/hello/Hello.jsx'
    ],
    dashboard: [
        'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://0.0.0.0:3000',
        './assets/pages/hello/dashboard.jsx'
    ],
}

config.output.publicPath = '/assets/bundles/'

config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    ...config.plugins,
    new BundleTracker({filename: './webpack-stats.json'}),
]


config.module.loaders = [
    {test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'react-hot', 'babel', 'eslint-loader'] },
    ...config.module.loaders
]

module.exports = config