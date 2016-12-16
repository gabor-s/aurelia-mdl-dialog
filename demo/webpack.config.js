/* eslint-env node */

// const path = require('path');
const webpackMerge = require('webpack-merge');

let finalConfig = {};

const commonConfig = {
    devtool: "cheap-eval-source-map",
    entry: {
        app: './app/main.js'
    }
};

const devConfig = {
    output: {
        filename: 'bundle.js'
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