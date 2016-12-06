'use strict';

/**
 * @ngdoc overview
 * @name hockeyLiveApp
 * @description
 * # hockeyLiveApp
 *
 * Main module of the application.
 */
angular
    .module('hockeyLiveApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        //'ngTouch'
        'ngMaterial',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'angularFileUpload',
        'md.data.table'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/match', {
                templateUrl: 'views/match.html',
                controller: 'MatchCtrl',
                controllerAs: 'match'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).constant('webApiRoot', (function () {
    return '/api';
})()).constant('WEBAPP_CONFIG', {
    api_route: 'http://127.0.0.1:8000',
    uri_matchs: '/',
    uri_match: '/',
    uri_paris: '/parier'

}).service('ConfigResumeApp', function (WEBAPP_CONFIG) {

    /**
     * Main variable
     * Use an extend to add to possibility to add some testing key
     * @type {void|Object|*}
     */
    var parameters = angular.extend({}, WEBAPP_CONFIG);

    return {
        get: function (name) {
            return parameters[name];
        },
        getUri: function (name) {
            return this.get('api_route') + this.get(name);
        }
    };
}).run(function () {
    if (localStorage) {
        if (!localStorage.getItem('userId')) {
            localStorage.setItem('userId', btoa(new Date()).toString())
        }
    }
});
