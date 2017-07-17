'use strict';

/**
 *  Declare main application with dependencies
 * [ngRoute, marvel]
 */
angular.module('main', [
    'ngRoute',
    'marvel'
])

// Initialize title on main controller.
.controller('mainCtrl', ['$scope', function($scope) {
    $scope.title = 'Marvel Application';
}])

// Create a directive for simplify the navigation with path.
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

// Define the main route (rules was : display 20 elements after the N°100 = page 6)
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/marvel/6'});
}]);