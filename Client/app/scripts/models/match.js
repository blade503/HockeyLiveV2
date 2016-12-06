'use strict';

angular.module('hockeyLiveApp')
    .factory('match', function (ConfigResumeApp, Model, $http) {

        var match = function match(element) {
            Model.call(this, element, 'match');
            this.uri = ConfigResumeApp.getUri('uri_match');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.idMatch = element.idMatch,
                    this.startTime = element.startTime,
                    this.score = element.score,
                    this.home = element.home,
                    this.away = element.away,
                    this.localisation = element.localisation,
                    this.status = element.status,
                    this.linescore = element.linescore
            }
        };

        // ------- Apply model extend
        match.prototype = Object.create(Model.prototype);
        match.prototype.constructor = match;

        match.getMatch = function (id, cb) {
            $http.get(ConfigResumeApp.getUri('uri_match') + id).success(function (data, status) {
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
        return match;
    })
;