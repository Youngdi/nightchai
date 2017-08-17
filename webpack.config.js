var Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: './main.js', // 要輸出的檔案入口
  output: {
    filename: './index.js', //最終的目的檔案
    library: 'nightchai',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
    
        query: {
          presets: ['es2015','stage-2']
        }
      }
    ]
  },
  plugins: [new Visualizer({
    filename: './statistics.html'
  })],
}