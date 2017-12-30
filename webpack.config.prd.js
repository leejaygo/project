const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname, './app/index.jsx')
    },
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname, './build/assets'),
        chunkFilename:'[name].chunk.js?[hash]',
        publicPath: '/'
    },
    module: {
        rules:[
            {
                test: /\.js[x]$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: ["style-loader"],
                    use: ["css-loader"]
                })
            }
        ]
    },
    //devtool: 'eval',
    plugins:[
        //
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify("production") 
        }),
        //生成html文件并且自动加载相关css,js资源
        new HtmlWebpackPlugin({
            title: 'locationService',
            template: path.join(__dirname, './app/index.html'),
            filename: 'build/index.html'
        }),
        //提取代码中公共部分
        new webpack.optimize.CommonsChunkPlugin({
            names: 'common',
            filename: 'build/[name].js',
            minChunks: 2
        }),
        //css打包到一个文件中
        new ExtractTextPlugin('[name].css'),
        //代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
           "$": "webpack-zepto",
           'React': 'react',
           'ReactDom': 'react-dom'
        })

    ]
}