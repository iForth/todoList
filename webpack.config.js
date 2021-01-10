const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")


module.exports = {
  mode: "development",
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, '.temp_cache')
  },
  entry: {
    index: path.resolve(__dirname, "./src/index.tsx")
  },
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "./dist")
  },


  //生成sourceMaps(方便调试)
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [

      //处理所有js文件
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env",
                {
                  "modules": "cjs",
                  "useBuiltIns": "usage",
                  "corejs": "3"
                }
              ],
            ],
            plugins: []
          }
        }
      },

      //处理所有ts/tsx文件
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: [
            ["import", {
              libraryName: "antd",
              style: "css"
            }]
          ]
        }
      },

      //处理css文件，提供style-loader，支持HMR
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      //处理less文件
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            // options: {
            //   lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
            //     modifyVars: {
            //       'primary-color': '#BFA',
            //       'link-color': '#1DA57A',
            //       'border-radius-base': '2px',
            //     },
            //     javascriptEnabled: true,
            //   }
            // }
          },


        ]
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},

      //处理html内联
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    //模块热更新
    new webpack.HotModuleReplacementPlugin(),
    //配置html入口信息
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: "body"
    }),

  ],

  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true, // 热加载
    inline: true, //自动刷新
    open: true, //自动打开浏览器
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    host: "localhost", //主机名
    port: 8000, //端口号
    proxy: {
      '/api':
        'http://localhost:3000'
    }, //配置反向代理解决跨域
    compress: true, //为你的代码进行压缩。加快开发流程和优化的作用
    overlay: { // 在浏览器上全屏显示编译的errors或warnings。
      errors: true,
      warnings:
        false
    },
    quiet: true // 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
  }
}

