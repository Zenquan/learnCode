/*eslint-disable */
const path = require('path');
const webpack = require('webpack');
const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js'
  },
  alias: {
    'src': path.resolve(__dirname, '../src/'),
    'assets': path.resolve(__dirname, '../src/assets'),
    'components': path.resolve(__dirname, '../src/components')
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: '[name].bundle.js',
    libeary: 'myClassName' // 生成在全局对象 相当于 window.myClassName
  },
  devServar: {
    contentBase: __dirname + '/src', // 静态服务器
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 以数组逆序进行，栈，先解析css-loader
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ // 重复请求的包打包
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2
    }),
    new ExtractTextPlugin({   // 分开打包CSS文件
      filename: '[name].bundle.css',
      allChunks: true
    })
  ]
};

module.exports = config;