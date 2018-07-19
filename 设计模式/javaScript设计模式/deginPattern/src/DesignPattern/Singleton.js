// 对象字面量
// 最简单的模式，不能惰性加载
let  singleton = {
  name: 'VS',
  type: 'edit'
};

// 工厂模式
// 只能使用getIntence方法
function singletonB () {
  this.name = 'VS';
  this.type = 'edit';
}
function getIntence () {
  if(singletonB) {
    return singletonB;
  } else {
    return new singletonB();
  }
}

// 透明单例模式 new和方法调用都行
function singletonC () {
  if (singletonC.instence) {
    return singletonC.instence;
  }
  this.name = 'VS';
  this.type = 'edit';
  singletonC.instence = this;
}
