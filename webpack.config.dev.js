const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const Port = 8088;
const proxy = {
	"/api/*": {
		target: 'http://localhost:8091',
		secure: false,//支持https
	}
}

module.exports = {
	entry: {
		app: ['babel-polyfill',path.resolve(__dirname, './app/index.jsx')]
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
	devtool: 'eval',
	devServer: {
		hot: true,//热加载
		historyApiFallback: true,//如果要从任意URL访问开发服务器，请将其设置为true。这是方便的，如果你使用的是HTML5路由器。
		compress: false,//开启gzip压缩
		inline: true,
		host: '0.0.0.0',
		port: Port,
		proxy: proxy//配置代理
	},
	plugins:[
		//
		new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("development") 
        }),
        //生成html文件并且自动加载相关css,js资源
		new HtmlWebpackPlugin({
			title: 'locationService',
	      	template: path.join(__dirname, './app/index.html'),
	      	filename: 'index.html'
	    }),
	    //提取代码中公共部分
	    new webpack.optimize.CommonsChunkPlugin({
            names: 'common',
            filename: '[name].js',
            minChunks: 2
        }),
        //css打包到一个文件中
        new ExtractTextPlugin('[name].css'),
        //代码压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.ProvidePlugin({
           "$": "webpack-zepto",
           'React': 'react',
           'ReactDom': 'react-dom'
        })

	]
}