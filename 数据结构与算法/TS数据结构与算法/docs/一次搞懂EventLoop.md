![事件循环](https://yjhjstz.gitbooks.io/deep-into-node/content/chapter5/5fee18eegw1ewjpoxmdf5j20k80b1win.jpg)
![EventLoop](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)


## 事件循环
事件循环被称作循环的原因在于，它一直在查找新的事件并且执行。一次循环的执行称之为 tick， 在这个循环里执行的代码称作 task
```javascript
while (eventLoop.waitForTask()) {
  eventLoop.processNextTask()
}
```
任务(Tasks)中同步执行的代码可能会在循环中生成新的任务。一个简单的生成新任务的编程方式就是 ```setTimtout(taskFn, deley)```,当然任务也可以从其他的资源产生，比如用户的事件、网络事件或者DOM的绘制。
![event-loop-1.png](https://upload-images.jianshu.io/upload_images/3995692-65d00e96c0d8a647.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 任务队列
让事情变得复杂的情况是，事件循环可能有几种任务任务队列。唯一的两个限制是同一个任务源中的事件必须属于同一个队列，并且必须在每个队列中按插入顺序处理任务。除了这些之外，执行环境可以自由地做它所做的事情。例如，它可以决定下一步要处理哪些任务队列。
```javascript
while (eventLoop.waitForTask()) {
  const taskQueue = eventLoop.selectTaskQueue()
  if (taskQueue.hasNextTask()) {
    taskQueue.processNextTask()
  }
}
```
基于这个模型，我们失去了对事件执行时间的控制权。浏览器可能决定在执行我们设定的```setTimeout```之前先清空其他几个队列.
![event-loop-2.png](https://upload-images.jianshu.io/upload_images/3995692-82908fb9d24c9eea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Microtask queue
幸运的是，事件循环也有一个单独的队列叫做 microtask，microtask 将会在百分百在当前task队列执行完毕以后执行
```javascript
while (eventLoop.waitForTask()) {
  const taskQueue = eventLoop.selectTaskQueue()
  if (taskQueue.hasNextTask()) {
    taskQueue.processNextTask()
  }

  const microtaskQueue = eventLoop.microTaskQueue
  while (microtaskQueue.hasNextMicrotask()) {
    microtaskQueue.processNextMicrotask()
  }
}
```
最简单的方式生成一个 microtask 任务是 ```Promise.resolve().then(microtaskFn)```, Microtasks 的插入执行是按照顺序的，而且因为只有一个唯一的 microtask 队列。执行环境不会再搞错执行的时间了。
另外，microtask任务 也可以生成新的 microtask任务 并且插入到同样的队列中（插入当前microtask）并且在同一个 tick 里执行
![event-loop-3.png](https://upload-images.jianshu.io/upload_images/3995692-ca257e857321e133.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 渲染
最后一个是关于渲染的任务，不同于其他的任务处理，渲染任务并不是被独立的后台任务处理。它可能会是一个独立运行在每一个tick结束后的算法。执行环境拥有较大的选择空间，它可能会在每一个任务队列后执行渲染，也可能执行多个任务队列而不渲染。
幸运的是这里有一个 ```requestAnimationFrame(handle)```函数，它会正确的在下一次渲染时执行内置的函数

最后这就是我们整个的渲染模型
```javascript
while (eventLoop.waitForTask()) {
  const taskQueue = eventLoop.selectTaskQueue()
  if (taskQueue.hasNextTask()) {
    taskQueue.processNextTask()
  }

  const microtaskQueue = eventLoop.microTaskQueue
  while (microtaskQueue.hasNextMicrotask()) {
    microtaskQueue.processNextMicrotask()
  }

  if (shouldRender()) {
    applyScrollResizeAndCSS()
    runAnimationFrames()
    render()
  }
}
```
![event-loop-4.png](https://upload-images.jianshu.io/upload_images/3995692-cb316db1c839f4d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 以上内容翻译自[writing-a-javascript-framework-execution-timing-beyond-settimeout](https://blog.risingstack.com/writing-a-javascript-framework-execution-timing-beyond-settimeout/)

## 思考
以上就是对整个event loop的翻译与解释，文章解释比较简洁明细，但是相信大部分同学可能还是不太明白，那么我们换个思路，如果面试官问什么是event loop，面试官是想知道些什么？我应该怎么回答？

event loop顾名思义就是事件循环，为什么要有事件循环呢？因为V8是单线程的，即同一时间只能干一件事情，但是呢文件的读取，网络的IO处理是很缓慢的，并且是不确定的,如果同步等待它们响应，那么用户就起飞了。于是我们就把这个事件加入到一个 事件队列里(Task),等到事件完成时，event loop再执行一个事件队列。

值得注意的是，每一种异步事件加入的 事件队列是不一样的。*唯一的两个限制是同一个任务源中的事件必须属于同一个队列，并且必须在每个队列中按插入顺序处理任务。* 也就是说由系统提供的执行Task的方法，如 setTimeout setInterval setimmediate 会在一个Task，网络IO会在一个Task，用户的事件会在一个Task。event Loop会参照以下顺序执行

1. update_time
在事件循环的开头，这一步的作用实际上是为了获取一下系统时间，以保证之后的timer有个计时的标准。这个动作会在每次事件循环的时候都发生，确保了之后timer触发的准确性。（其实也不太准确....)

2. timers
事件循环跑到这个阶段的时候，要检查是否有到期的timer,其实也就是setTimeout和setInterval这种类型的timer，到期了，就会执行他们的回调。

3. I/O callbacks
处理异步事件的回调，比如网络I/O，比如文件读取I/O。当这些I/O动作都结束的时候，在这个阶段会触发它们的回调。

4. idle, prepare
这个阶段内部做一些动作，与理解事件循环没啥关系

5. I/O poll阶段
这个阶段相当有意思，也是事件循环设计的一个有趣的点。这个阶段是选择运行的。选择运行的意思就是不一定会运行。

6. check
执行setImmediate操作

7. close callbacks
关闭I/O的动作，比如文件描述符的关闭，链接断开，等等等
```c++
// v8中的源码部分
int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;

  r = uv__loop_alive(loop);
  if (!r)
    uv__update_time(loop);

//这里就是那个被称作event loop的while loop
  while (r != 0 && loop->stop_flag == 0) {
    uv__update_time(loop);
    uv__run_timers(loop);
    ran_pending = uv__run_pending(loop);
    uv__run_idle(loop);
    uv__run_prepare(loop);

    timeout = 0;
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
      timeout = uv_backend_timeout(loop);

    uv__io_poll(loop, timeout);
    uv__run_check(loop);
    uv__run_closing_handles(loop);

    if (mode == UV_RUN_ONCE) {
      uv__update_time(loop);
      uv__run_timers(loop);
    }

    r = uv__loop_alive(loop);
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }
  if (loop->stop_flag != 0)
    loop->stop_flag = 0;

  return r;
}
```

除了Task还有一个microtask，这一个概念是ES6提出Promise以后出现的。这个microtask queue只有一个。并且会在且一定会在每一个Task后执行，且执行是按顺序的。加入到microtask 的事件类型有Promise.resolve().then(), process.nextTick() 值得注意的是，event loop一定会在执行完micrtask以后才会寻找新的 可执行的Task队列。而microtask事件内部又可以产生新的microtask事件比如
```javascript
(function microtask() {
  process.nextTick(() => microtask())
})()
```
这样就会不断的在microtask queue添加事件，导致整个eventloop堵塞

最后就是一个渲染的事件队列，这个队列只出现在浏览器上，并且执行环境会根据情况决定执行与否(可能执行很多Task queue也不执行渲染队列)。它如果执行则一定会在microtask后执行，通过```requestAnimationFrame(handle)``` 方法,能够保证中间的代码一定能在下一次执行渲染函数前执行

### 补充常见的产生microtask和Task事件的方法
microtasks:

* process.nextTick
* promise
* Object.observe
* MutationObserver

Tasks:
* setTimeout
* setInterval
* setImmediate
* I/O
* UI渲染

### Tips
1. 我们通过node运行一个js文件，如果没有可执行事件的事件队列，进程就会退出，那么怎么不让它退出呢？

setInterval方法，这货会一直循环建立新的事件，这样能够保证node进程不退出

监听 beforeExit 事件，通过process.on('beforeExit', handle) 这个事件在node进程退出前会触发，但是如果这里面的handle包含了一个可以生成异步事件的操作，则node进程也不会退出。手动触发process.exit(EXIT_CODE)不会触发该事件

2. setInterval会导致node进程不能正常退出，但是如果希望即使有setInterval也能正常退出怎么办(有一些循环并不希望挂起node进程)？

const timer = process.setInterval(handle, deley) 调用setInterval方法会返回一个timer，调用 timer.unref() 则event-loop判断除它以外，没有可进行的事件队列后也会推出

3. process.on('exit', handle)中，handle里的异步事件不能执行
exit事件在手动执行process.exit(EXIT_CODE)后，或者event loop中没有可执行的事件队列 时触发。触发 exit 事件后，执行环境就不会再生成新的 事件队列了，因此这里面的异步事件都会被强制队列


### 最后
以上都是我瞎编的
如果你喜欢我瞎编的文章，欢迎star [Github](https://github.com/MrTreasure/Algorithm)
