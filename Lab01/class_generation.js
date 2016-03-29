'use strict';

let Point = require('./Point');

const _classesNumber = 10;
const _rank = 10;
const _pointsNumber = 5;
const _minDistanceBetween = 100;

/**
 * @param {boolean} crossNeeded
 * @param {number} classesNumber
 * @param {number} rank
 * @param {number} pointsNumber
 * @param {number} minDistanceBetween
 * @returns {Array} Array of classes
 */
function generate(crossNeeded, classesNumber, rank, pointsNumber, minDistanceBetween) {
    classesNumber = classesNumber || _classesNumber;
    rank = rank || _rank;
    pointsNumber = pointsNumber || _pointsNumber;
    minDistanceBetween = minDistanceBetween || _minDistanceBetween;

    let cores = [];
    let classes = [];

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
        if (crossNeeded) {
            let prob = Point.randomNumber(0, 1);
            if (prob) {
                currentClass.radius *= 2;
            }
        }
        for (let i = 0; i < pointsNumber; ++i) {
            currentClass.points.push( Point.generateInArea(center, currentClass.radius) );
        }
        classes.push(currentClass);
    });

    return classes;
}

module.exports = {
    generate
};