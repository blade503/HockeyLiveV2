'use strict';

angular.module('hockeyLiveApp')
    .factory('paris', function (ConfigResumeApp, Model, $http) {

        var paris = function paris(element) {
            Model.call(this, element, 'paris');
            this.uri = ConfigResumeApp.getUri('uri_paris');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.idPari = element.idPari,
                    this.idMatch = element.idMatch,
                    this.idJoueur = element.idJoueur,
                    this.montant = element.montant,
                    this.equipe = element.equipe,
                    this.statut = element.status,
                    this.nomParis = ""
            }
        };

        // ------- Apply model extend
        paris.prototype = Object.create(Model.prototype);
        paris.prototype.constructor = paris;

        paris.getParis = function (id, cb) {
            $http.get(ConfigResumeApp.getUri('uri_paris') + "/" + id).success(function (data, status) {
                if (status == 200) {
                    cb(data, status);
                }
                else {
                    console.log("Erreur : " + status + " - " + data);
                    cb(data, status);
                }
            }).error(function (data, status) {
                console.log("Erreur : " + status + " - " + data);
                cb(data, status);
            })
        };

        paris.addParis = function (pari, cb) {
            $http.post(ConfigResumeApp.getUri('uri_paris'), pari).success(function (data, status) {
                if (status == 200) {
                    cb(data, status);
                }
                else {
                    console.log("Erreur : " + status + " - " + data);
                    cb(data, status);
                }
            }).error(function (data, status) {
                console.log("Erreur : " + status + " - " + data);
                cb(data, status);
            })
        };

        return paris;
    })
;