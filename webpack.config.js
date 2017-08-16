var Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: './main.js', // 要輸出的檔案入口
  output: {
    filename: './index.js' //最終的目的檔案
  },
  plugins: [new Visualizer({
    filename: './statistics.html'
  })],
}