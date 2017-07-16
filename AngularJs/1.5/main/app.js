'use strict';

// Declare app level module which depends on views, and components
angular.module('main', [
    'ngRoute',
    'marvel'
])

.controller('mainCtrl', ['$scope', function($scope) {
    $scope.title = 'Marvel Application';
}])

// Click to Navigate to Link.
.directive('clickLink', ['$location', function($location) {
    return {
        link: function(scope, element, attrs) {
            element.on('click', function() {
                scope.$apply(function() {
                    $location.path(attrs.clickLink);
                });
            });
        }
    }
}])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/marvel/5'});
}]);