/* eslint-env node */

const project = require('./package.json');
const path = require('path');
const webpackMerge = require('webpack-merge');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            template: './src/index.html',
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
                exclude: /src\/index.html/, // node-modules???
                loader: 'html-loader'
            }]
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
        filename: 'bundle.js'
    }
};

module.exports = function (environment) {
    commonConfig.entry.app = [...commonConfig.entry.app, ...Object.keys(project.dependencies).filter(dep => dep.startsWith('aurelia-'))];
    let finalConfig = {};
    switch (environment) {
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
    return finalConfig;
}