'use strict';

angular.module('hockeyLiveApp')
    .factory('users', function (ConfigResumeApp, Model, $http) {

        var users = function users(element) {
            Model.call(this, element, 'users');
            this.uri = ConfigResumeApp.getUri('uri_user');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.login = element.login;
                this.password = element.password;
                this.mail = element.mail;
                this.isLoged = element.isLoged;
            }
        };

        // ------- Apply model extend
        users.prototype = Object.create(Model.prototype);
        users.prototype.constructor = users;

        users.find = function(id, cb){
            $http.get(ConfigResumeApp.getUri('uri_user') + "/" + id).success(function (data, status) {
                if(status == 200){
                    cb(data, status);
                }
                else{
                    console.log("Erreur : " + data);
                    cb(data, status);
                }
            }).error(function(data, status){
                console.log("Erreur : " + data);
                cb(data, status);
            })
        };

        users.login = function(credentials, cb){
            $http.post(ConfigResumeApp.getUri('uri_user') + '/login', credentials).success(function (data, status) {
                if(status == 200){
                    cb(data, status);
                }
                else{
                    console.log("Erreur : " + data);
                    cb(data, status);
                }
            }).error(function(data, status){
                console.log("Erreur : " + data);
                cb(data, status);
            })
        };

        users.modification = function(infos, cb){
            $http.post(ConfigResumeApp.getUri('uri_user') + '/modification', infos).success(function(data, status){

                if(status == 200){
                    cb(data, status);
                }
                else{
                    console.log("Erreur : " + data);
                    cb(data, status);
                }
            }).error(function(data, status){
                console.log("Erreur : " + data);
                cb(data, status);
            })
        };

        users.modificationMDP = function(data, cb) {
            $http.post(ConfigResumeApp.getUri('uri_user') + '/modifMDP', data).success(function (data, status) {
                cb(data, status);
            }).error(function (data, status) {
                cb(data, status);
            }).error(function(data, status){
                console.log("Erreur : " + data);
                cb(data, status);
            });
        };

        return users;
    });