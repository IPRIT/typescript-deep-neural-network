'use strict';

class Point {

    constructor(rank, coords) {
        this.rank = rank || Point.defaultRank();
        this.coords = coords || [];
    }

    static generatePoint(rank) {
        rank = rank || Point.defaultRank();
        let coords = [ ...Point.randomCoordGenerator( -10000, 10000, rank )() ];
        return new Point( rank, coords );
    }

    static randomCoordGenerator(min, max, count) {
        count = count || Number.MAX_VALUE;
        min = min || Number.MIN_VALUE;
        max = max || Number.MAX_VALUE;
        let currentIt = 0;
        return function* () {
            while (currentIt++ < count) {
                yield Math.floor(Math.random() * (max - min + 1)) + min;
            }
        };
    }

    static randomCoordGeneratorInArea(minOffsets, maxOffsets, count) {
        minOffsets = minOffsets || [];
        maxOffsets = maxOffsets || [];
        count = minOffsets.length;
        if (minOffsets.length !== count
            || maxOffsets.length !== count) {
            throw new RangeError('Offsets length should be equally with theirs dimensions');
        }
        let currentIt = 0;
        return function* () {
            while (currentIt++ < count) {
                yield Math.floor(
                    Math.random() * (maxOffsets[ currentIt - 1 ] - minOffsets[ currentIt - 1 ] + 1)
                ) + minOffsets[ currentIt - 1 ];
            }
        };
    }

    static defaultRank() {
        return 5;
    }

    static distance(ptA, ptB) {
        if (!(ptA instanceof Point && ptB instanceof Point)) {
            throw new TypeError('Points should have correspondingly the point type');
        } else if (ptA.rank !== ptB.rank) {
            throw new RangeError('Dimensions are not equally');
        }
        return Math.sqrt(
            ptA.coords.reduce((accumulateNumber, element, index) => {
                return accumulateNumber
                    + (element - ptB.coords[ index ]) * (element - ptB.coords[ index ]);
            }, 0)
        );
    }

    distance(pt) {
        return Point.distance(this, pt);
    }

    distanceToAll(pts) {
        return pts.map(pt => this.distance(pt));
    }

    static generateInArea(centerPoint, radius) {
        let loopRestrictor = 1e6, loop = 0;
        while (true) {
            let generator = Point.randomCoordGeneratorInArea(
                centerPoint.coords.map(x => x - radius),
                centerPoint.coords.map(x => x + radius)
            );
            let generatedPoint = new Point( centerPoint.rank, [ ...generator() ] );
            if (generatedPoint.distance(centerPoint) < radius) {
                return generatedPoint;
            }
            if (loop++ > loopRestrictor) {
                throw new Error('Loop size has exceeded');
            }
        }
    }
}

module.exports = Point;