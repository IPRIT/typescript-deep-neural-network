'use strict';

/* Directives */

angular.module('Neuro.directives', [])

    .directive('clusters', function ($timeout) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: templateUrl('clusters', 'index'),
            controller: 'ClustersCtrl',
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var clusters = scope.clusters;
                    draw(clusters);
                }, 1000);

                function draw(clusters) {
                    var canvas = element.find('canvas').get(0);
                    if (!canvas) {
                        return;
                    }
                    canvas.width = element[0].offsetWidth;
                    canvas.height = element[0].offsetHeight;
                    var ctx = canvas.getContext('2d');

                    clusters.forEach(function (cluster, clusterIndex) {
                        var r = Math.ceil(Math.random() * 255);
                        var g = Math.ceil(Math.random() * 255);
                        var b = Math.ceil(Math.random() * 255);
                        var alpha = Math.random();
                        alpha = alpha < 0.5 ? alpha + 0.5 : alpha;

                        ctx.strokeStyle = "rgba(" + r + ", " + g + ", " + b + "," + alpha + ")";
                        ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + "," + Math.max(alpha - 0.2, 0.4) + ")";
                        cluster.points.forEach(function (point, pointIndex) {
                            var x = point.coords[0],
                                y = point.coords[1];
                            ctx.beginPath();
                            ctx.arc(x, y, 3, -2 * Math.PI, 2 * Math.PI, true);
                            ctx.fill(); // *14
                        });
                    });
                }
            }
        }
    })
;