export class CircularArray<T> extends Array<T> {
  constructor(...args: any[]) {
    super(...args);
  }

  public next(current: T) {
    return this[(this.indexOf(current) + 1) % this.length];
  }

  public prev(current: T) {
    return this[(this.indexOf(current) - 1) % this.length];
  }
}
