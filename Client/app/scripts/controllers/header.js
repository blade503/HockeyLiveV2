'use strict';

angular.module('hockeyLiveApp')
    .controller('headerController', function ($rootScope, $scope, $mdToast, $location, $mdMedia, paris, match, $route) {

        $scope.userId = localStorage.getItem('userId');
        $scope.listParisEnCours = [];
        $scope.listParisTermine = [];
        $scope.gains = 0;

        Array.prototype.getUnique = function () {
            var u = {}, a = [];
            for (var i = 0, l = this.length; i < l; ++i) {
                if (u.hasOwnProperty(this[i])) {
                    continue;
                }
                a.push(this[i]);
                u[this[i]] = 1;
            }
            return a;
        };

        $scope.parisMAJ = function (id) {
            paris.getParis(id, function (data, status) {
                if (data.length > 0) {
                    $rootScope.nbParis = data.length;
                    angular.forEach(data, function (pari) {
                        var ok = true;
                        angular.forEach($scope.listParisEnCours, function(pec){
                            if(pari.idMatch == pec.idMatch)
                                ok = false;
                        });
                        if(ok){
                            if (pari.status != "Final")
                                $scope.listParisEnCours.push(pari);
                            else
                                $scope.listParisTermine.push(pari);
                        }
                    });

                    angular.forEach($scope.listParisEnCours, function (pari) {
                        $scope.gagne = false;
                        match.getMatch(pari.idMatch, function (data, status) {
                            if(data.status.codedGameState == 7){
                                pari.status = 'Termine';
                                var ok = true;
                                angular.forEach($scope.listParisTermine, function(pec){
                                    if(pari.idMatch == pec.idMatch)
                                        ok = false;
                                });
                                if(ok)
                                    $scope.listParisTermine.push(pari);
                            }
                        });
                        var index = $scope.listParisEnCours.indexOf(pari);
                        $scope.listParisEnCours.splice(index, 1);
                    });

                    angular.forEach($scope.listParisTermine, function (pari) {
                        $scope.gagne = false;
                        match.getMatch(pari.idMatch, function (data, status) {
                                if (pari.equipe == data.home.name) {
                                    $scope.gagne = data.home.score > data.away.score;
                                }
                                else {
                                    $scope.gagne = data.away.score > data.home.score;
                                }
                            if ($scope.gagne) {
                                $scope.gains += pari.montant;
                            }
                        });
                    });
                }
            });
            $scope.listParisTermine = $scope.listParisTermine.getUnique();
            $scope.listParisEnCours = $scope.listParisEnCours.getUnique();
        };

        $scope.actualiser = function(){
            $route.reload();
        };

        $scope.$watch(function () {
            return $rootScope.nbParis;
        }, function (nbParis) {
            $scope.parisMAJ($scope.userId);
        });

        $scope.$watch(function () {
            return $mdMedia('xs');
        }, function (petit) {
            if (petit) {
                $scope.screenPetit = "menuUserCollapse nav navbar-right navbar-nav";
            } else {
                $scope.screenPetit = "menuUser nav navbar-right navbar-nav";
            }
        });

        $scope.$watch(function () {
            if (localStorage.getItem('userId') && localStorage.getItem('parisUser'))
                return localStorage.getItem('parisUser');
        }, function (paris) {
            if (paris) {
                console.log(paris)
            }
        });

        $scope.deconnexion = function () {
            $rootScope.user = null;
            localStorage.removeItem('userLog');
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Déconnexion réussie')
                    .position('bottom right')
                    .hideDelay(3000)
            );
            $location.path('/');
        };

        var originatorEv;

        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        $scope.connexion = function () {
            $location.path('/login');
            hamburger_cross();
            $('#wrapper').toggleClass('toggled');
        };

        $scope.monCompte = function () {
            $location.path('/monCompte');
            hamburger_cross();
            $('#wrapper').toggleClass('toggled');
        };

        $scope.home = function () {
            $location.path('/');
            hamburger_cross();
            $('#wrapper').toggleClass('toggled');
        };

        $scope.contact = function () {
            $location.path('/contact');
            hamburger_cross();
            $('#wrapper').toggleClass('toggled');
        };

        $scope.aPropos = function () {
            $location.path('/about');
            hamburger_cross();
            $('#wrapper').toggleClass('toggled');
        };

        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
            isClosed = false;

        trigger.click(function () {
            hamburger_cross();
        });

        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });

        function hamburger_cross() {

            if (isClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }

        $scope.goTo = function (path) {
            $location.path(path);
            hamburger_cross();
            $('#wrapper').toggleClass('toggled');
        };
    });
