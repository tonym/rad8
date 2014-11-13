/**
 * @file main.js
 */

(function() {

  'use strict';

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

    /**
    * IE 10 mobile doesn't implement media queries correctly.
    * IE 10 mobile doesn't read conditional comments.
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

    /**
     * Ready....GO!
     */
    new Router();

    return this;

  });

}());
