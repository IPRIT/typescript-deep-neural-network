import {SigmoidActivationFunction} from "./Neuro/ActivationFunctions/SigmoidActivationFunction";
import {Network} from "./Neuro/Network/Network";
import Timing from "./Utils/Timing";
import {TestDataProvider} from "./Neuro/Data/DataProvider";

let activationFunction = new SigmoidActivationFunction();

let timing = new Timing();
let zone = timing.zone(timing.proxy(() => {
  let network = new Network([{
    neuronsInputsNumber: 4,
    neuronsNumber: 4,
    activationFunction
  }, {
    neuronsInputsNumber: 4,
    neuronsNumber: 4,
    activationFunction
  }, {
    neuronsInputsNumber: 4,
    neuronsNumber: 3,
    activationFunction
  }]);
  console.log(network.compute([1,-2,4,2]));
}));

console.log(zone.elapsed);

let provider = new TestDataProvider();
console.log(provider.getInput(), provider.getOutput());
