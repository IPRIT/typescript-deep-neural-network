import {SigmoidActivationFunction} from "./Neuro/ActivationFunctions/SigmoidActivationFunction";
import {Network} from "./Neuro/Network/Network";
import Timing from "./Utils/Timing";
import {TestDataProvider, IrisDataProvider} from "./Neuro/Data/DataProvider";
import {DataMixer} from "./Neuro/Data/DataMixer";
import {DataNormalizer} from "./Neuro/Data/DataNormalizer";
import {BackPropagationLearning} from "./Neuro/NeuralLearning/BackPropagationLearning";
import {Learning} from "./Neuro/NeuralLearning/Learning";

let activationFunction = new SigmoidActivationFunction();

/*
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
*/

let network = new Network([{
  neuronsInputsNumber: 2,
  neuronsNumber: 2,
  activationFunction
}, {
  neuronsInputsNumber: 2,
  neuronsNumber: 2,
  activationFunction
}]);

network.initialize();


let provider = new TestDataProvider();
let [input, output] = [provider.getInput(), provider.getOutput()];

let mixer = new DataMixer();
[input, output] = mixer.mixAll(input, output);

let normalizer = new DataNormalizer();
input = normalizer.normalize(input);

let learningMethod = new BackPropagationLearning(network, 0.2);
let learning = new Learning(learningMethod);

let itemsPart = 0.8;
let learnInput = input.slice(0, Math.round(input.length * itemsPart));
let learnOutput = output.slice(0, Math.round(output.length * itemsPart));

itemsPart = 1 - itemsPart;
let testInput = input.slice(Math.round(-input.length * itemsPart));
let testOutput = output.slice(Math.round(-output.length * itemsPart));

let learnInterval = setInterval(() => {
  learning.learn(learnInput, learnOutput);

  let learnErrors = learning.getErrorOnTestData(learnInput, learnOutput);
  let learnCorrectlyNumber = learning.getCorrectlyNumber(learnInput, learnOutput);
  console.log(`Input: errors: ${learnErrors}; Accepted: ${learnCorrectlyNumber} of ${learnInput.length}`);


  let testErrors = learning.getErrorOnTestData(testInput, testOutput);
  let testCorrectlyNumber = learning.getCorrectlyNumber(testInput, testOutput);
  console.log(`Input: errors: ${testErrors}; Accepted: ${testCorrectlyNumber} of ${testInput.length}`);

  if (learnErrors < 4) {
    console.log('Done!');
    clearInterval(learnInterval);
  }
}, 1000);