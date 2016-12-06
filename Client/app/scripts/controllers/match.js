'use strict';

/**
 * @ngdoc function
 * @name hockeyLiveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hockeyLiveApp
 */
angular.module('hockeyLiveApp')
    .controller('MatchCtrl', function ($scope, match, $location, $timeout, $route) {
        $scope.listMatchs = [];
        $scope.currentPath = $location.path();

        /*var data2 = {
            "idMatch": 2016020206,
            "startTime": "2016-11-12T00:00:00Z",
            "score": "0:0",
            "home": {
                "name": "Buffalo Sabres",
                "score": 0,
                "id": 7,
                "stats": {
                    "wins": 5,
                    "losses": 5,
                    "ot": 3,
                    "type": "league"
                }
            },
            "away": {
                "name": "New Jersey Devils",
                "score": 0,
                "id": 1,
                "stats": {
                    "wins": 6,
                    "losses": 3,
                    "ot": 3,
                    "type": "league"
                }
            },
            "localisation": "KeyBank Center",
            "status": {
                "abstractGameState": "Final",
                "codedGameState": "7",
                "detailedState": "Final",
                "statusCode": "7"
            }
        };*/
        match.getMatch(localStorage.getItem("idMatch"), function(data, status){
            $scope.listMatchs.push(new match(data));
        });

        $timeout(function() {
            $route.reload();
        }, 120000);

    });
