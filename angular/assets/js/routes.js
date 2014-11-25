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

    $routeProvider
      .when('/story/:story*', {
        templateUrl: '/assets/templates/landing.main.partial.tpl',
        controller: 'rad8StoryController'
      })
      .when('/', {
        templateUrl: '/assets/templates/landing.main.partial.tpl',
        controller: 'rad8StoriesController'
      });

  }]);

});