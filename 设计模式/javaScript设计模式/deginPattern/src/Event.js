// 获取DOM
let btn = document.getElementById('button');

// JQuery方法
$(btn).trigger('click');

// 原生Document方法
let event = document.createEvent('Event');
event.initEvent('build');
btn.addEventListener('build', function(e) {});
btn.dispatchEvent(event);

// 构造函数
let event = new Event('build');
btn.addEventListener('build', function(e) {});
btn.dispatchEvent(event);
let customEvent = new CustomEvent('build', {'detail': btn.dataset.time});

