const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const environments = ['web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main'];
const targets = [];

const copyright = 'MIT License\n\n' +
    'Copyright (c) 2018 Michael Goodwin\n\n' +
    'Permission is hereby granted, free of charge, to any person obtaining a copy\n' +
    'of this software and associated documentation files (the "Software"), to deal\n' +
    'in the Software without restriction, including without limitation the rights\n' +
    'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n' +
    'copies of the Software, and to permit persons to whom the Software is\n' +
    'furnished to do so, subject to the following conditions:\n\n' +
    'The above copyright notice and this permission notice shall be included in all\n' +
    'copies or substantial portions of the Software.\n\n' +
    'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
    'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n' +
    'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n' +
    'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n' +
    'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n' +
    'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n' +
    'SOFTWARE.';

environments.forEach(environment => {
    let envConfig = {
        entry: {
            entry: './sorted.js'
        },
        target: environment,
        output: {
            path: path.resolve(__dirname, './dist/' + environment),
        },
        module: {
            rules: [
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: 'readme.md',
                }
            ]),
            new webpack.BannerPlugin(copyright)
        ]
    };
    targets.push(webpackMerge(envConfig, {
        mode: 'development',
        output: {
            filename: environment + '.[name]' + '.js'
        }
    }));
    targets.push(webpackMerge(envConfig, {
        mode: 'production',
        output: {
            filename: environment + '.[name]' + '.min.js'
        }
    }));
});

module.exports = targets;
