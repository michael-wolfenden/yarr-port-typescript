var config = require('../configuration');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackOptions = {

    entry: [
        'webpack/hot/dev-server',
        config.paths.entryFile
    ],

    output: {
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        preLoaders: [
            {
                test: /\.ts(x?)$/,
                loaders: ['tslint-loader'],
                exclude: config.paths.nodeModulesDir
            }
        ],

        loaders: [
            {
                test: /\.ts(x?)$/,
                loaders: ['ts-loader'],
                exclude: config.paths.nodeModulesDir
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: config.paths.index,
            inject: true,
            devServer: 'http://localhost:8080/webpack-dev-server.js'
        }),

        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = webpackOptions;