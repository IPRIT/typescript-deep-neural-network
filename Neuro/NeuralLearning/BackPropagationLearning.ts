import {INeuralLearningStrategy, LearningMethod} from "./Learning";
import {Network} from "../Network/Network";

export class BackPropagationLearning implements INeuralLearningStrategy {

  type: LearningMethod = LearningMethod.BackPropagation;
  private neuronErrors: number[][] = [[]];
  private weightUpdates: number[][][] = [[[]]];
  private boundUpdates: number[][] = [[]];

  constructor(public network: Network, public n: number) {
    
    for (let i = 0; i < network.length; ++i) {
      for (let j = 0; j < network.layers[i].length; ++j) {

      }
    }
  }

  learn(input: number[][], output: number[][]) {
    
  }

  private getFilledArray(length: number, value: any) {
    return Array
        .apply(null, Array(length))
        .map(Number.prototype.valueOf, value);
  }
}