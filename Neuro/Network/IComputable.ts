export interface IComputable<T, K> {

  compute(x: T, pass?, index?): K;
}