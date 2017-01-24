/* eslint-env node */

/* The AureliaWebpackPlugin processes everything under the src directory. AFAIK currently there's no way to tell the
   plugin to exclude something. So src/index.html get processed too. If there's no loader for src/index.html then the
   AureliaWebpackPlugin will emit a warning and the file will not be part of the app bundle. If I specify for example
   the raw-loader to handle src/index.html then the AureliaWebpackPlugin will not emit a warning, but the src/index.html
   file will be part of the app bundle. To solve this I moved the index.html file out from the src direcrtory, so there's
   no warning and the index.html file will not be part of the app bundle.
 */

const project = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');

const commonConfig = {
    devtool: 'cheap-eval-source-map',
    entry: {
        app: ['./src/app/aurelia-config.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new AureliaWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            chunksSortMode: 'dependency'
        })
    ],
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
            },
            {
                test: /\.html$/,
                exclude: [/node_modules/, /index.html/],
                loader: 'html-loader'
            }
        ]
    }
};

const devConfig = {
    output: {
        filename: '[name].bundle.js'
    },
    devServer: {
        historyApiFallback: true
    }
};

const prodConfig = {
    devtool: "source-map",
    output: {
        filename: '[chunkhash].[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
        new WebpackChunkHash()
    ]
};

module.exports = function (environment) {

    let finalConfig = {};
    switch (environment) {
        case 'prod':
        case 'production':
            commonConfig.entry.vendor = [...commonConfig.entry.app, ...Object.keys(project.dependencies)];
            finalConfig = webpackMerge(commonConfig, prodConfig);
            break;
        case 'test':
        case 'testing':
            break;
        case 'dev':
        case 'development':
        default:
            commonConfig.entry.app = [...commonConfig.entry.app, ...Object.keys(project.dependencies)];
            finalConfig = webpackMerge(commonConfig, devConfig);
    }
    return finalConfig;
}