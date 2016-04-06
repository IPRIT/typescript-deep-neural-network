export const CLASSES_CONF = {
  classNumber: 10,
  classDimension: 2,
  classPointsNumber: 100,
  minDistanceBetween: 100,
  radiusCompress: 2, // >= 2
  cross: false,
  minBoundary: 150,
  maxBoundary: 750
};

export const INPUT_DATA_CONF = {
  dataType: 0, //0 - generate, 1 - Iris flower data set
  layersDeclarationEnabled: true,
  layers: [{
    neurons: 2
  }, {
    neurons: 15
  }, {
    neurons: 10
  }]
};

export const LEARNING_CONF = {
  velocity: 0.5,
  velocityChange: {
    enabled: true,
    eachEpochNumber: 10,
    diff: -0.01,
    stopWhen: 0.1
  },
  stopWhen: 5,
  timeoutBetweenEpochs: 0 //ms
};

export const OUTPUT_DATA_CONF = {
  showClusters: true,
  consoleOutput: true
};