/**
 * @file app.js
 */

define([
  'angular',
  'angular.route',
  'controllers',
  'directives',
  'services'
], function (
  angular,
  filters,
  services,
  directives,
  controllers
) {

    'use strict';

    return angular.module('rad8', [
      'ngRoute',
      'rad8.services',
      'rad8.directives',
      'rad8.controllers'
    ]);

});