import {IComputable} from "./IComputable";
import {IActivationFunction} from "../ActivationFunctions/IActivationFunction";

interface INeuron extends IComputable<number[], number> {

  activationFunction: IActivationFunction;
  weights: number[];
  inputsNumber: number;
}

export class Neuron implements INeuron {

  weights: number[] = [];
  threshold: number;
  lastOutput: number;

  constructor(public inputsNumber: number, public activationFunction: IActivationFunction) {
    //this.initialize();
  }

  compute(vector: number[]) {
    if (vector.length !== this.weights.length) {
      throw new RangeError('Specified lengths does not equal');
    }
    let e = vector.reduce((sum, x, currentIndex) => {
      return sum + x * this.weights[currentIndex];
    }, 0) + this.threshold;

    return (this.lastOutput = this.activationFunction.compute(e));
  }

  initialize() {
    var seedrandom = require('seedrandom');
    seedrandom('neuro', { global: true });
    for (let i = 0; i < this.inputsNumber; ++i) {
      this.weights.push(Math.random());
    }
    this.threshold = Math.random();
  }
}