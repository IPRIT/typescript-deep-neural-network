import {INeuralLearningStrategy, LearningMethod} from "./Learning";
import {Network} from "../Network/Network";

export class BackPropagationLearning implements INeuralLearningStrategy {

  type: LearningMethod = LearningMethod.BackPropagation;

  constructor(public network: Network, public n: number) {

  }

  learn(input: number[][], output: number[][]) {
    
  }
}