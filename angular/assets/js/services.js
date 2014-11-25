/**
 * @fileOverview  services.js
 */

define([
  'angular',
  'angularResource'
], function(
  angular,
  angularResource
){

  'use strict';

  var _options = {
    service : '//rad8.inspecdigital.org/',
    endpoints : {
      stories : 'stories',
      story : '{{path}}'
    },
    headers : {
      'Content-type' : 'application/hal+json',
      'Accept' : 'application/hal+json',
      'PHP_AUTH_USER' : 'restuser',
      'PHP_AUTH_PW' : 'restpassword'
    }
  };

  var services = angular.module('rad8Services', ['ngResource']);

  services.factory('Stories', ['$resource', function($resource) {

    return $resource(_options.service + _options.endpoints.stories, {}, {
      fetch : { method : 'GET', headers : _options.headers, isArray : true }
    });

  }]);

  services.factory('Story', ['$resource', function($resource) {

    return $resource(_options.service);

  }]);

  return services;

});