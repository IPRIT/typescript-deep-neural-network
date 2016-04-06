/* Services */

angular.module('Neuro.services', [])

    .service('ApiService', ['$http', function($http) {

        function getClusters() {
            return $http.get('/getClusters').then(function (response) {
                return response.data;
            });
        }

        function getSettings() {
            return $http.get('/getSettings').then(function (response) {
                return response.data;
            });
        }

        function classifyPoint(params) {
            params = {
                point: params
            };
            return $http.post('/classifyPoint', params).then(function (response) {
                return response.data;
            });
        }

        return {
            getClusters: getClusters,
            getSettings: getSettings,
            classifyPoint: classifyPoint
        }
    }])
;