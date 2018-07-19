// 策略模式：定义一些列的算法，把他们一个个封装起来，并且使他们可以相互替换
let startegies = {
  'S': (salary) => {
    return salary*4;
  },
  'A': (salary) => {
    return salart*3;
  },
  'B': (salary) => {
    return salary*2;
  }
};
let calculateBonus = function(level, salary) {
  return startegies[level](salary);
};
