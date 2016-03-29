import * as IActivationFunction from './IActivationFunction';

class SigmoidActivationFunction implements IActivationFunction {

  compute(x) {
    return 1 / (1 + Math.exp(-x));
  }

  derivative(x) {
    return (1 - this.compute(x)) * this.compute(x);
  }

  derivativeFrom(x) {
    return (1 - x) * x;
  }
}