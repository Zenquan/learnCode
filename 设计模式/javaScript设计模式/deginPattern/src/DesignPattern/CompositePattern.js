/*
  组合模式将对象组合成树型结构，以表示“整体-部分”的层次结构。除了用来表示树型结构之外，
  组合模式的另一个好处就是通过对对象的多态性表现，使得用户对单个对象和组合对象的使用具有
  一致性。
*/

//扫描文件夹

let Folder = function (name) {
  this.name = name;
  this.files = [];
};
Folder.prototype.add = function (file) {
  this.files.push(file);
  return this;
};
Folder.prototype.scan = function () {
  console.log(`开始扫描文件夹：${this.name}`);
  for (file of this.files){
    file.scan();
  }
};

let File = function (name) {
  this.name = name;
};
File.prototype.add = function () {
  throw new Error('文件下面不能添加文件夹');
};
File.prototype.scan = function () {
  console.log(`开始扫描文件夹：${this.name}`);
};

//测试
let folder1 = new Folder('学习资料');
let folder2 = new Folder('JavaScript');
let file1 = new File('ES6标准入门');
let file2 = new File('JavaScript设计模式');
let file3 = new File('JavaScript高级程序设计');

folder1.add(file1).add(folder2);
folder2.add(file2).add(file3);
folder1.scan();
