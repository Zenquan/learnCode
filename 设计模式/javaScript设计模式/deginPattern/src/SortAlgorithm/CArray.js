function CArray(numEle) {
  this.dataStore = [];
  this.pos = 0;
  this.gaps = [701,301, 132, 57, 23, 10, 4, 1];
  this.numElements = numEle;
  this.inset = insert;
  this.toString = toString;
  this.clear = clear;
  this.setData = setData;
  this.swap = swap;
  this.setGaps = setGaps;
  for (let i = 0;i < this.numElements;i++) {
    this.dataStore[i] = [i];
  }
}

function setData() {
  for (let i = 0;i < this.numElements;i++) {
    this.dataStore[i] = ~~(Math.random() * (this.numElements + 1));
  }
}

function clear() {
  for (let i = 0;i < this.dataStore.length;i++) {
    this.dataStore[i] = 0;
  }
}

function insert(ele) {
  this.dataStore[this.pos++] = ele;
}

function toString() {
  let restr = '';
  for(let i = 0;i < this.dataStore.length;i++) {
    restr += this.dataStore[i] + ' ';
    if (i > 0 && i % 10 ===0) {
      restr += '\n';
    }
  }
  return restr;
}

function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function setGaps(arr) {
  this.gaps = arr;
}

module.exports =  CArray;

// let numElements = 100;
// let myNums = new CArray(numElements);
// myNums.setData();
// console.log(myNums.toString());