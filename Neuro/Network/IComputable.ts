export interface IComputable<T, K> {

  compute(x: T): K;
}