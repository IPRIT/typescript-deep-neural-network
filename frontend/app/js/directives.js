'use strict';

/* Directives */

angular.module('Neuro.directives', [])

    .directive('clusters', function ($timeout, $interval, ApiService) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: templateUrl('clusters', 'index'),
            controller: 'ClustersCtrl',
            link: function (scope, element, attrs) {
                $timeout(function () {
                    render();
                }, 500);

                var canvas = element.find('canvas').get(0);
                if (!canvas) {
                    return;
                }
                canvas.width = element[0].offsetWidth;
                canvas.height = element[0].offsetHeight;
                var ctx = canvas.getContext('2d');
                ctx.shadowColor = 'rgba(0,0,0,0.4)';
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 1;

                function render() {
                    var clusters = scope.clusters,
                        settings = scope.settings;
                    if (clusters.length > 0 && clusters[0].hasOwnProperty('points')) {
                        //it's clusters' array
                        drawClusters(clusters, settings);
                    } else if (Array.isArray(clusters)) {
                        //in other cases this is just vectors' array
                        drawPoints(clusters, settings);
                    }
                }

                function drawClusters(clusters, settings) {
                    let borders = {
                        min: settings.minBoundary - settings.minDistanceBetween,
                        max: settings.maxBoundary + settings.minDistanceBetween
                    };

                    ctx.strokeStyle = "#222";
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
                        ctx.shadowColor = "rgba(0,0,0,0.4)";
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 1;
                        ctx.shadowBlur = 5;
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

                        var fontSize = 30;
                        ctx.font = 'bold ' + fontSize + 'px Arial';
                        ctx.strokeStyle = "#FFF";
                        ctx.save();
                        ctx.shadowColor = "#000";
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 2;
                        ctx.shadowBlur = 2;
                        ctx.strokeText(clusterIndex + 1, cluster.center.coords[0] - (fontSize / 4) * (clusterIndex + 1).toString().length, cluster.center.coords[1] + fontSize / 3);
                        ctx.restore();
                    });
                }

                function drawPoints(points, settings) {
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

                function drawClickedPoint(point) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    render();

                    ctx.strokeStyle = "#B8890E";
                    ctx.fillStyle = "rgba(255, 191, 21, 1)";
                    ctx.shadowColor = "rgba(0,0,0,0.5)";
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 2;
                    ctx.shadowBlur = 5;
                    var pointRadius = 5;
                    ctx.beginPath();
                    ctx.arc(point.x - pointRadius/2, point.y - pointRadius/2, pointRadius, -2 * Math.PI, 2 * Math.PI, true);
                    ctx.fill();
                }

                var canvasWithWrap = element.find('canvas');
                var updateInterval;

                window.addEventListener('resize', render);
                canvasWithWrap.on('click', function (ev) {
                    scope.clickedPoint = { x: ev.offsetX, y: ev.offsetY };
                    drawClickedPoint(scope.clickedPoint);
                    if (updateInterval) {
                        $interval.cancel(updateInterval);
                    }
                    updateInterval = $interval(function () {
                        classifyPoint();
                    }, 100);
                    classifyPoint();

                    function classifyPoint() {
                        ApiService.classifyPoint(scope.clickedPoint).then(function (response) {
                            if (response.error) {
                                return alert('Error: ' + response.error);
                            }
                            scope.classifiedCluster = response.result.classIndex;
                        });
                    }
                });
            }
        }
    })
;