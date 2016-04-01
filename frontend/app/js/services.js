/* Services */

angular.module('Neuro.services', [])

    .service('ApiService', ['$http', function($http) {

        function getClusters() {
            return $http.get('/getClusters').then(function (response) {
                return response.data;
            });
        }

        return {
            getClusters: getClusters
        }
    }])
;