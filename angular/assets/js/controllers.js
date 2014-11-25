/**
 * @file controllers.js
 */

define([
  'angular',
  'js/services'
], function(
  angular,
  services
) {

  var controllers = angular.module('rad8Controllers', []);

  controllers.controller('rad8StoriesController', ['$scope', 'Stories', function($scope, Stories) {

    $scope.dataLoaded = false;

    $scope.stories = Stories.fetch();
    $scope.stories.$promise.then(function(result) {
      $scope.dataLoaded = true;
    });

  }]);

  controllers.controller('rad8StoryController', ['$scope', '$routeParams', 'Story', function($scope, $routeParams, Story) {

    console.log($routeParams);

  }]);


  return controllers;

});