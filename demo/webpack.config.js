/* eslint-env node */

const path = require('path');
const webpackMerge = require('webpack-merge');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');

let finalConfig = {};

const commonConfig = {
    devtool: "cheap-eval-source-map",
    entry: {
        app: './app/app.js',
        aurelia: [
            'aurelia-bootstrapper-webpack'/*,
            'aurelia-framework',
            'aurelia-logging-console',
            'aurelia-templating-binding',
            'aurelia-templating-resources',
            'aurelia-templating-router',
            'aurelia-history-browser',
            'aurelia-event-aggregator'*/
        ]
    },
    plugins: [
        new AureliaWebpackPlugin({
            src: path.resolve('./app')
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                exclude: './index.html',
                loader: 'html-loader'
            }]
    }
};

const devConfig = {
    output: {
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: '.',
        historyApiFallback: true
    }
};

const prodConfig = {
    devtool: "source-map",
    output: {
        filename: 'bundle.js'
    }
};

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