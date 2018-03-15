const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var time  = new Date();
var  y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var dirna = ''+y+''+m+''+d +'-'+time.getTime();
module.exports = {
    entry: {
        app: path.resolve(__dirname, './app/index.jsx')
    },
    output:{
        filename: '[name].[chunkhash].min.js',
        path: path.resolve(__dirname, './build/'+dirna+'/'),
        chunkFilename:'[name].[hash].chunk.js',
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
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                  }
                ]
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
            template: path.join(__dirname, './app/index.html'),
            filename: 'index.html'
        }),
        //提取代码中公共部分
        new webpack.optimize.CommonsChunkPlugin({
            names: 'common',
            filename: '[name].[hash].js',
            minChunks: 2
        }),
        //css打包到一个文件中
        new ExtractTextPlugin('[name].[contenthash].css'),
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