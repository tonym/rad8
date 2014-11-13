/**
 * @name main.js
 */

(function() {

 'use strict';

  require.config({
    baseUrl : '/assets',
    paths: {
      'angular'          : 'lib/angular/angular.min',
      'angular.mocks'    : 'lib/angular-mocks/angular-mocks.min',
      'angular.resource' : 'lib/angular-resource/angular-resource.min',
      'angular.route'    : 'lib/angular-route/angular-route.min',
      'app'              : 'js/app',
      'controllers'      : 'js/controllers',
      'directives'       : 'js/directives',
      'require.text'     : 'lib/requirejs-text/text',
      'routes'           : 'js/routes',
      'services'         : 'js/services'
    },
    shim: {
      'angular'       : { exports : 'angular' },
      'angular.mocks' : {
        deps : [ 'angular' ],
        exports : 'angular.mocks'
      },
      'angular.resource' : {
        deps : [ 'angular' ],
        exports : 'angular.resource'
      },
      'angular.route' : {
        deps : [ 'angular' ],
        exports : 'angular.route'

      }
    },
    priority: [ 'angular' ]
  });

  //http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
  window.name = "NG_DEFER_BOOTSTRAP!";

  require( [
    'angular',
    'app',
    'routes'
  ], function(
    angular,
    app,
    routes
  ) {

    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
      angular.resumeBootstrap([app['rad8']]);
    });

    return this;

  });

}());