**🚧 Readme is under construction 🚧**

# CoverageWorkspace

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="100">🔎 <b>Nx is a set of Extensible Dev Tools for Monorepos.</b></p>

## Further info on NX itself

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## Running the example

### Preparation

Install the packages as usual with
`npm install`

If you haven't used nx before, you might need to run `npm install @nrwl/nx` as well.

### Running

At least on Windows, there might be problems with locating `nyc`. You can solve that by either putting your `node_modules/.bin` on PATH (and of course restarting your terminal to make sure it's applied) or prefixing all execution commands with `npx`.

#### NX-style

NX generates a lot of commands to run the application, also with more elaborate configurations. They can be run directly in command line, being specified in `nx.json`.

For running e2e-Tests of the app, run
> nx run cov-app-e2e:e2e

For running the Component-Tests against a Storybook-Instance, run
> nx run ui-lib-e2e:e2e

Both calls take care of starting their targets themselves.

#### Plan B

For users preferring scripts in package.json, you could also use scripts `app-e2e` for the classic e2e-Test against an application or `lib-e2e` for Component-Tests against Storybook

In webpack.config mind the include - all correct paths to sources that shall be instrumented/you want coverage for in this e2e-Project, have to be declared correctly.
If you want coverage for specs as well, remove corresponding entries from exclude.

## Changes needed in your NX-Setup

This repo essentially followed the instructions of <https://github.com/skylock/cypress-angular-coverage-example>, but will expand on the details that took me ages to figure out, necessary to have a successful setup.

- Install ngx-build-plus to extends the Angular CLI's build process and instrument the code

```bash
npm i -D ngx-build-plus
```

- Add webpack coverage config file coverage.webpack.js to cypress folder

```JavaScript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        enforce: 'post',
        include: require('path').join(__dirname, '..', 'src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /(ngfactory|ngstyle)\.js/
        ]
      }
    ]
  }
};
```

- Update angular.json to use ngx-build with extra config

```JSON
"serve": {
          "builder": "ngx-build-plus:dev-server",
          "options": {
            "browserTarget": "cypress-angular-coverage-example:build",
            "extraWebpackConfig": "./cypress/coverage.webpack.js"
          },
```

- Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting

```bash
npm i -D istanbul-instrumenter-loader
```

- Make Istanbul understand your Typescript source files

```bash
npm i -D @istanbuljs/nyc-config-typescript source-map-support ts-node
```

- Make sure that Istanbul takes advantage of it by adding this configuration in your package.json or in .nycrc.json

```JSON
  "nyc": {
    "extends": "@istanbuljs/nyc-config-typescript",
    "all": true
  },
```

- Add cypress code coverage plugin

```bash
  npm install -D @cypress/code-coverage nyc istanbul-lib-coverage
```

- Then add the code below to your supportFile and pluginsFile

```JavaScript
// cypress/support/index.js
import '@cypress/code-coverage/support'
```

```JavaScript
// cypress/plugins/index.js
module.exports = (on, config) => {
  on('task', require('@cypress/code-coverage/task'))
}
```
