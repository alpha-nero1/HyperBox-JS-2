// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
  mode: 'development',
  entry: [
    './src/index.jsx'
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env', 
                        '@babel/preset-react',
                    ]
                }
            },
        },
        {
            test: /.html$/,
            use: [
            {
                loader: 'html-loader',
                options: { minimize: true }
            }
            ]
        },
        {
          test: /\.less$/i,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  strictMath: true,
                },
              },
            },
          ]
        },
        {
            test: /.css$/,
            use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true
                }
            }
            ]
        }
    ]
  }
}; 
  