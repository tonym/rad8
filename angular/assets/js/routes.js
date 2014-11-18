/**
 * @fileOverview  routes.js
 */

define([
  'angular',
  'js/app'
], function(
  angular,
  app
) {

  'use strict';

  return app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
      templateUrl: '/assets/templates/landing.main.partial.tpl',
      controller: 'rad8StoriesController'
    });

    $routeProvider.when('/:story', {
      teplateUrl: '/assets/templates/story.main.partial.tpl',
      controller: 'rad8StoriesController'
    });

    $routeProvider.otherwise({redirectTo: '/'});

  }]);

});