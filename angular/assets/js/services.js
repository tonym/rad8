/**
 * @fileOverview  services.js
 */

define([
  'angular',
  'angular.resource'
], function(
  angular,
  angularResource
){

  'use strict';

  var drupalService = angular.module('drupalService', ['ngResource']);

  drupalService.factory('Drupal', ['$resource', function($resource) {
    return $resource('http://www.inspecdigital.com/rad8/:path', {}, {
      get : { method : 'GET' },
      post : { method : 'POST' },
      patch : { method : 'PATCH' }
    });
  }]);

  angular.module('rad8.services', []).value('version', 'dev');

  return this;

});