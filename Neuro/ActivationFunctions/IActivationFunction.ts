export interface IActivationFunction {
  
  compute(x: number) : number;
  derivative(x: number) : number;
  derivativeFrom(x: number) : number;
}
