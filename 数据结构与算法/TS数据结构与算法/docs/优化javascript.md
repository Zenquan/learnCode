## 如何写出优化的 JavaScript
1. 对象属性的顺序: 在实例化你的对象属性的时候一定要使用相同的顺序，这样隐藏类和随后的优化代码才能共享。
2. 动态属性: 在对象实例化之后再添加属性会强制使得隐藏类变化，并且会减慢为旧隐藏类所优化的代码的执行。所以，要在对象的构造函数中完成所有属性的分配。
3. 方法: 重复执行相同的方法会运行的比不同的方法只执行一次要快 (因为内联缓存)。
4. 数组: 避免使用 keys 不是递增的数字的稀疏数组，这种不是每一个元素在里面的稀疏数组其实是一个 hash 表。在这种数组中每一个元素的获取都是昂贵的代价。同时，要避免提前申请大数组。最好的做法是随着你的需要慢慢的增大数组。最后，不要删除数组中的元素，因为这会使得 keys 变得稀疏。
5. 标记值 (Tagged values): V8 用 32 位来表示对象和数字。它使用一位来区分它是对象 (flag = 1) 还是一个整型 (flag = 0)，也被叫做小整型(SMI)，因为它只有 31 位。然后，如果一个数值大于 31 位，V8 将会对其进行 box 操作，然后将其转换成 double 型，并且创建一个新的对象来装这个数。所以，为了避免代价很高的 box 操作，尽量使用 31 位的有符号数。

## javascript中常见的内存泄露
1. 未声明便使用变量(严格模式下会报错)。未声明的变量将会挂载到全局上，任何使用的到这个变量的地方都将不会被GC标记，导致GC不会清除相关的调用。如果需要使用全局变量时一定要手动的释放，x = null, x = undefined
2. 被忘记的定时器或者回调函数。在老旧浏览器中，添加的事件订阅器或者定时器，如果在不需要它们的时候不正确释放或移除，将导致变量被持续引用。现代浏览器能够正确移除不再使用的事件监听器(比如在为一个元素添加click事件时，如果该元素被删除了，浏览器将自动移除订阅他的事件)
3. 闭包。形成的闭包被外部引用，能够在外部访问闭包的内部，那么这个闭包将不会被GC正确清理
4. 超出DOM的引用。DOM树保持着对内部节点的引用，如果使用document的方法获取到了DOM元素，使得内存中有了这些节点的引用，那么即使DOM树删除了这些节点，GC也不能正确释放相关的资源

## webscoket请求头 响应头简单示例
```
// 请求头
GET ws://websocket.example.com/ HTTP/1.1
Origin: http://example.com
Connection: Upgrade
Host: websocket.example.com
Upgrade: websocket
// 响应头
HTTP/1.1 101 Switching Protocols
Date: Wed, 25 Oct 2017 10:07:34 GMT
Connection: Upgrade
Upgrade: WebSocket
```
握手完成，最初的一个 HTTP 连接被一个使用相同底层 TCP/IP 连接的 WebSocket 连接所取代。自此，任何一方都可以开始发送数据了

## WebAssembly 
WebAssembly（也叫作 wasm）是一种高效且底层的给 web 使用的字节码。

WASM 让你能够用 JavaScript 之外的语言（例如 C、C++、Rust 或其他）编写程序，然后将其（提前）编译到 WebAssembly。

其结果是 Web 应用程序加载和执行速度都非常快。

## 优化渲染性能
1. JavaScript —— 在之前的文章中，我们介绍了关于编写高性能代码的主题，这些代码不会阻塞 UI，并且内存效率高等等。当涉及渲染时，我们需要考虑 JavaScript 代码与页面上 DOM 元素交互的方式。JavaScript 可以在 UI 中产生大量的更新，尤其是在 SPA 中。
2. 样式计算 —— 这是基于匹配选择器确定哪个 CSS 规则适用于哪个元素的过程。一旦定义了规则，就会应用这些规则，并计算出每个元素的最终样式。
3. 布局 —— 一旦浏览器知道哪些规则适用于元素，就可以开始计算后者占用的空间以及它在浏览器屏幕上的位置。Web 的布局模型定义了一个元素可以影响其他元素。例如，<body> 的宽度会影响子元素的宽度等等。这一切都意味着布局过程是计算密集型的。该绘图是在多个图层完成的。
4. 绘图 —— 这里开始填充实际的像素。该过程包括绘制文本、颜色、图像、边框、阴影等 —— 每个元素的每个视觉部分。
5. 合成 —— 由于页面部件被划分为多层，因此需要按照正确的顺序将其绘制到屏幕上，以便正确地渲染页面。这非常重要，特别是对于重叠元素来说。

## 浏览器预加载策略
1. DNS预解析 DNS-Prefetch ```<link rel="dns-prefetch" href="//example.com">```
2. 预连接 Preconnect ```<link rel="preconnect" href="http://example.com">```
3. 预获取 Prefetching ```<link rel="prefetch" href="image.png">```
4. 预渲染 Prerender ```<link rel="prerender" href="http://example.com">```(实测差距不大)

## 缓存机制
* 减少冗余数据传输
* 缓解网络瓶颈
* 降低服务器负载
* 加快响应

![缓存模型](../img/http-cache-decision-tree.png)
```javascript
const script = document.createElement('script')
script.src = '../index.js?' + Date.now()
document.body.appendChild(script)
```