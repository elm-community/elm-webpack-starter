const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const prod = 'production';
const dev = 'development';

// determine build env
const TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? prod : dev;
const isDev = TARGET_ENV == dev;
const isProd = TARGET_ENV == prod;

// entry and output path/filename variables
const entryPath = path.join(__dirname, 'src/static/index.js');
const outputPath = path.join(__dirname, 'dist');
const outputFilename = isProd ? '[name]-[hash].js' : '[name].js'

// extract css into file
const extractCSS = new ExtractTextPlugin({
    filename: "static/css/[name]-[contenthash].css",
    allChunks: true,
    disable: isDev === true
});

const elmLoaderOptions = isDev ? { verbose: true, warn: true, debug: true } : {}

console.log('WEBPACK GO! Building for ' + TARGET_ENV);

// common webpack config (valid for dev and prod)
const commonConfig = {
    output: {
        path: outputPath,
        filename: `static/js/${outputFilename}`,
    },
    resolve: {
        extensions: ['.js', '.elm'],
        modules: ['node_modules']
    },
    module: {
        noParse: /\.elm$/,
        rules: [
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: [{
                    loader: 'elm-webpack-loader',
                    options: elmLoaderOptions
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: 'file-loader?publicPath=../../&name=static/css/[hash].[ext]'
            },
            {
                test: /\.sc?ss$/,
                use: extractCSS.extract({
                    // Adds CSS to the DOM by injecting a <style> tag
                    fallback: 'style-loader',
                    use: [
                        // interprets @import and url() like import/require() and will resolve them.
                        { loader: 'css-loader', options: { minimize: isProd === true } },
                        // process CSS with PostCSS
                        'postcss-loader',
                        // compiles Sass to CSS
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer()]
            }
        }),

        new HtmlWebpackPlugin({
            template: 'src/static/index.html',
            inject: 'body',
            filename: 'index.html'
        }),

        extractCSS
    ]
}

// additional webpack settings for local env (when invoked by 'npm start')
if (isDev === true) {
    module.exports = merge(commonConfig, {
        entry: [
            'webpack-dev-server/client?http://localhost:8080',
            entryPath
        ],
        devServer: {
            // serve index.html in place of 404 responses
            historyApiFallback: true,
            contentBase: './src',
            hot: true
        }
    });
}

// additional webpack settings for prod env (when invoked via 'npm run build')
if (isProd === true) {
    module.exports = merge(commonConfig, {
        entry: entryPath,

        plugins: [
            new CopyWebpackPlugin([{
                from: 'src/static/img/',
                to: 'static/img/'
            }, {
                from: 'src/favicon.ico'
            }]),

            // minify JS
            new webpack.optimize.UglifyJsPlugin()
        ]
    });
}
