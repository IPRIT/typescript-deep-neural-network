'use strict';

let Point = require('./Point');

const classesNumber = 10;
const rank = 10;
const pointsNumber = 100;
const minDistanceBetween = 1000;

let cores = [];
let classes = [];

while (cores.length < classesNumber) {
    let generatedPoint = Point.generatePoint(rank);
    if (cores.length) {
        var minDistance = Math.min( ...generatedPoint.distanceToAll(cores) );
        if (minDistance > minDistanceBetween) {
            cores.push(generatedPoint);
        }
    } else {
        cores.push(generatedPoint);
    }
}

cores.forEach(center => {
    var currentClass = {
        center,
        points: [],
        radius: minDistanceBetween / 2
    };
    for (let i = 0; i < pointsNumber; ++i) {
        currentClass.points.push( Point.generateInArea(center, currentClass.radius) );
    }
    classes.push(currentClass);
    //console.log(center, currentClass.points, Math.min(...center.distanceToAll(currentClass.points)));
});
