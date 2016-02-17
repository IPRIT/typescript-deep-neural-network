'use strict';

let Point = require('./Point');

const classesNumber = 10;
const rank = 10;
const pointsNumber = 5;
const minDistanceBetween = 100;

let cores = [];
let classes = [];
let IS_FIRST_TASK = process.argv.indexOf('first') >= 0;

while (cores.length < classesNumber) {
    let generatedPoint = Point.generatePoint(rank);
    if (cores.length) {
        let minDistance = Math.min( ...generatedPoint.distanceToAll(cores) );
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
    if (!IS_FIRST_TASK) {
        let prob = Point.randomNumber(0, 1);
        if (prob) {
            currentClass.radius *= 2;
        }
    }
    for (let i = 0; i < pointsNumber; ++i) {
        currentClass.points.push( Point.generateInArea(center, currentClass.radius) );
    }
    classes.push(currentClass);
    console.log('-'.repeat(5), 'Class:', classes.length, '-'.repeat(5));
    console.log(center, currentClass.points, Math.max(...center.distanceToAll(currentClass.points)));
});
