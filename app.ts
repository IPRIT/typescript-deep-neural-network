import {SigmoidActivationFunction} from "./Neuro/ActivationFunctions/SigmoidActivationFunction";
import {Network} from "./Neuro/Network/Network";
import Timing from "./Utils/Timing";
import {TestDataProvider, IrisDataProvider} from "./Neuro/Data/DataProvider";
import {DataMixer} from "./Neuro/Data/DataMixer";
import {DataNormalizer} from "./Neuro/Data/DataNormalizer";
import {BackPropagationLearning} from "./Neuro/NeuralLearning/BackPropagationLearning";
import {Learning} from "./Neuro/NeuralLearning/Learning";

let activationFunction = new SigmoidActivationFunction();

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

let provider = new TestDataProvider();
let [input, output] = [provider.getInput(), provider.getOutput()];

let mixer = new DataMixer();
[input, output] = mixer.mixAll(input, output);

let normalizer = new DataNormalizer();
input = normalizer.normalize(input);

let learningMethod = new BackPropagationLearning(network, 0.1);
let learning = new Learning(learningMethod);

for (;;) {
  let itemsPart = 0.8;
  learning.learn(input.slice(0, input.length * itemsPart), output.slice(0, input.length * itemsPart));

  let learnErrors = learning.getErrorOnTestData(input.slice(0, input.length * itemsPart), output.slice(0, input.length * itemsPart));
  let learnCorrectlyNumber = learning.getCorrectlyNumber(input.slice(0, input.length * itemsPart), output.slice(0, input.length * itemsPart));
  console.log(`Input: errors: ${learnErrors}; Accepted: ${learnCorrectlyNumber} of ${input.length * itemsPart}`);

  itemsPart = 1 - itemsPart;
  let testErrors = learning.getErrorOnTestData(input.slice(-input.length * itemsPart), output.slice(-input.length * itemsPart));
  let testCorrectlyNumber = learning.getCorrectlyNumber(input.slice(-input.length * itemsPart), output.slice(-input.length * itemsPart));
  console.log(`Input: errors: ${testErrors}; Accepted: ${testCorrectlyNumber} of ${input.length * itemsPart}`);

  if (learnErrors < 4) {
    break;
  }
}