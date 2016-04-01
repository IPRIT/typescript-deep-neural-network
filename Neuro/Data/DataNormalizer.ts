interface INormalizable {

    normalize(input: number[][], intervalFrom?: number, intervalTo?: number): number[][];
}

export class DataNormalizer implements INormalizable {

    normalize(input: number[][], from: number = 0, to: number = 1) {
        if (from >= to) {
            throw new Error('Invalid normalizing interval');
        }
        let [minValues, maxValues] = [[], []];
        for (let i = 0; i < input[0].length; ++i) {
            minValues.push(Number.MAX_VALUE);
            maxValues.push(Number.MIN_VALUE);
        }
        input.forEach((vector, vectorIndex) => {
            vector.forEach((x, i) => {
                minValues[i] = Math.min(x, minValues[i]);
                maxValues[i] = Math.max(x, maxValues[i]);
            })
        });

        return <number[][]>input.map((vector, vectorIndex) => {
            return vector.map((scalar, scalarIndex) => {
                return (((scalar - minValues[scalarIndex]) * (to - from))
                  / (maxValues[scalarIndex] - minValues[scalarIndex])) + from;
            });
        });
    }
}