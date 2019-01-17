const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//打包css
const uglifyjs = require('uglifyjs-webpack-plugin');

const APP_FILE = './src/App.jsx'; //根目录文件app.jsx地址
const NAME_PATH = '/www/';
const PUBLIC_PATH = 'dist/';
const ROOT_PATH = path.join(__dirname);
const BUILD_PATH = path.join(ROOT_PATH,NAME_PATH+PUBLIC_PATH); //发布文件所存放的目录

module.exports = {
    stats: {
        children: true
    },
    mode:"production",
    entry: {
        app: APP_FILE,
        common: [
            "react",
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'redux-thunk'
        ]
    },
    output: {
        publicPath: PUBLIC_PATH, //编译好的文件，在服务器的路径,这是静态资源引用路径
        path:BUILD_PATH , //编译到当前目录
        filename: '[name].js', //编译后的文件名字
        chunkFilename: 'js/[name].[chunkhash:5].min.js',
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
                include: [path.join(__dirname, 'src'),  path.join(__dirname, '/node_modules/normalize.css'),path.join(__dirname, '/node_modules/antd-mobile')], //限制范围，提高打包速度
                // exclude: /node_modules/
            },
            {
                test:/\.(js|jsx)$/,
                // exclude: /node_modules/,
                loader: "babel-loader",
                include: [path.join(__dirname, 'src'), path.join(__dirname, '/node_modules/plugin-tool-check')]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: { // 这里的options选项参数可以定义多大的图片转换为base64
                        limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath: 'images' //定义输出的图片文件夹
                    }
                }]
            }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "css/[name].[hash:6].css",
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: '../index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            inject: 'body',
            hash: true,
        }),
        // new uglifyjs() //压缩js
    ],
    optimization: {
        minimizer: [new uglifyjs({
            uglifyOptions: {
                compress: {
                    warnings: false
                },
                ecma: 8,
                mangle: {
                    safari10: true
                }
            },
            sourceMap: true,
            parallel: true
        })],
        //提取出来的样式和common.js会自动添加进发布模式的html文件中，原来的html没有
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    performance: {
        hints:false
    },
    resolve: {
        extensions: ['*','.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    }
};