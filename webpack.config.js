const path = require('path')
const {merge} = require('webpack-merge')

const commonConfig = {
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
    path: path.resolve(__dirname, 'dist'),
  }
}

module.exports = [
  merge(commonConfig, {
    target: 'node',
    output: {
      filename: 'index.common.js',
      library: {
        type: 'commonjs2'
      }
    }
  }),
  merge(commonConfig, {
    target: 'web',
    output: {
      filename: 'index.umd.js',
      library: {
        type: 'umd2'
      }
    }
  })
]
