'use strict';

function templateUrl (prefix, tplName) {
    var templateUrlPart = 'partials/' + prefix + '/' + tplName + '.html';
    console.log(templateUrlPart);
    return templateUrlPart;
}

angular.module('Neuro', [
        'ng',
        'ngRoute',
        'ui.router',
        'ngSanitize',
        'ngMaterial',
        'ngAnimate',
        'ngAria',
        'ngMessages',

        'Neuro.controllers',
        'Neuro.directives',
        'Neuro.services'
    ])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
        function($locationProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('red');

            $locationProvider.hashPrefix('!');
            $locationProvider.html5Mode(true);

            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('index', {
                    url: '/',
                    templateUrl: templateUrl('index', 'index'),
                    controller: 'IndexCtrl'
                })
        }
    ]);