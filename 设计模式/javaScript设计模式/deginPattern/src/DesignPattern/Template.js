// Vue组件的生命周期钩子方法

// 基类
let Beverage = function (param) {
  let boilWater = function () {
    console.log('把水煮沸');
  };
  let brew = param.brew || function () {
    throw new Error ('必须传递brew方法');
  };
  let pourInCup = param.pourInCup || function () {
    throw new Error ('必须传递pourInCup方法');
  };
  let addCondiments = param.addCondiments || function () {
    throw new Error ('必须传递addCondiments方法');
  };
  let F = function(){};
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  };
  return F;
};

// 咖啡类
let Coffee = Beverage({
  brew() {
    console.log('用沸水冲泡咖啡');
  },
  pourInCup() {
    console.log('把咖啡倒进杯子');
  },
  addCondiments() {
    console.log('加糖和牛奶');
  }
});
// 茶类
let Tea = Beverage({
  brew() {
    console.log('用沸水把茶煮沸');
  },
  pourInCup() {
    console.log('把茶倒进杯子');
  },
  addCondiments() {
    console.log('加柠檬');
  }
});

// 测试
let coffee = new Coffee();
coffee.init();
let tea = new Tea();
tea.init();
