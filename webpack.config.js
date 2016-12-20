/* eslint-env node */

const webpackMerge = require('webpack-merge');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');

const commonConfig = {
    entry: './src/mdl-dialog-service.js',
    output: {
        path: './dist',
        filename: 'mdl-dialog-service.js',
        library: 'mdlDialogService',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        'dialog-polyfill': true,
        'aurelia-framework': true
    },
    plugins: [
        new AureliaWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /src/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {
                            loose: true,
                            module: false
                        }]
                    ]
                }
            }]
    },
    devtool: 'cheap-module-source-map'
};

const devConfig = {};

const prodConfig = {};

let finalConfig = {};
switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        finalConfig = webpackMerge(commonConfig, prodConfig);
        break;
    case 'test':
    case 'testing':
        break;
    case 'dev':
    case 'development':
    default:
        finalConfig = webpackMerge(commonConfig, devConfig);
}

module.exports = finalConfig;