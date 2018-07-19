/**
 * @class 装饰器模式
 * @description 动态的将责任附加到对象上。若要扩展功能，装饰者提供了比继承更有弹性的替代方案
 */

export abstract class Beverage {
   description:string = 'Beverage';

   getDescription():string {
    return this.description;
   }

   abstract cost():number
}

abstract class CondimentDecorator extends Beverage {
  abstract getDescription():string;
}

export class Espresso extends Beverage {
  constructor() {
    super();
    this.description = 'Espresso';
  }

  cost():number {
    return 1.99;
  }
}

export class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = 'Hosue Blend Coffee';
  }

  cost():number {
    return .89;
  }
}

export class Mocha extends CondimentDecorator {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription():string {
    return this.beverage.getDescription() + ', Mocha';
  }

  cost():number {
    return .20 + this.beverage.cost();
  }
}

// import { Beverage, Mocha, Espresso, HouseBlend } from './Decorator';

// let beverage: Beverage = new Espresso();
// console.log(beverage.getDescription() + ' $' + beverage.cost());

// let beverage2: Beverage = new HouseBlend();
// beverage2 = new Mocha(beverage2);
// console.log(beverage2.getDescription() + ' $' + beverage.cost());

// beverage2 = new Mocha(beverage2);
// console.log(beverage2.getDescription() + ' $' + beverage.cost());
