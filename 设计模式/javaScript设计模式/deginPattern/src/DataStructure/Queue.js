function Queue() {
  this.dataStore = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.back = back;
  this.toString = toString;
  this.empty = isEmpty;
}

function enqueue(el) {
  this.dataStore.push(el);
}

function dequeue() {
  return this.dataStore.shift();
}

// 读取队首
function front() {
  return this.dataStore[0];
}

// 读取队尾
function back() {
  return this.dataStore[this.dataStore.length-1];
}

function toString() {
  let retStr = '';
  for (let i = 0;i < this.dataStore.length; i++) {
    retStr += this.dataStore[i] + '\n';
  }
  return retStr;
}

function isEmpty() {
  if (this.dataStore.length === 0 ) {
    return true;
  } else {
    return false;
  }
}