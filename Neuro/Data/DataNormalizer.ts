interface INormalizable {

    normalize(input: number[][], intervalFrom?: number, intervalTo?: number): number[][];
}

export class DataNormalizer implements INormalizable {

    minValues: number[];
    maxValues: number[];

    normalize(input: number[][], from: number = 0, to: number = 1) {
        if (from >= to) {
            throw new Error('Invalid normalizing interval');
        }
        [this.minValues, this.maxValues] = [[], []];
        for (let i = 0; i < input[0].length; ++i) {
            this.minValues.push(Number.MAX_VALUE);
            this.maxValues.push(Number.MIN_VALUE);
        }
        input.forEach((vector, vectorIndex) => {
            vector.forEach((x, i) => {
                this.minValues[i] = Math.min(x, this.minValues[i]);
                this.maxValues[i] = Math.max(x, this.maxValues[i]);
            })
        });

        return <number[][]>input.map((vector, vectorIndex) => {
            return vector.map((scalar, scalarIndex) => {
                return (((scalar - this.minValues[scalarIndex]) * (to - from))
                  / (this.maxValues[scalarIndex] - this.minValues[scalarIndex])) + from;
            });
        });
    }

    normalizeNext(input: number[][], from: number = 0, to: number = 1) {
        if (from >= to) {
            throw new Error('Invalid normalizing interval');
        }
        if (!this.maxValues.length || !this.minValues.length) {
            throw new Error('Invalid normalizing minmax values');
        }
        return <number[][]>input.map((vector, vectorIndex) => {
            return vector.map((scalar, scalarIndex) => {
                return (((scalar - this.minValues[scalarIndex]) * (to - from))
                  / (this.maxValues[scalarIndex] - this.minValues[scalarIndex])) + from;
            });
        });
    }
}