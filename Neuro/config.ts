export const CLASSES_CONF = {
  classNumber: 15,
  classDimension: 2,
  classPointsNumber: 100,
  minDistanceBetween: 100,
  radiusCompress: 2, // >= 2
  cross: false,
  minBoundary: 150,
  maxBoundary: 600
};

export const INPUT_DATA_CONF = {
  dataType: 1, //0 - generate, 1 - Iris flower data set
  layersDeclarationEnabled: true,
  layers: [{
    neurons: 4
  }, {
    neurons: 4
  }, {
    neurons: 3
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
  stopWhen: 1,
  timeoutBetweenEpochs: 0 //ms
};

export const OUTPUT_DATA_CONF = {
  showClusters: true,
  consoleOutput: true
};