'use strict';

let Point = require('./Point');

const _classNumber = 3;
const _classDimension = 2;
const _classPointsNumber = 50;
const _minDistanceBetween = 100;
const _minBoundary = -1000;
const _maxBoundary = 1000;

/**
 * @param {boolean} cross
 * @param {number} classNumber
 * @param {number} classDimension
 * @param {number} classPointsNumber
 * @param {number} minDistanceBetween
 * @param {number} minBoundary
 * @param {number} maxBoundary
 * @returns {Array} Array of classes
 */
function generate(cross, classNumber, classDimension, classPointsNumber, minDistanceBetween, minBoundary, maxBoundary) {
    classNumber = classNumber || _classNumber;
    classDimension = classDimension || _classDimension;
    classPointsNumber = classPointsNumber || _classPointsNumber;
    minDistanceBetween = minDistanceBetween || _minDistanceBetween;
    minBoundary = minBoundary || _minBoundary;
    maxBoundary = maxBoundary || _maxBoundary;

    let cores = [];
    let classes = [];

    while (cores.length < classNumber) {
        let generatedPoint = Point.generatePoint(classDimension, minBoundary, maxBoundary);
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
            radius: minDistanceBetween / 2.2
        };
        if (cross) {
            let prob = Point.randomNumber(0, 1);
            if (prob) {
                currentClass.radius *= 2;
            }
        }
        for (let i = 0; i < classPointsNumber; ++i) {
            currentClass.points.push( Point.generateInArea(center, currentClass.radius) );
        }
        classes.push(currentClass);
    });

    return classes;
}

module.exports = {
    generate
};
