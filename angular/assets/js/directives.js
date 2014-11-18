/**
 * @file directives.js
 */

define([
  'angular',
  'js/services'
], function(
  angular,
  services
){

 angular.module('rad8.directives', [])
    .directive('appVersion', ['version', function(version) {
      return function(scope, elm, attrs) {
        elm.text(version);
    };
  }]);

});