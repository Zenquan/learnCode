/**
 * @class 工厂模式
 * @description 定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类把实例化推迟到子类
 */

export class Pizza {
  protected type: string = 'Pizza';

  constructor(type: string) {
    if(type) {
      this.type = type;
    }
    console.log(this.type);
  }

  prepare() {
    console.log('Pizza is preparing');
  }

  bake() {
    console.log('Pizza is baking');
  }

  cut() {
    console.log('Pizza is cutting');
  }

  box() {
    console.log('Pizza is boxing');
  }

}

class CheesePizza extends Pizza {
  constructor() {
    super('CheesePizza');
  }
}

class VeggiePizza extends Pizza {
  constructor() {
    super('VeggiePizze');
  }
}

class ClamPizza extends Pizza {
  constructor() {
    super('ClamPizza');
  }
}

class PapperoniPizza extends Pizza {
  constructor() {
    super('PapperoniPizza');
  }
}

export class SimplePizzaFactory {
  createPizza(type: string): Pizza {
    let pizza: Pizza = null;
    switch (type) {
      case 'CheesePizza': pizza = new CheesePizza();
        
        break;

      case 'VeggiePizza': pizza = new VeggiePizza();
        
        break;

      case 'ClamPizza': pizza = new ClamPizza();
        
        break;
      
      case 'PapperoniPizza': pizza = new PapperoniPizza();
        
        break;
    
      default: 
        break;
    }
    return pizza;
  }
}

export class PizzaStore {
  private factory: SimplePizzaFactory;

  constructor(factory: SimplePizzaFactory) {
    this.factory = factory;
  }

  orderPizza(type: string): Pizza {
    let pizza: Pizza;
    pizza = this.factory.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }
}

// import { SimplePizzaFactory, PizzaStore, Pizza } from './Factory';

// let factory: SimplePizzaFactory = new SimplePizzaFactory();
// let store: PizzaStore = new PizzaStore(factory);

// let pizza1: Pizza = store.orderPizza('CheesePizza');

// let pizza2: Pizza = store.orderPizza('ClamPizza');
