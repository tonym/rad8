/**
 * @file main.js
 */

require.config({
  baseUrl : '/assets',
  packages : ['app'],
  shim : {
    'app.router' : ['app']
  }
});

/**
 * bootstrap the application
 */
require(['app', 'app.router'], function(app, Router) {

  'use strict';

  /**
  * IE 10 doesn't implement media queries correctly.
  * IE 10 doesn't read conditional comments.
  * So, to make IE 10 mobile show the responsive mobile
  * site, we endure this.
  * Thank you, Microsoft.
  */
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(
      document.createTextNode(
        "@-ms-viewport{width:auto!important}"
      )
    );
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
  }

  new Router();

});
