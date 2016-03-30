import ClassGenerator from '../Generator/ClassGenerator';
import * as Config from '../Generator/config';
import * as fs from 'fs';

interface IDataProvider {

  getInput(): Array<Array<number>>;
  getOutput(): Array<Array<number>>;
}

export class TestDataProvider implements IDataProvider {

  private classGenerator: ClassGenerator;
  private data: any;
  private isGenerated: boolean = false;

  getInput() {
    if (!this.isGenerated) {
      this.generate();
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
      this.generate();
    }
    let output = new Array(this.data.length);
    return this.data.map((cluster, clusterIndex) => {
      output[clusterIndex] = new Array(cluster.points.length);
      cluster.points.forEach((vector, vectorIndex) => {
        //TODO: continue
        output[clusterIndex][vectorIndex] = +(clusterIndex)
      })

    }).reduce((accumulator, currentSet) => {
      return accumulator.concat(currentSet);
    }, []);
  }

  get config() {
    return Config.CLASSES_CONF;
  }

  private generate() {
    this.classGenerator = new ClassGenerator();
    this.classGenerator.configure(Config.CLASSES_CONF);
    this.data = this.classGenerator.generate();
  }
}

export class IrisDataProvider implements IDataProvider {

  outputs: number[] = [];

  getInput() {
    let data = fs.readFileSync('./Neuro/Data/input/iris.txt', 'utf8');
    //todo: notice that line-breaking chars available only for Windows
    return data.split('\r\n').map(line => {
      let arr = line.trim().split(/\s/).map(numberAsString => +numberAsString);
      this.outputs.push(<number>+arr.slice(-1));
      return arr.slice(0, -1);
    });
  }

  getOutput() {
    let data = fs.readFileSync('./Neuro/Data/input/iris.txt', 'utf8');
    //todo: notice that line-breaking chars available only for Windows
    return data.split('\r\n').map(line => {
      let arr = line.trim().split(/\s/).map(numberAsString => +numberAsString);
      this.outputs.push(<number>+arr.slice(-1));
      return arr.slice(0, -1);
    });
  }
}