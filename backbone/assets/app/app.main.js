/**
 * @file app.main.js
 * @alias app.main
 */

/**
 * Require.js needs to know a few things before we can begin.
 * Here is an example of the 3 basic things needed to configure
 * the application: a configuration file, the base URL, and the
 * application package.
 *
 * Define the config file as a value of the app.prototype. The
 * path to your config file should be relative to the site
 * root and contain the full file name. At this point, require
 * has not yet been bootstrapped so it won't add the file
 * extension.
 *
 * Define a base URL, even if it is root. The base URL should
 * always be the path to the folder containing the app package.
 *
 * Define the app package, and any other needed packages.
 * Require assumes the package is in the base URL folder, and
 * has its own main.js. If the server does not follow these
 * standards, you can specify alternate configurations.
 * See http://requirejs.org/docs/api.html#packages for more.
 */
require.config({
  config : {
    'app/plugins/core/app.config.prototype' : {
      configFile : '/config/config.json'
    }
  },
  baseUrl : '/assets',
  packages : ['app'],
  shim : {
    'app.router' : ['app']
  },
  waitSeconds : 0
});

/**
 * Load the packages and router, then begin.
 */
require(['app', 'app.router'], function(app, Router) {
  'use strict';
  new Router();
});