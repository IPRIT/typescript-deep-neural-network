import ClassGenerator from '../Generator/ClassGenerator';
import * as Config from '../config';
//noinspection TypeScriptCheckImport
import * as fs from 'fs';

export interface IDataProvider {

  getInput(): Array<Array<number>>;
  getOutput(): Array<Array<number>>;
  initialize(): void;
  data: any;
}

export enum DataType {
  GENERATE,
  IRIS
}

export class TestDataProvider implements IDataProvider {

  private classGenerator: ClassGenerator;
  public data: any;
  private isGenerated: boolean = false;

  getInput() {
    if (!this.isGenerated) {
      this.initialize();
    }
    return this.data.map(cluster => {
      return cluster.points.map(vector => {
        return vector.coords;
      });
    }).reduce((accumulator, currentSet) => {
      return accumulator.concat(currentSet);
    }, []);
  }

  getOutput() {
    if (!this.isGenerated) {
      this.initialize();
    }
    return this.data.map((cluster, clusterIndex) => {
      let clusterOutput = []; //вектора кластера
      cluster.points.forEach((vector, vectorIndex) => {
        clusterOutput[vectorIndex] = Array
            .apply(null, Array(this.data.length))
            .map(Number.prototype.valueOf, 0)
            .map((scalar, scalarIndex) => {
              return +(scalarIndex === clusterIndex);
            });
      });
      return clusterOutput;
    }).reduce((accumulator, currentSet) => {
      return accumulator.concat(currentSet);
    }, []);
  }

  get config() {
    return Config.CLASSES_CONF;
  }

  initialize() {
    this.isGenerated = true;
    this.classGenerator = new ClassGenerator();
    this.classGenerator.configure(Config.CLASSES_CONF);
    this.data = this.classGenerator.generate();
  }
}

export class IrisDataProvider implements IDataProvider {

  outputs: number[] = [];
  public data: any;
  private isInit: boolean = false;
  private classes: number = 3;

  getInput() {
    if (!this.isInit) {
      this.initialize();
    }
    return <number[][]>this.data.map(vector => {
      return vector.slice(0, -1);
    });
  }

  getOutput() {
    if (!this.isInit) {
      this.initialize();
    }
    return <number[][]>this.data.map(vector => {
      let classNumber = vector.slice(-1)[0];
      return Array
          .apply(null, Array(this.classes))
          .map(Number.prototype.valueOf, 0)
          .map((x, i) => {
            return +(i === classNumber);
          });
    });
  }

  initialize() {
    this.isInit = true;
    //noinspection TypeScriptUnresolvedFunction
    let data = fs.readFileSync('./Neuro/Data/input/iris.txt', 'utf8');
    //noinspection TypeScriptUnresolvedVariable
    let isWin = /^win/.test(process.platform);
    //todo(me): fix when a file will be correctly line-break.
    let splitChars = isWin && false ? '\n' : '\n';
    this.data = data.split(splitChars).map(line => {
      return line.trim().split(/\s/).map(parseFloat);
    });
  }
}