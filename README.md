# elm-webpack-starter

A simple Webpack setup for writing [Elm](http://elm-lang.org/) apps:

* Dev server with live reloading & HMR
* Support for CSS/SCSS, with Autoprefixer
* Bundling and minification for deployment
* Basic app scaffold, integrating Elm's official [StartApp](https://github.com/evancz/start-app) package
* A snippet of example code to get you started!

**Ver 0.3.0**
* Update to latest NPM module versions
* Use *html-webpack-plugin* to generate *index.html*
* Apply unique hash filenames to bundled JS and CSS files (prevents caching)
* Make build script copy images and favicon to *dist/*

**Ver 0.4.0**
* Add [elm-hot-loader](https://github.com/fluxxu/elm-hot-loader) for HMR support (PR by [fluxxu](https://github.com/fluxxu))


### Install:
```
git clone https://github.com/moarwick/elm-webpack-starter
cd elm-webpack-starter
npm install
```

If you haven't done so yet, install Elm globally:
```
npm install -g elm
```

Install Elm's dependencies:
```
elm package install
```

### Serve locally:
```
npm start
```
* Access app at `http://localhost:8080/`
* Get coding! The entry point file is `src/Main.elm`
* Browser will refresh automatically on any file changes..


### Build & bundle for prod:
```
npm run build
```

* Files are saved into the `/dist` folder
* To check it, open `dist/index.html`
* To publish the `/dist` folder to your own GitHub repo's `gh-pages`, commit any changes, then:
```
git subtree push --prefix dist origin gh-pages
open http://<your-github-account>.github.io/elm-webpack-starter/
```
