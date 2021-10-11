const path = require('path')
const DeclarationBundlerPlugin = require('types-webpack-bundler')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'LRUCache',
      type: 'umd2'
    }
  },
  plugins: [
    new DeclarationBundlerPlugin({
      moduleName: 'LruCacheTs',
      out: './types/index.d.ts'
    })
  ]
}
