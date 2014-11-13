/**
 * @file controllers.js
 */

var rad8App = angular.module('rad8App', []);

rad8App.controller('rad8StoriesController', function($scope) {
  $scope.stories = [
    {
      title : 'Tom Thumb'
    },
    {
      title : 'Cinderella'
    },
    {
      title : 'The Princess and the Pea'
    }
  ];
});