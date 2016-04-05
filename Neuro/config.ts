export const CLASSES_CONF = {
  classNumber: 5,
  classDimension: 2,
  classPointsNumber: 100,
  minDistanceBetween: 100,
  cross: false,
  minBoundary: 100,
  maxBoundary: 600
};

export const INPUT_DATA_CONF = {
  dataType: 0, //0 - generate, 1 - iris
  layersDeclarationEnabled: false,
  layers: [{
    neurons: 2
  }, {
    neurons: 2
  }, {
    neurons: 3
  }]
};

export const OUTPUT_DATA_CONF = {
  showClusters: true
};