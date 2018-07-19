/**
 * @class 策略模式
 * @description 通过委托类实现
 */
class FlyBehavior {
  fly() {
    console.log('fly');
  };
}

class QuackBehavior {
  quack() {
    console.log('quack');
  };
}

class Duck{
  flyBehavior: FlyBehavior;
  quackBehavior: QuackBehavior;
  constructor() {
    this.flyBehavior = new FlyBehavior();
    this.quackBehavior = new QuackBehavior();
  }
  fly() {
    this.flyBehavior.fly();
  };
  quack() {
    this.quackBehavior.quack();
  };  
}

class MallarDuck extends Duck {
  constructor() {
    super();
  }

}

export default MallarDuck;

