'use strict';

angular.module('hockeyLiveApp')
    .factory('matchs', function (ConfigResumeApp, Model, $http) {

        var matchs = function matchs(element) {
            Model.call(this, element, 'matchs');
            this.uri = ConfigResumeApp.getUri('uri_matchs');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.idMatch = element.idMatch,
                    this.startTime = element.startTime,
                    this.score = element.score,
                    this.home = element.home,
                    this.away = element.away,
                    this.localisation = element.localisation,
                    this.status = element.status
            }
        };

        // ------- Apply model extend
        matchs.prototype = Object.create(Model.prototype);
        matchs.prototype.constructor = matchs;

        matchs.getAllmatchs = function (cb) {
            $http.get(ConfigResumeApp.getUri('uri_matchs')).success(function (data, status) {
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
        return matchs;
    })
;