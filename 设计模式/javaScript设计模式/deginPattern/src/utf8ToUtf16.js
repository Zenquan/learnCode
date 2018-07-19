let s = String.fromCharCode(0x16F00);
console.log(s);
let msg = s.codePointAt(0).toString(2);
console.log(msg);
console.log((0x16F00).toString(2));
console.log(typeof 0x16F00);
/*
  打印结果
  漀
  110111100000000
  0110111100000000
  number
*/
/*
  前端开发过程中对于编码确实是不甚了解，这道题解法应该与ES6的 ArrayBuffer 和 Unit8Array（TypedArray）有关，
  无奈以前并未对这部分有深入学习,若想完全掌握，也非一日之功，以后有时间会尝试对编码进行深入学习
*/
