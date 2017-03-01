var path = require('path');
var webpack = require('webpack');
var babelLoader = 'babel-loader?presets[]=es2015,presets[]=react,plugins[]=transform-object-rest-spread';
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    "./index.js"
  ],
  output: {
    path: __dirname + '/build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
        { test: /\.js?$/, loaders: ['react-hot', babelLoader], exclude: /node_modules/, includes: ['./index.js', path.join(__dirname, 'src')]},
        { test: /\.js$/, exclude: /node_modules/, loader: babelLoader, includes: ['./index.js', path.join(__dirname, 'src')] },
        { test: /\.styl$/, loaders: ["style", "css", 'postcss', 'stylus'] },
        { test: /\.(png|jpg|ttf|woff|svg|otf|eot|svg).*?$/, loader: "file-loader" },
    ]
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
