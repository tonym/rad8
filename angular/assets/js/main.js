/**
* @name main.js
*/

require.config({
  baseUrl : '/assets',
  paths: {
    angular      : 'lib/angular/angular.min',
    angularRoute : 'lib/angular-route/angular-route.min',
    requireText  : 'lib/requirejs-text/text',
  },
  shim : {
    'angular'      : { 'exports' : 'angular' },
    'angularRoute' : [ 'angular' ],
  },
  priority : [ 'angular' ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require( [
  'angular',
  'js/app',
  'js/routes'
], function(
  angular,
  app,
  routes
) {

  'use strict';

  var $html = angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    angular.resumeBootstrap([app['name']]);
  });

  return this;

});