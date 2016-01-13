var webpack           = require( 'webpack' );
var merge             = require( 'webpack-merge' );
var autoprefixer      = require( 'autoprefixer' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var swig              = require( 'swig' );        // templating lib for generating index.html
var writefile         = require( 'writefile' );   // safer Node file writer (creates folders if not existing)

console.log( 'WEBPACK GO!');

// detemine build env
var TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'prod' : 'dev';

// generate HTML for index page (based on desired env)
var indexTemplate = swig.compileFile('./src/index.html');
var indexHtml     = indexTemplate( { env: TARGET_ENV } );

// write out index.html to dist/
writefile( './dist/index.html', indexHtml );

// common webpack config
var commonConfig = {
  entry: './src/index.js',

  output: {
    path:     './dist',
    filename: 'bundle.js'
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js', '.elm']
  },

  module: {
    loaders: [
      {
        test:    /\.html$/,
        exclude: /node_modules/,
        loader:  'file?name=[name].[ext]'
      },
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader:  'elm-webpack'
      }
    ],

    noParse: /\.elm$/
  }
}

// additional webpack settings for local env (when invoked by 'npm start')
if ( TARGET_ENV === 'dev' ) {
  console.log( 'Serving locally...');

  module.exports = merge( commonConfig, {

    devServer: {
      inline: true,
      stats: 'errors-only'
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
    },

    postcss: [ autoprefixer( { browsers: ['last 2 versions'] } ) ]
    
  });
}

// additional webpack settings for prod env (when invoked via 'npm run build')
if ( TARGET_ENV === 'prod' ) {
  console.log( 'Building for prod...');

  module.exports = merge( commonConfig, {
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

    postcss: [ autoprefixer( { browsers: ['last 2 versions'] } ) ],

    plugins: [
      // extract CSS into a separate file
      new ExtractTextPlugin( './css/stylesheet.css', { allChunks: true } ),

      // minify & mangle JS/CSS
      new webpack.optimize.UglifyJsPlugin({
          minimize:   true,
          compressor: { warnings: false },
          mangle:     true                      // TODO: need any exceptions?
      })
    ]

  });
}
