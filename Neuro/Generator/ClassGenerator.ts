interface IGenerable {
  generate(...params): any;
}

interface IConfigurable {
  configure(config: IGeneratorConfig): void;
}

interface IGeneratorConfig {
  classNumber?: number;
  classDimension?: number;
  classPointsNumber?: number;
  minDistanceBetween?: number;
  cross?: boolean;
  minBoundary?: number;
  maxBoundary?: number;
}

export default class ClassGenerator implements IGenerable, IConfigurable {

  configured : boolean = false;
  config : IGeneratorConfig = null;

  generate(...args) {
    let class_generation = require('../../Lab01/class_generation');
    if (this.configured) {
      let params = this.config;
      return class_generation.generate(
        params.cross, params.classNumber, params.classDimension,
        params.classPointsNumber, params.minDistanceBetween,
        params.minBoundary, params.maxBoundary
      );
    }
    return class_generation.generate(...args);
  }

  configure(config: IGeneratorConfig) {
    if (config) {
      this.config = config;
      this.configured = true;
    }
  }
}
