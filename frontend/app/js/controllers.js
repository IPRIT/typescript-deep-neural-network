'use strict';

/* Controllers */

angular.module('Neuro.controllers', [])
    .controller('PageCtrl', ['$scope', function($scope) {
        console.log(1);
    }])

    .controller('AppCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        console.log(2);
    }])

    .controller('IndexCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        console.log(3);
    }])

    .controller('ClustersCtrl', ['$scope', 'ApiService', function ($scope, ApiService) {
        console.log('Works');
        $scope.clusters = [];
        ApiService.getClusters().then(function (data) {
            console.log(data);
            $scope.clusters = data;
        });
    }])
;