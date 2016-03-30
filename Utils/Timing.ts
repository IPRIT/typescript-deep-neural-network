interface IProxyTiming {

  proxy(_: Function): IProxyObject;
  zone(_: IProxyObject | Function): IProxyTiming;
  elapsed: number
}

interface IProxyObject {
  _proxyFunction: Function;
}

export default class Timing implements IProxyTiming {

  private start: Date;
  proxy(_proxyFunction: Function) {
    return {
      _proxyFunction
    }
  }

  zone(potentiallyCallableFunction: IProxyObject | Function) {
    this.start = new Date();
    if (typeof potentiallyCallableFunction === 'function') {
      (<Function>potentiallyCallableFunction)();
    } else {
      (<IProxyObject>potentiallyCallableFunction)._proxyFunction();
    }
    return this;
  }

  get elapsed() {
    if (this.start) {
      return new Date().getTime() - this.start.getTime();
    }
    return new Date().getTime();
  }
}