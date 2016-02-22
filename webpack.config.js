var path              = require( 'path' );
var webpack           = require( 'webpack' );
var merge             = require( 'webpack-merge' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var autoprefixer      = require( 'autoprefixer' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

console.log( 'WEBPACK GO!');

// detemine build env
var TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'prod' : 'dev';

// common webpack config
var commonConfig = {

  output: {
    path:       path.resolve( __dirname, 'dist/' ),
    filename: '[hash].js',
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js', '.elm']
  },

  module: {
    loaders: [
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader:  'elm-webpack'
      }
    ],

    noParse: /\.elm$/
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject:   'body',
      filename: 'index.html'
    })
  ],

  postcss: [ autoprefixer( { browsers: ['last 2 versions'] } ) ],

}

// additional webpack settings for local env (when invoked by 'npm start')
if ( TARGET_ENV === 'dev' ) {
  console.log( 'Serving locally...');

  module.exports = merge( commonConfig, {

    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      path.join( __dirname, 'src/index.js' )
    ],

    devServer: {
      inline:             true,
      progress:           true
    },

    module: {
      loaders: [
        {
          test: /\.(css|scss)$/,
          loaders: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    }

  });
}

// additional webpack settings for prod env (when invoked via 'npm run build')
if ( TARGET_ENV === 'prod' ) {
  console.log( 'Building for prod...');

  module.exports = merge( commonConfig, {
    
    entry: path.join( __dirname, 'src/index.js' ),

    module: {
      loaders: [
        {
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract( 'style-loader', [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ])
        }
      ]
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),

      // extract CSS into a separate file
      new ExtractTextPlugin( './[hash].css', { allChunks: true } ),

      // minify & mangle JS/CSS
      new webpack.optimize.UglifyJsPlugin({
          minimize:   true,
          compressor: { warnings: false }
          // mangle:  true
      })
    ]

  });
}
