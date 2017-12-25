const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Port = 8088;
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
		        use: ['style-loader','css-loader']
      		}
		]
	},
	devtool: 'eval',
	devServer: {
		hot: false,//热加载
		historyApiFallback: false,//如果要从任意URL访问开发服务器，请将其设置为true。这是方便的，如果你使用的是HTML5路由器。
		compress: true,//开启gzip压缩
		// proxy: {}
		host: '0.0.0.0',
		port: Port
	},
	plugins:[
		new HtmlWebpackPlugin({
			title: 'test',
	      	template: path.join(__dirname, './app/index.html')
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
            names: ['common'],
            filename: '[name].js',
            minChunks: 2
        }),
        new webpack.ProvidePlugin({
           "$": "webpack-zepto",
           'React': 'react',
           'ReactDom': 'react-dom'
        })

	]
}