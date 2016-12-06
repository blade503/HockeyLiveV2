'use strict';

angular.module('hockeyLiveApp')
    .directive('matchReview', function ($mdToast, $mdDialog, paris, $rootScope, $location) {
        return {
            restrict: 'E',
            templateUrl: '../../../views/CardMatch.html',
            scope: {
                match: "=",
                currentPath: "="
            },
            link: function (scope) {
                scope.paris = {};
                scope.paris.montant = 0;
                scope.paris.choix = {};
                scope.affRes = false;
                scope.$watch(function(){
                    return scope.match;
                }, function(){
                    if(scope.match){
                        scope.paris.choix[scope.match.home.name] = false;
                        scope.paris.choix[scope.match.away.name] = false;
                        scope.affRes = true;
                    }
                });
                scope.paris.choix.none = false;
                scope.nonValid = false;
                scope.cotes = [1.45, 2, 1.45];

                scope.$watch(function () {
                    return scope.paris.montant;
                }, function () {
                    if (scope.paris.montant > 1000)
                        scope.paris.montant = 1000;
                    if (scope.paris.montant < 0)
                        scope.paris.montant = 0;
                });

                scope.enSavoirPlus = function(id){
                    localStorage.setItem("idMatch", id);
                    $location.url("/match")
                };

                scope.updateChoice = function (id) {
                    angular.forEach(scope.paris.choix, function (value, key) {
                        if (key != id) {
                            if (value == true) {
                                scope.paris.choix[key] = false;
                            }
                        }
                    })
                };

                scope.pariez = function () {
                    if(scope.match.linescore.currentPeriod > 2){
                        scope.error = true;
                    }
                    else {
                        $mdDialog.show({
                            controller: function () {
                                this.match = scope;
                            },
                            controllerAs: "ctrl",
                            templateUrl: 'views/pariez.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose: false
                        })
                    }
                };
                scope.annuler = function () {
                    $mdDialog.hide();
                    scope.paris.choix.eq1 = false;
                    scope.paris.choix.eq2 = false;
                    scope.paris.choix.none = false;
                };
                scope.formValid = true;
                scope.checkValid = function () {
                    var count = 0;
                    angular.forEach(scope.paris.choix, function (key, value) {
                        if (value == true) {
                            count += 1;
                        }
                    });
                    scope.formValid = !(count == 1 && scope.paris.montant > 0);
                };
                scope.sauvegarder = function () {
                    var count = 0;
                    angular.forEach(scope.paris.choix, function (key, value) {
                        if (value == true) {
                            count += 1;
                        }
                    });
                    if (count != 1 && scope.paris.montant == 0) {
                        scope.nonValid = true;
                    }
                    else {
                        var pari = new paris();
                        pari.idPari = btoa(Math.random());
                        pari.idJoueur = localStorage.getItem('userId');
                        pari.idMatch = scope.match.idMatch;
                        angular.forEach(scope.paris.choix, function (value, key) {
                            if (value == true) {
                                pari.equipe = key;
                            }
                        });
                        if(pari.equipe != "none")
                            pari.montant = scope.paris.montant * 1.45;
                        else
                            pari.montant = scope.paris.montant * 2;
                        pari.statut = "enCours";

                        paris.addParis(pari, function(data, status){
                        });

                        $rootScope.nbParis += 1;

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Pari enregistré!')
                                .position('bottom right')
                                .hideDelay(3000)
                        );

                        scope.nonValid = false;
                        $mdDialog.hide();
                    }
                };
            }
        }
    });