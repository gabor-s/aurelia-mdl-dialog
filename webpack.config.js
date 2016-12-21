/* eslint-env node */

const path = require('path');
const webpackMerge = require('webpack-merge');

const commonConfig = {
    devtool: 'cheap-eval-source-map',
    entry: './src/mdl-dialog-service.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'mdl-dialog-service.js',
        library: 'mdlDialogService',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        'dialog-polyfill': true,
        'aurelia-framework': true
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
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
};

const devConfig = {};

const prodConfig = {
    // set failOnError and failOnWarning to true in eslint-loader configuration
};

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