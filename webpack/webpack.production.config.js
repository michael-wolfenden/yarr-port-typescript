var config = require('../configuration');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var fs = require('fs');

var webpackConfig = {

    entry: {
        app: config.paths.entryFile,
        vendor: config.vendorsToBundleSeperately
    },

    output: {
        path: config.paths.buildDir,
        filename: 'assets/js/[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        preLoaders: [
            {
                test: /\.tsx?$/,
                loaders: ['tslint-loader'],
                exclude: config.paths.nodeModulesDir
            }
        ],

        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['ts-loader'],
                exclude: config.paths.nodeModulesDir
            }
        ]
    },

    plugins: [
        new Clean(config.paths.buildDir),

        new webpack.NamedModulesPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),

        new HtmlWebpackPlugin({
            inject: true,
            excludeChunks: ['manifest'],
            templateContent: addManifestChunckContentsToIndexTemplate
        }),

        function () {
            this.plugin('done', deleteManifestFile);
        }
    ]
};

function addManifestChunckContentsToIndexTemplate(templateParams, compilation, callback) {
    var manifestFilename = getGeneratedFilenameForChunk(compilation.getStats(), 'manifest');
    var manifestSource = compilation.assets[manifestFilename].source();

    templateParams.htmlWebpackPlugin.options.webpackManifest = manifestSource;

    fs.readFile(config.paths.index, 'utf8', callback);
}

function getGeneratedFilenameForChunk(stats, chunkName) {
    return stats.toJson().assetsByChunkName[chunkName];
}

function deleteManifestFile(stats) {
    var manifestFilename = getGeneratedFilenameForChunk(stats, 'manifest');
    fs.unlinkSync(path.join(config.paths.buildDir, manifestFilename));
}

module.exports = webpackConfig;