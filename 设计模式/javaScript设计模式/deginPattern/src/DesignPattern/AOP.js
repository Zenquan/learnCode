// 面向切面编程
Function.prototype.before = function(beforefn) {
  let _self = this;
  return function() {
    beforefn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
};

// 测试代码
let func = function(param) {
  console.log(param);
};
func = func.before(function(param){
  param.b = 'b';
});
func({a:'a'});
