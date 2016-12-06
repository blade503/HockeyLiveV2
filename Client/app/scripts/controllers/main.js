'use strict';

/**
 * @ngdoc function
 * @name hockeyLiveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hockeyLiveApp
 */
angular.module('hockeyLiveApp')
    .controller('MainCtrl', function ($scope, matchs, $location) {
        $scope.listMatchs = [];
        $scope.currentPath = $location.path();
        if(localStorage.getItem("idMatch"))
            localStorage.removeItem("idMatch");
        matchs.getAllmatchs(function (data, status) {
            console.log(data);
            angular.forEach(data.matchs, function(m){
                $scope.listMatchs.push(new matchs(m));
            });
            //$scope.listMatchs[0].status.codedGameState = 2;
        });

        /*var data = {
            "nbMatch": 6,
            "matchs": [
                {
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
                },
                {
                    "idMatch": 2016020207,
                    "startTime": "2016-11-12T00:00:00Z",
                    "score": "0:0",
                    "home": {
                        "name": "Toronto Maple Leafs",
                        "score": 0,
                        "id": 10,
                        "stats": {
                            "wins": 5,
                            "losses": 5,
                            "ot": 3,
                            "type": "league"
                        }
                    },
                    "away": {
                        "name": "Philadelphia Flyers",
                        "score": 0,
                        "id": 4,
                        "stats": {
                            "wins": 6,
                            "losses": 6,
                            "ot": 2,
                            "type": "league"
                        }
                    },
                    "localisation": "Air Canada Centre",
                    "status": {
                        "abstractGameState": "Preview",
                        "codedGameState": "1",
                        "detailedState": "Scheduled",
                        "statusCode": "1"
                    }
                },
                {
                    "idMatch": 2016020208,
                    "startTime": "2016-11-12T00:30:00Z",
                    "score": "0:0",
                    "home": {
                        "name": "Ottawa Senators",
                        "score": 0,
                        "id": 9,
                        "stats": {
                            "wins": 8,
                            "losses": 5,
                            "ot": 0,
                            "type": "league"
                        }
                    },
                    "away": {
                        "name": "Los Angeles Kings",
                        "score": 0,
                        "id": 26,
                        "stats": {
                            "wins": 7,
                            "losses": 7,
                            "ot": 0,
                            "type": "league"
                        }
                    },
                    "localisation": "Canadian Tire Centre",
                    "status": {
                        "abstractGameState": "Preview",
                        "codedGameState": "1",
                        "detailedState": "Scheduled",
                        "statusCode": "1"
                    }
                },
                {
                    "idMatch": 2016020209,
                    "startTime": "2016-11-12T01:30:00Z",
                    "score": "0:0",
                    "home": {
                        "name": "Chicago Blackhawks",
                        "score": 0,
                        "id": 16,
                        "stats": {
                            "wins": 10,
                            "losses": 3,
                            "ot": 1,
                            "type": "league"
                        }
                    },
                    "away": {
                        "name": "Washington Capitals",
                        "score": 0,
                        "id": 15,
                        "stats": {
                            "wins": 8,
                            "losses": 3,
                            "ot": 1,
                            "type": "league"
                        }
                    },
                    "localisation": "United Center",
                    "status": {
                        "abstractGameState": "Preview",
                        "codedGameState": "1",
                        "detailedState": "Scheduled",
                        "statusCode": "1"
                    }
                },
                {
                    "idMatch": 2016020210,
                    "startTime": "2016-11-12T02:00:00Z",
                    "score": "0:0",
                    "home": {
                        "name": "Colorado Avalanche",
                        "score": 0,
                        "id": 21,
                        "stats": {
                            "wins": 5,
                            "losses": 7,
                            "ot": 0,
                            "type": "league"
                        }
                    },
                    "away": {
                        "name": "Winnipeg Jets",
                        "score": 0,
                        "id": 52,
                        "stats": {
                            "wins": 7,
                            "losses": 7,
                            "ot": 1,
                            "type": "league"
                        }
                    },
                    "localisation": "Pepsi Center",
                    "status": {
                        "abstractGameState": "Preview",
                        "codedGameState": "1",
                        "detailedState": "Scheduled",
                        "statusCode": "1"
                    }
                },
                {
                    "idMatch": 2016020211,
                    "startTime": "2016-11-12T02:00:00Z",
                    "score": "0:0",
                    "home": {
                        "name": "Edmonton Oilers",
                        "score": 0,
                        "id": 22,
                        "stats": {
                            "wins": 9,
                            "losses": 4,
                            "ot": 1,
                            "type": "league"
                        }
                    },
                    "away": {
                        "name": "Dallas Stars",
                        "score": 0,
                        "id": 25,
                        "stats": {
                            "wins": 5,
                            "losses": 6,
                            "ot": 3,
                            "type": "league"
                        }
                    },
                    "localisation": "Rogers Place",
                    "status": {
                        "abstractGameState": "Preview",
                        "codedGameState": "1",
                        "detailedState": "Scheduled",
                        "statusCode": "1"
                    }
                }
            ]
        };*/



        {
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
        },

    });
