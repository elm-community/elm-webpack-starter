# elm-webpack-starter

A simple Webpack setup for writing [Elm](http://elm-lang.org/) apps:

* Dev server with live reloading, HMR
* Support for CSS/SCSS (with Autoprefixer), image assets
* Bootstrap 3.3+ (Sass version)
* Bundling and minification for deployment
* Basic app scaffold, using `Html.App`
* A snippet of example code to get you started!


### Install:
Clone this repo into a new project folder, e.g. `my-elm-project`, and install its dependencies:
```
git clone https://github.com/moarwick/elm-webpack-starter my-elm-project
cd my-elm-project
npm install
```

Re-initialize the project folder as your own repo:
```
rm -rf .git
git init
git add .
git commit -m 'first commit'
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
* Get coding! The entry point file is `src/elm/Main.elm`
* Browser will refresh automatically on any file changes..


### Build & bundle for prod:
```
npm run build
```

* Files are saved into the `/dist` folder
* To check it, open `dist/index.html`


### Changelog

**Ver 0.7.1**
* Fix favicon issues, per [Issue 30](https://github.com/moarwick/elm-webpack-starter/issues/30)

**Ver 0.7.0**
* Modify project structure, per [Issue 26](https://github.com/moarwick/elm-webpack-starter/issues/26)
* Include Bootstrap JS, per [Issue 28](https://github.com/moarwick/elm-webpack-starter/issues/28)
* More helpful install steps in README, per [Issue 29](https://github.com/moarwick/elm-webpack-starter/issues/29)
* Update to latest packages

**Ver 0.6.2**
* Use `copy-webpack-plugin` instead of `cp` to copy files (Windows compatible)

**Ver 0.6.0**
* `elm-hot-loader` is back (no Elm code changes required!)
* Switch to [bootstrap-sass](https://www.npmjs.com/package/bootstrap-sass) to demo CSS

**Ver 0.5.0**
* Update to Elm 0.17.0 (and other latest modules)
* Upgrade starter code per [upgrade-docs](https://github.com/elm-lang/elm-platform/blob/master/upgrade-docs/0.17.md)
* Remove `elm-hot-loader` (for now)

**Ver 0.4.0**
* Add [elm-hot-loader](https://github.com/fluxxu/elm-hot-loader) for HMR support (PR by [fluxxu](https://github.com/fluxxu))

**Ver 0.3.0**
* Use `html-webpack-plugin` to generate `index.html`
* Apply hash filenames for bundled JS and CSS (prevents caching)
* Image and favicon assets copied to `dist/`
