# elm-webpack-starter

Webpack build script for writing [Elm](http://elm-lang.org/) apps:

* Webpack dev server with live reloading
* Support for CSS/SCSS, with Autoprefixer
* Bundling and minification for deployment
* Starter files, just start coding!


### Install:
```
$ git clone git@github.com:pmdesgn/elm-webpack-starter.git
$ cd elm-webpack-starter
$ npm install
```

If you haven't done so yet, install Elm globally:
```
npm install -g elm
```

### Serve locally:
```
$ npm start
```
* Access app at `http://localhost:8080/`
* Browser will refresh automatically on any file changes


### Build & bundle for prod:
```
$ npm run build
```

* Files are saved into the `/dist` folder
* To check it `$ open dist/index.html`
* To publish the `/dist` folder to your repo's `gh-pages`, commit any changes then:
```
git subtree push --prefix dist origin gh-pages
open http://<your-github-account>.github.io/elm-webpack-starter/
```
