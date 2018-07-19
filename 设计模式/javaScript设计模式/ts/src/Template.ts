/**
 * @class 模板模式
 * @description 在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中。模板方法中使得子类可以子啊不改变算法结构的情况下，重新定义算法中的某些步骤
 */

abstract class CaffeineBeverage {
  protected abstract brew()
  protected abstract addCondiments()

  private boilWater() {
    console.log('Boiling water');
  }
  private pourInCup() {
    console.log('Pouring into cup');
  }
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
}

export class Coffee extends CaffeineBeverage {
  protected brew() {
    console.log('Dripping Coffee through filter');
  }
  protected addCondiments() {
    console.log('Adding Sugar and Milk\n');
  }
 }

export class Tea extends CaffeineBeverage {
  protected brew() {
    console.log('Steeping the tea');
  }
  protected addCondiments() {
    console.log('Adding Lemon\n');
  }
 }

 abstract class AbstractClass {
  /**
   * @method 抽象方法由子类实现
   */
  abstract primitiveOperation1();
  abstract primitiveOperation2();

  /**
   * @method 具体方法有抽象类实现
   */
  concerteOpertion() {

  }

                                            
/**
 * @method 钩子函数
 * @description 
 */
  hook() {

  } 

  templateMethod() {
    this.primitiveOperation1();
    this.primitiveOperation2();
    this.concerteOpertion();
    this.hook();
  }
}

// import { Coffee, Tea } from './Template';

// let tea: Tea = new Tea();
// let coffee: Coffee = new Coffee();

// tea.prepareRecipe();
// coffee.prepareRecipe();