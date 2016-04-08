import {IComputable} from "./IComputable";
import {Neuron} from "./Neuron";
import {IActivationFunction} from "../ActivationFunctions/IActivationFunction";

interface ILayer extends IComputable<number[], number[]> {
  
  neurons: Neuron[];
  length: number;
  neuronsInputsNumber: number;
  initialize(): void;
}

export interface ILayerDeclaration {

  neuronsNumber: number,
  neuronsInputsNumber: number,
  activationFunction: IActivationFunction
}

export class Layer implements ILayer {

  neurons: Neuron[] = [];
  lastOutput: number[];

  constructor(
    neuronsNumber: number,
    activationFunction: IActivationFunction,
    public neuronsInputsNumber: number
  ) {
    for (let i = 0; i < neuronsNumber; ++i) {
      this.neurons.push(new Neuron(neuronsInputsNumber, activationFunction));
    }
  }

  compute(vector: number[], pass: boolean = false) {
    return (this.lastOutput = this.neurons.map((neuron, neuronIndex) => {
      return neuron.compute(vector, pass, neuronIndex);
    }));
  }

  get length() {
    return this.neurons.length;
  }

  initialize() {
    this.neurons.forEach(neuron => neuron.initialize());
  }
}