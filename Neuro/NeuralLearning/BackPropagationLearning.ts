import {INeuralLearningStrategy, LearningMethod} from "./Learning";
import {Network} from "../Network/Network";
import {Layer} from "../Network/Layer";
import {Neuron} from "../Network/Neuron";

export class BackPropagationLearning implements INeuralLearningStrategy {

  type: LearningMethod = LearningMethod.BackPropagation;
  private neuronErrors: number[][];
  private weightUpdates: number[][][];
  private boundUpdates: number[][];

  constructor(public network: Network, public n: number) {
    this.neuronErrors = this.getFilledArray(network.length, []);
    this.weightUpdates = this.getFilledArray(network.length, []);
    this.boundUpdates = this.getFilledArray(network.length, []);
    for (let i = 0; i < network.length; ++i) {
      this.neuronErrors[i] = this.getFilledArray(network.layers[i].length, 0);
      this.boundUpdates[i] = this.getFilledArray(network.layers[i].length, 0);
      this.weightUpdates[i] = this.getFilledArray(network.layers[i].length, []);
      for (let j = 0; j < network.layers[i].length; ++j) {
        this.weightUpdates[i][j] = this.getFilledArray(network.layers[i].neuronsInputsNumber, 0);
      }
    }
  }

  learn(input: number[][], output: number[][]) {
    if (input.length !== output.length) {
      throw new Error('Specified vectors havent equally lengths');
    }
    return input.reduce((accumulator, vector, vectorIndex) => {
      return accumulator + this.iterate(vector, output[vectorIndex]);
    }, 0);
  }

  private iterate(inputVector: number[], outputVector: number[]): number {
    let totalOutput = this.network.compute(inputVector);
    var error = this.computeIterationError(totalOutput, outputVector);
    this.computeUpdates(inputVector);
    this.updateNetwork();

    return error;
  }

  private computeIterationError(totalOutput: number[], wishedVector: number[]) {
    let layersNumber = this.network.length;
    let currentLayer = this.network.layers.slice(-1)[0];

    let totalError = totalOutput.reduce((error, output, outputIndex) => {
      let e = wishedVector[outputIndex] - output;
      this.neuronErrors[layersNumber - 1][outputIndex] = e *
        currentLayer.neurons[outputIndex].activationFunction.derivativeFrom(output);
      return error + e * e;
    }, 0);

    //todo: revert if no ideas
    let layersReversed = this.network.layers.concat().reverse();
    layersReversed.forEach((layer, layerIndex) => {
      if (!layerIndex) return;
      let prevLayer = layersReversed[layerIndex - 1];
      let currentLayerErrors = this.neuronErrors[layerIndex];
      let previousLayerErrors = this.neuronErrors[layerIndex - 1];
      layer.neurons.forEach((neuron, neuronOuterIndex) => {
        currentLayerErrors[neuronOuterIndex] = prevLayer.neurons.reduce((errorSum, neuron, neuronIndex) => {
          return errorSum + previousLayerErrors[neuronIndex] * neuron.weights[neuronOuterIndex];
        }, 0) * neuron.activationFunction.derivativeFrom(neuron.lastOutput);
      });
    });

    return totalError / 2;
  }

  private computeUpdates(inputVector: number[]) {
    let neuronWeightsUpdates: number[];
    this.network.layers.forEach((layer, layerIndex) => {
      let previousLayer: Layer;
      if (layerIndex) {
        previousLayer = this.network.layers[layerIndex - 1];
      }
      layer.neurons.forEach((neuron, neuronIndex) => {
        let learningError = this.n * this.neuronErrors[layerIndex][neuronIndex];
        (neuronWeightsUpdates = this.weightUpdates[layerIndex][neuronIndex]).map((weightUpdate, weightUpdateIndex) => {
          return learningError * (
            layerIndex > 0 ?
              previousLayer.neurons[weightUpdateIndex].lastOutput : inputVector[weightUpdateIndex]
          );
        });
        this.boundUpdates[layerIndex][neuronIndex] = learningError;
      })
    });
  }

  private updateNetwork() {
    this.network.layers.forEach((layer, layerIndex) => {
      layer.neurons.forEach((neuron, neuronIndex) => {
        neuron.weights.map((weight, weightIndex) => {
          return weight + this.weightUpdates[layerIndex][neuronIndex][weightIndex];
        });
        (<Neuron>neuron).lowerBound += this.boundUpdates[layerIndex][neuronIndex];
      })
    });
  }

  private getFilledArray(length: number, value: any): Array<any> {
    let destArray = [];
    for (let i = 0; i < length; ++i) {
      destArray.push(value);
    }
    return destArray;
  }
}