interface IMixerProvider<T> {

    mix(input: T, callback?: Function): T;
    mixAll(input: T, output: T): T[];
}

export class DataMixer implements IMixerProvider<number[][]> {

    static EPS: number = 1e-6;

    mix(input: number[][], cb?: Function) {
        let output: number[][] = [].concat(input); // get cloned array
        input.forEach((vector, outerIndex) => {
            let changed = false;
            while (!changed) {
                var [i, j] = [...<number[]>DataMixer.getRandomBetween(0, output.length - 1, 2)];
                changed = !this.isEqual(output[i], output[j]);
            }
            [output[i], output[j]] = [output[j], output[i]];
            if (cb) {
               cb(i, j);
            }
        });
        return output;
    }

    mixAll(input: number[][], output: number[][], repeat: number = 1) {
        while (repeat--) {
            input = this.mix(input, (i, j) => {
                [output[i], output[j]] = [output[j], output[i]];
            });
        }
        return [input, output];
    }

    private isEqual(vector1, vector2): boolean {
        return vector1.every((x, i) => Math.abs(x - vector2[i]) < DataMixer.EPS);
    }

    private static getRandomBetween(min: number, max: number, cnt?: number): number | Array<number> {
        let randomNumbers = [];
        for (let i = 0; i < Math.max(1, cnt || 1); ++i) {
            randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return cnt === 1 ?
            randomNumbers[0] : randomNumbers;
    }
}