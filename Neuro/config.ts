export const CLASSES_CONF = {
  classNumber: 5,
  classDimension: 2,
  classPointsNumber: 10,
  minDistanceBetween: 100,
  radiusCompress: 2, // >= 2
  cross: true,
  minBoundary: 150,
  maxBoundary: 750
};

export const INPUT_DATA_CONF = {
  dataType: 0, //0 - generate, 1 - Iris flower data set
  layersDeclarationEnabled: false,
  layers: [{
    neurons: 2
  }, {
    neurons: 2
  }, {
    neurons: 5
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