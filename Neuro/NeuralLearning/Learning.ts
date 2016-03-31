import {Network} from "../Network/Network";

export enum LearningMethod {
  BackPropagation
}

export interface INeuralLearningStrategy {

  type: LearningMethod;
  learn(input: number[][], output: number[][]): number;
  network: Network
}

export class Learning {

  trustyThreshold: number = 0.7;

  constructor(public methodInstance: INeuralLearningStrategy) {}

  learn(input: number[][], output: number[][]): number {
    return this.methodInstance.learn(input, output);
  }

  getErrorOnTestData(input: number[][], wishedOutput: number[][]) {
    return input.reduce((error, vector, vectorIndex) => {
      return error + this.getErrorOnSingleInput(vector, wishedOutput[vectorIndex]);
    }, 0);
  }

  getErrorOnSingleInput(input: number[], wishedOutput: number[]) {
    let network = this.methodInstance.network;
    let output = network.compute(input);
    return output.reduce((error, outputScalar, outputScalarIndex) => {
      let e = outputScalar - wishedOutput[outputScalarIndex];
      return error + e * e;
    }, 0) / 2;
  }

  getCorrectlyNumber(input: number[][], wishedOutput: number[][]) {
    let network = this.methodInstance.network;
    return input.filter((vector, vectorIndex) => {
      let output = network.compute(vector);
      let maxOutputScalar = Math.max(...output),
        maxOutputScalarIndex = output.indexOf(maxOutputScalar);

      //console.log('Real:', maxOutputScalarIndex, maxOutputScalar);

      let wishedMaxIndex = wishedOutput[vectorIndex].indexOf(Math.max(...wishedOutput[vectorIndex]));

      //console.log('Wished:', wishedMaxIndex);

      if (maxOutputScalarIndex === wishedMaxIndex && maxOutputScalar > this.trustyThreshold) {
        return output.every((outputScalar, outputScalarIndex) => {
          return outputScalarIndex === maxOutputScalarIndex || outputScalar <= maxOutputScalar / 2;
        });
      }
      return false;
    }).length;
  }
}