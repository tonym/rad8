/**
 * @file app.js
 */
define([
  'angular',
  'js/services',
  'js/controllers',
  'angularRoute'
], function (
  angular,
  services,
  controllers,
  angularRoute
) {

  'use strict';

  var rad8 = angular.module('rad8', [
    'ngRoute',
    'rad8Services',
    'rad8Controllers'
  ]);

  return rad8;

});