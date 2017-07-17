'use strict';

/**
 *  Declare marvel application with dependencies
 * [ngRoute]
 */
angular.module('marvel', ['ngRoute'])

// Create list of routes for this application
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    // path '/marvel/:nbPage' : display page elements from API.
    when('/marvel/:page', {
        resolveAs : 'marvel_list',
        controller: 'marvelCtrl',
        templateUrl: 'modules/marvel/views/list.html'
    })
    // path '/marvel/details/:persoId' : show details of characters by Id.
    .when('/marvel/details/:persoId', {
        resolveAs : 'marvel_details',
        controller: 'marvelDetailsCtrl',
        templateUrl: 'modules/marvel/views/details.html'
    });
}])

// 'marvelCtrl' : Controller for manage route 'marvel/:nbPage'
.controller('marvelCtrl',
    ['$scope', '$routeParams', '$marvelApiService',
        function($scope,$routeParams, $marvelApiService) {
            $scope.title = 'Liste des personnages';
            $scope.page = parseInt($routeParams.page);

            $marvelApiService.getCharactersListByPage($routeParams.page).then(function(response) {
                $scope.items = response;
            });

}])

// 'marvelDetailsCtrl' : Controller for manage route 'marvel/details/:persoId'
.controller('marvelDetailsCtrl', [
    '$scope', '$routeParams', '$marvelApiService',
        function($scope, $routeParams, $marvelApiService) {

            $scope.title = 'Détails du personnage ';

            $marvelApiService.getCharactersDetailsById($routeParams.persoId).then(function(response) {
                $scope.items = response;
            });
}]);