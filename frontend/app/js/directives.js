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
                    if (clusters.length > 0 && clusters[0].hasOwnProperty('points')) {
                        //it's clusters' array
                        drawClusters(clusters);
                    } else if (Array.isArray(clusters)) {
                        //in other cases this is just vectors' array
                        drawPoints(clusters);
                    }

                }, 500);

                function drawClusters(clusters) {
                    var canvas = element.find('canvas').get(0);
                    if (!canvas) {
                        return;
                    }
                    canvas.width = element[0].offsetWidth;
                    canvas.height = element[0].offsetHeight;
                    var ctx = canvas.getContext('2d');

                    let radius = 150 / 2.2;
                    let borders = {
                        min: 100 - radius,
                        max: 600 + radius
                    };

                    ctx.beginPath();
                    ctx.moveTo(borders.min, borders.min);
                    ctx.lineTo(borders.min, borders.max);
                    ctx.moveTo(borders.min, borders.max);
                    ctx.lineTo(borders.max, borders.max);
                    ctx.moveTo(borders.max, borders.max);
                    ctx.lineTo(borders.max, borders.min);
                    ctx.moveTo(borders.max, borders.min);
                    ctx.lineTo(borders.min, borders.min);
                    ctx.stroke();

                    clusters.forEach(function (cluster, clusterIndex) {
                        var rndWithSeed = new Math.seedrandom(clusterIndex + 10);
                        var r = Math.ceil(rndWithSeed() * 255);
                        var g = Math.ceil(rndWithSeed() * 255);
                        var b = Math.ceil(rndWithSeed() * 255);
                        var alpha = rndWithSeed();
                        alpha = alpha < 0.5 ? alpha + 0.5 : alpha;

                        ctx.strokeStyle = "rgba(" + r + ", " + g + ", " + b + "," + alpha + ")";
                        ctx.beginPath();
                        ctx.arc(cluster.center.coords[0], cluster.center.coords[1], cluster.radius, -2 * Math.PI, 2 * Math.PI, true);
                        ctx.stroke();

                        ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + "," + Math.max(alpha - 0.2, 0.4) + ")";
                        cluster.points.forEach(function (point, pointIndex) {
                            var x = point.coords[0],
                                y = point.coords[1];
                            ctx.beginPath();
                            ctx.arc(x, y, 3, -2 * Math.PI, 2 * Math.PI, true);
                            ctx.fill();
                        });
                    });
                }

                function drawPoints(points) {
                    var canvas = element.find('canvas').get(0);
                    if (!canvas) {
                        return;
                    }
                    canvas.width = element[0].offsetWidth;
                    canvas.height = element[0].offsetHeight;
                    var ctx = canvas.getContext('2d');

                    var rndWithSeed = new Math.seedrandom(points.length + 10);
                    var r = Math.ceil(rndWithSeed() * 255);
                    var g = Math.ceil(rndWithSeed() * 255);
                    var b = Math.ceil(rndWithSeed() * 255);
                    var alpha = rndWithSeed();
                    alpha = alpha < 0.5 ? alpha + 0.5 : alpha;

                    ctx.strokeStyle = "rgba(" + r + ", " + g + ", " + b + "," + alpha + ")";
                    ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + "," + Math.max(alpha - 0.2, 0.4) + ")";

                    points.forEach(function (point, pointIndex) {
                        var x = point[0],
                            y = point[1];
                        ctx.beginPath();
                        ctx.arc(x * 100, y * 100, 3, -2 * Math.PI, 2 * Math.PI, true);
                        ctx.fill();
                    });
                }
            }
        }
    })
;