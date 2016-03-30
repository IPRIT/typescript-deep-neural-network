import {Network} from "../Network/Network";

export enum LearningMethod {
  BackPropagation
}

export interface INeuralLearningStrategy {

  type: LearningMethod;
  learn(input: number[][], output: number[][]): void;
}

export class Learning {

  constructor(public methodInstance: INeuralLearningStrategy) {

  }
}