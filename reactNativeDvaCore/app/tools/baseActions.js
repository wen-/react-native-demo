export default class BaseActions {
  parent = {};

  constructor(parent) {
    this.parent = parent;
    this.mounteProperties(Object.getPrototypeOf(this));
  }

  mounteProperties(properties) {
    Object.getOwnPropertyNames(properties).forEach((key) => {
      if (key === 'constructor') { return; }
      Object.defineProperty(this.parent, key, { value: this[key] });
    });
  }
}