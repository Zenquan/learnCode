// 定义发布者
let event = {
  // 定义订阅者列表
  clientList: [],
  // 定义订阅方法，如果订阅者不存在则新建一个空数组，将新消息添加进订阅者列表
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  // 定义触发方法，获取订阅者名字，并取出消息，依次执行
  trigger() {
    let key = [...arguments].shift();
    let fns = this.clientList[key];
    // 如果没有对应消息，返回false并报错
    if (!fns || fns.length === 0) {
      throw new Error('没有对应方法');
      return false;
    }
    for ( fn of fns) {
      let arg = [...arguments].slice(1,arguments.length);
      fn.apply(this, arg);
    }
  },
  // 安装发布者
  installEvent(obj) {
    return Object.assign(obj, this);
  }
};
// 测试
let hospital = {};
event.installEvent(hospital);
hospital.listen('1号病人', date => {
  console.log(`1号病人${date}天前出院了`);
});
hospital.listen('2号病人', date => {
  console.log(`2号病人${date}天前出院了`);
});
hospital.trigger('1号病人', 2);
hospital.trigger('2号病人', 3);

