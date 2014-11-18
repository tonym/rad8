/**
 * @file app.js
 */
define([
  'angular',
  'js/controllers',
  'angularRoute'
], function (
  angular,
  controllers,
  angularRoute
) {

    'use strict';

    return angular.module('rad8', [
      'ngRoute',
      'rad8.controllers'
    ]);

});