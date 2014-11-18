/**
 * @file controllers.js
 */

define(['angular'], function(angular) {

  return angular.module('rad8.controllers', [])
    .controller('rad8StoriesController', ['$scope', '$http', function($scope, $http) {

      $scope.dataLoaded = false;

      $http.get('//rad8.inspecdigital.org/stories', { headers : {
                                                        'Content-type' : 'application/hal+json',
                                                        'Accept' : 'application/hal+json',
                                                        'PHP_AUTH_USER' : 'restuser',
                                                        'PHP_AUTH_PW' : 'restpassword'
                                                        }
      }).success(function(response) {
        $scope.dataLoaded = true;
        $scope.stories = response;
      }).error(function(response) {
        console.log(response);
      });

    }]);

});