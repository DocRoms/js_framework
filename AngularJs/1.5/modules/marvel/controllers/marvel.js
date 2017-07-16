'use strict';

angular.module('marvel', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/marvel/:page', {
            resolveAs : 'marvel_list',
            controller: 'marvelCtrl',
            templateUrl: 'modules/marvel/views/list.html'
        }).when('/marvel/details/:persoId', {
            resolveAs : 'marvel_details',
            controller: 'marvelDetailsCtrl',
            templateUrl: 'modules/marvel/views/details.html'
        });
    }])

    .controller('marvelCtrl',
        ['$scope', '$routeParams', '$marvelApiService',
            function($scope,$routeParams, $marvelApiService) {
                $scope.title = 'Liste des personnages';
                $scope.page = parseInt($routeParams.page);

                $marvelApiService.getCharactersListByPage($routeParams.page).then(function(response) {
                    $scope.items = response;
                });

    }])

    .controller('marvelDetailsCtrl', [
        '$scope', '$routeParams', '$marvelApiService',
            function($scope, $routeParams, $marvelApiService) {

                $scope.title = 'Détails du personnage ';

                $marvelApiService.getCharactersDetailsById($routeParams.persoId).then(function(response) {
                    $scope.items = response;
                });

    }]);