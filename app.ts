import * as ClassGenerator from './Neuro/ClassGenerator';
import * as SigmoidActivationFunction from './Neuro/ActivationFunctions/SigmoidActivationFunction';

interface INeuron {
  face: string;
}
let func = new SigmoidActivationFunction();

console.log('Works', func.compute(1));