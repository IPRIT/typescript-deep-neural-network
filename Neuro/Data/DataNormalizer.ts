interface INormalizable {

    normalize(input: number[][], intervalFrom?: number, intervalTo?: number): number[][];
}

export class DataNormalizer implements INormalizable {

    normalize(input, from = 0, to = 1) {
        if (from >= to) {
            throw new Error('Invalid normalizing interval');
        }
        return <number[][]>input.map(vector => {
            let [max, min] = [Math.max(...vector), Math.min(...vector)];
            return vector.map(scalar => {
                return (((scalar - min) * (to - from)) / (max - min)) + from;
            });
        });
    }
}