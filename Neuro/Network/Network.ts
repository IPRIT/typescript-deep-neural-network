import {IComputable} from "./IComputable";
import {Layer, ILayerDeclaration} from "./Layer";

interface INetwork extends IComputable<number[], number[]> {

  layers: Layer[];
  length: number;
  lastOutput: number[];
  initialize(): void;
}

export class Network implements INetwork {

  layers: Layer[];
  lastOutput: number[];

  constructor(layerDeclarations: ILayerDeclaration[]) {
    this.layers = new Array(layerDeclarations.length);
    for (let i = 0; i < this.length; ++i) {
      let layerDeclaration = layerDeclarations[i];
      this.layers[i] = new Layer(
        layerDeclaration.neuronsNumber,
        layerDeclaration.activationFunction,
        layerDeclaration.neuronsInputsNumber
      );
    }
  }

  compute(vector: number[]) {
    return (
      this.lastOutput = this.layers.reduce((previousVector, layer, layerIndex) => {
        return layer.compute(previousVector);
      }, vector)
    );
  }

  get length() {
    return this.layers.length;
  }

  initialize() {
    this.layers.forEach(layer => layer.initialize());
  }
}