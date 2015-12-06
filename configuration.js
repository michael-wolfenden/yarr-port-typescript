/* global __dirname */

'use strict';

var path           = require('path');
var nodeModulesDir = path.join(__dirname, 'node_modules');
var srcDir         = path.join(__dirname, 'src');
var buildDir       = path.join(__dirname, 'build');
var appDir         = path.join(srcDir, 'app');
var entryFile      = path.join(appDir, 'index.ts');
var index          = path.join(srcDir, 'index.html');

var configuration = {

    paths: {
        nodeModulesDir: nodeModulesDir,
        entryFile: entryFile,
        buildDir: buildDir,
        index: index
    },

    vendorsToBundleSeperately: [
        'virtual-dom',
        'rx'
    ]
};

module.exports = configuration;