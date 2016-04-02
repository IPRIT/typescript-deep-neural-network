import {SigmoidActivationFunction} from "./Neuro/ActivationFunctions/SigmoidActivationFunction";
import {Network} from "./Neuro/Network/Network";
import Timing from "./Utils/Timing";
import {TestDataProvider, IrisDataProvider, IDataProvider} from "./Neuro/Data/DataProvider";
import {DataMixer} from "./Neuro/Data/DataMixer";
import {DataNormalizer} from "./Neuro/Data/DataNormalizer";
import {BackPropagationLearning} from "./Neuro/NeuralLearning/BackPropagationLearning";
import {Learning} from "./Neuro/NeuralLearning/Learning";
import {showClusters} from "./frontend/app";

function learningTest(provider: IDataProvider) {
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
  network.initialize();

  let [input, output] = [provider.getInput(), provider.getOutput()];

  let normalizer = new DataNormalizer();
  input = normalizer.normalize(input);

  let mixer = new DataMixer();
  //[input, output] = mixer.mixAll(input, output);

  let learningMethod = new BackPropagationLearning(network, 0.1);
  let learning = new Learning(learningMethod);

  let itemsPart = 0.8;
  let learnInput = input.slice(0, Math.round(input.length * itemsPart));
  let learnOutput = output.slice(0, Math.round(output.length * itemsPart));

  itemsPart = 1 - itemsPart;
  let testInput = input.slice(Math.round(-input.length * itemsPart));
  let testOutput = output.slice(Math.round(-output.length * itemsPart));

  let interval = setInterval(() => {
    learning.learn(learnInput, learnOutput);

    let learnError = learning.getErrorOnTestData(learnInput, learnOutput);
    let learnCorrectlyNumber = learning.getCorrectlyNumber(learnInput, learnOutput);
    console.log(`Input: errors: ${learnError}; Accepted: ${learnCorrectlyNumber} of ${learnInput.length}`);


    let testError = learning.getErrorOnTestData(testInput, testOutput);
    let testCorrectlyNumber = learning.getCorrectlyNumber(testInput, testOutput);
    console.log(`Input: errors: ${testError}; Accepted: ${testCorrectlyNumber} of ${testInput.length}`);

    if (learnError < 40) {
      //console.log('Min err');
    }
    if (learnError < 5) {
      console.log('Learning has done.');
      clearInterval(interval);
    }
  }, 10);
}

let dataProvider = new IrisDataProvider();
dataProvider.initialize();

showClusters(dataProvider.data);
learningTest(dataProvider);