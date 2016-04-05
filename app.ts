import {SigmoidActivationFunction} from "./Neuro/ActivationFunctions/SigmoidActivationFunction";
import {Network} from "./Neuro/Network/Network";
import Timing from "./Utils/Timing";
import {TestDataProvider, IrisDataProvider, IDataProvider, DataType} from "./Neuro/Data/DataProvider";
import {DataMixer} from "./Neuro/Data/DataMixer";
import {DataNormalizer} from "./Neuro/Data/DataNormalizer";
import {BackPropagationLearning} from "./Neuro/NeuralLearning/BackPropagationLearning";
import {Learning} from "./Neuro/NeuralLearning/Learning";
import {showClusters} from "./frontend/app";
import * as Config from './Neuro/config';
import {ILayerDeclaration} from "./Neuro/Network/Layer";

function learningTest(provider: IDataProvider) {
  let activationFunction = new SigmoidActivationFunction();
  let network: Network;

  let [inputConfig, classesConfig] = [Config.INPUT_DATA_CONF, Config.CLASSES_CONF];

  function getLayersDeclaration() : ILayerDeclaration[] {
    let layersDeclaration: ILayerDeclaration[] = [];
    let defaultNeuronsNumber: number = 3;

    if (inputConfig.layersDeclarationEnabled
        && inputConfig.layers
        && inputConfig.layers.length) {
      let lastInputsNumber = classesConfig.classDimension;
      layersDeclaration = inputConfig.layers.map((declaration, declarationIndex) => {
        let newDeclaration = {
          neuronsInputsNumber: lastInputsNumber,
          neuronsNumber: declaration.neurons,
          activationFunction
        };
        lastInputsNumber = declaration.neurons;
        return newDeclaration;
      });
    } else if (inputConfig.dataType === DataType.IRIS) {
      let lastInputsNumber = 4;
      for (let i = 0; i < 3; ++i) {
        layersDeclaration.push({
          neuronsInputsNumber: lastInputsNumber,
          neuronsNumber: i === defaultNeuronsNumber - 1 ? 3 : 4,
          activationFunction
        });
      }
    } else {
      let lastInputsNumber = classesConfig.classDimension;
      for (let i = 0; i < defaultNeuronsNumber; ++i) {
        layersDeclaration.push({
          neuronsInputsNumber: lastInputsNumber,
          neuronsNumber: i === defaultNeuronsNumber - 1 ? classesConfig.classNumber : classesConfig.classDimension,
          activationFunction
        });
        lastInputsNumber = classesConfig.classDimension;
      }
    }
    return layersDeclaration;
  }

  network = new Network(getLayersDeclaration());
  network.initialize();

  let [input, output] = [provider.getInput(), provider.getOutput()];

  let normalizer = new DataNormalizer();
  input = normalizer.normalize(input);

  let mixer = new DataMixer();
  [input, output] = mixer.mixAll(input, output, 10);

  let learningMethod = new BackPropagationLearning(network, 0.1);
  let learning = new Learning(learningMethod);

  let itemsPart = 0.8;
  let learnInput = input.slice(0, Math.round(input.length * itemsPart));
  let learnOutput = output.slice(0, Math.round(output.length * itemsPart));

  itemsPart = 1 - itemsPart;
  let testInput = input.slice(Math.round(-input.length * itemsPart) + 1);
  let testOutput = output.slice(Math.round(-output.length * itemsPart) + 1);

  let interval = setInterval(() => {
    learning.learn(learnInput, learnOutput);

    let learnError = learning.getErrorOnTestData(learnInput, learnOutput);
    let learnCorrectlyNumber = learning.getCorrectlyNumber(learnInput, learnOutput);
    console.log(`Learning error: ${learnError}; Accepted: ${learnCorrectlyNumber} of ${learnInput.length}`);


    let testError = learning.getErrorOnTestData(testInput, testOutput);
    let testCorrectlyNumber = learning.getCorrectlyNumber(testInput, testOutput);
    console.log(`Test data error: ${testError}; Accepted: ${testCorrectlyNumber} of ${testInput.length}`);

    if (learnError < 5) {
      console.log('Learning is done.');
      clearInterval(interval);
    }
  }, 0);
}

let [inputConfig, outputConfig] = [Config.INPUT_DATA_CONF, Config.OUTPUT_DATA_CONF];
let dataProvider: IDataProvider;

switch (inputConfig.dataType) {
  case DataType.GENERATE:
    dataProvider = new TestDataProvider();
    break;
  case DataType.IRIS:
    dataProvider = new IrisDataProvider();
    break;
  default:
    dataProvider = new TestDataProvider();
}
dataProvider.initialize();

if (outputConfig.showClusters) {
  showClusters(dataProvider.data);
}
learningTest(dataProvider);