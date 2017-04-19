import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
const ENV = process.env.NODE_ENV || 'development';

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: './index.js',

	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: '/',
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['.jsx', '.js' ],
		modules: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		]
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

	plugins: ([
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: './index.ejs',
			minify: { collapseWhitespace: true }
		})
	]),

	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	}
};
