# isomorphic-redux-reactstrap

![dependencies](https://img.shields.io/david/victorpopkov/isomorphic-redux-reactstrap.svg)
![devDependencies](https://img.shields.io/david/dev/victorpopkov/isomorphic-redux-reactstrap.svg)

Isomorphic web app boilerplate built using [React](https://github.com/facebook/react) and [Redux](https://github.com/reactjs/react-redux) in its core and bundled with [webpack](https://github.com/webpack/webpack). As a CSS framework, Bootstrap 4 is used with all components provided by [Reactstrap](https://github.com/reactstrap/reactstrap) and bundled using [bootstrap-loader](https://github.com/shakacode/bootstrap-loader).

- [Features](#features)
- [Running](#running)
  - [Development](#development)
    - [What happens during `yarn dev` launch?](#what-happens-during-yarn-dev-launch)
      - [`watch-client`](#watch-client)
      - [`start-dev`](#start-dev)
      - [`start-dev-api`](#start-dev-api)
  - [Production](#production)
    - [What happens during `yarn start` launch?](#what-happens-during-yarn-start-launch)
      - [`start-prod`](#start-prod)
      - [`start-prod-api`](#start-prod-api)
- [Directory structure](#directory-structure)

## Features

- [React Router v4](https://github.com/ReactTraining/react-router)
- Based on the File-Type First (FTF) pattern
- CSS Modules awesomeness using [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
- Fully pre-configured [Bootstrap 4](https://getbootstrap.com/) ready to be used
alongside with React
- Hot Module Replacement (HMR) where possible
- Inline any SVG as a React component using [babel-plugin-inline-react-svg](https://github.com/kesne/babel-plugin-inline-react-svg)
- Possibility to build API to serve your own test data during development
- Proxy between your API and the web app
- Redux actions use [axios](https://github.com/axios/axios) for requests with
requests cancellation support
- Redux related stuff is built with [Immutable.js](https://facebook.github.io/immutable-js/)
in mind

## Running

### Development

To start coding you just need to:

1. Clone the repository:
`git@github.com:victorpopkov/isomorphic-redux-reactstrap.git`
2. Install packages: `yarn install` or `npm install`
3. Launch: `yarn dev` or `npm dev`
4. Visit in your browser: [http://localhost:3000](http://localhost:3000)

#### What happens during `yarn dev` launch?

If you investigate the `package.json` you will find that running `yarn dev`
starts 3 commands concurrently using [concurrently](https://github.com/kimmobrunfeldt/concurrently) package:

##### `watch-client`

Starts the [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
which handles live reloading and provides in-memory access to the webpack
assets. The configurations you can find in `webpack/webpack-dev-server.js`.

##### `start-dev`

Starts a server with the environment set to `development` by executiong
`bin/server.js` and uses `src/server.js` as an entry point. It starts an [Express](https://github.com/expressjs/express)
server to handle server-side rendering (SSR), serve static assets. In addition
it creates a proxy server to your API which can be accessed from [http://localhost:3000/api](http://localhost:3000/api/)
URL by default.

##### `start-dev-api`

Starts a separate [Express](https://github.com/expressjs/express) API server for
serving test data purposes during development and acts as a mock server. This is
especially useful if you want to create tests. It executes `bin/api.js` and uses
`api/api.js` as an entry point.

> You can technically extend and create your own production API if you are not
> planning to use a separate API. However, I would recommend to completely
> separate your API and use this only as a mock server.

### Production

In order to launch the production version you will need to build the project
first before actually starting it:

1. Clone the repository:
`git@github.com:victorpopkov/isomorphic-redux-reactstrap.git`
2. Install packages: `yarn install` or `npm install`
3. Build: `yarn build` or `npm build`
4. Launch: `yarn start` or `npm start`
5. Visit in your browser: [http://localhost:3000](http://localhost:3000)

#### What happens during `yarn start` launch?

If you investigate `package.json` you will find that running `yarn start` starts
3 commands concurrently using [concurrently](https://github.com/kimmobrunfeldt/concurrently)
package:

##### `start-prod`

Starts a server with environment set to `production` by executiong
`bin/server.js` and uses `src/server.js` as an entry point. It starts an [Express](https://github.com/expressjs/express)
server to handle server-side rendering (SSR), serve static assets. In addition
it creates a proxy server to your API which can be accessed from [http://localhost:8080/api](http://localhost:8080/api/)
URL by default.

##### `start-prod-api`

> This command is used only for example purposes.

Starts a separate [Express](https://github.com/expressjs/express) API server for
serving data purposes. It executes `bin/api.js` and uses `api/api.js` as an
entry point. I strongly recommend to completely remove it from your
`package.json` and adapt your `yarn start` accordingly to run a single
`start-prod` command.

## Directory structure

```bash
.
├── api/                         
├── bin/
│   ├── api.js
│   └── server.js
├── build/ # build produced by webpack for production
├── src/
│   ├── assets/ # global assets
│   │   ├── images/
│   │   └── scss/
│   ├── components/ # React components (plain components that are not aware of state)
│   ├── containers/ # React containers (components that interact with state)
│   ├── helpers/
│   │   ├── ApiClient.js # helper to use `axios` library
│   │   └── Html.js      # helper for HTML Server-Side Rendering (SSR)
│   ├── redux/ # Redux related stuff using File-Type First (FTF) pattern
│   │   ├── actions/     # all our Redux actions
│   │   ├── constants/   # all our Redux constants
│   │   ├── events/      # all our events for `redux-notify` middleware
│   │   ├── middlewares/ # all our Redux middlewares
│   │   │   └── client.js # our tiny client middleware
│   │   ├── reducers/    # all Redux reducers
│   │   └── stores/      # all our Redux stores
│   ├── client.js
│   ├── config.js # configs layer between our app and package.json
│   ├── routes.js
│   └── server.js
├── webpack/ # webpack related configs
│   ├── babel-loader.config.js        # prepare .babelrc configs to be consumed by babel-loader
│   ├── dev.config.js                 # `yarn dev` (configs for development)
│   ├── prod.config.js                # `yarn start` (configs for production)
│   ├── webpack-webpack-dev-server.js # `yarn watch-client` (development server with HMR)
│   └── webpack-isomorphic-tools.js   # configs to enable basic SSR for assets
├── postcss.config.js
└── server.babel.js
```

## License

Released under the [MIT License](https://opensource.org/licenses/MIT).
