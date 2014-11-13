/**
 * @file directives.js
 */

define([
  'angular',
  'services'
], function(
  angular,
  services
){

 angular.module('rad8.directives', ['rad8.services'])
    .directive('appVersion', ['version', function(version) {
      return function(scope, elm, attrs) {
        elm.text(version);
    };
  }]);

});