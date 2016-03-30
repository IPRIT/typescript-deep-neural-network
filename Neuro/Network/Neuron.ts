import {IComputable} from "./IComputable";
import {IActivationFunction} from "../ActivationFunctions/IActivationFunction";

interface INeuron extends IComputable<number[], number> {

  activationFunction: IActivationFunction;
  weights: number[];
  inputsNumber: number;
}

export class Neuron implements INeuron {

  weights: number[] = [];
  lowerBound: number;

  constructor(public inputsNumber: number, public activationFunction: IActivationFunction) {
    this.weights = new Array(inputsNumber);
    this.initialize();
  }

  compute(vector: number[]) {
    if (vector.length !== this.weights.length) {
      throw new RangeError('Specified lengths does not equal');
    }
    let e = vector.reduce((sum, x, currentIndex) => {
      return sum + x * this.weights[currentIndex];
    }, 0);

    return this.activationFunction.compute(e + this.lowerBound);
  }

  initialize() {
    for (let i = 0; i < this.inputsNumber; ++i) {
      this.weights[i] = Math.random();
    }
    this.lowerBound = Math.random();
  }
}