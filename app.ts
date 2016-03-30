import {SigmoidActivationFunction} from "./Neuro/ActivationFunctions/SigmoidActivationFunction";
import {Network} from "./Neuro/Network/Network";
import Timing from "./Utils/Timing";
import {TestDataProvider, IrisDataProvider} from "./Neuro/Data/DataProvider";
import {DataMixer} from "./Neuro/Data/DataMixer";
import {DataNormalizer} from "./Neuro/Data/DataNormalizer";

/*let activationFunction = new SigmoidActivationFunction();

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

console.log(zone.elapsed);*/

let provider = new TestDataProvider();
let [input, output] = [provider.getInput(), provider.getOutput()];

let mixer = new DataMixer();
[input, output] = mixer.mixAll(input, output);

let normalizer = new DataNormalizer();
input = normalizer.normalize(input);
console.log(input);