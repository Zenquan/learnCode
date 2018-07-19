function List () {
  this.listSize = 0;
  this.pos = 0;
  this.dataStore = [];
  this.clear = clear;
  this.find = find;
  this.toString = toString;
  this.insert = insert;
  this.append = append;
  this.remove = remove;
  this.front = front;
  this.end = end;
  this.prev = prev;
  this.next = next;
  this.length = length;
  this.currPos = currPos;
  this.moveTo = moveTo;
  this.getElement = getElement;
  this.contains = contains;
}

function append(el) {
  this.dataStore[this.listSize++] = el;
}

function find(el) {
  for (let i = 0;i<this.dataStore.length;i++) {
    if(this.dataStore[i] === el) {
      return i;
    }
  }
  return -1;
}

function remove(el) {
  let foundAt = this.find(el);
  if (foundAt > -1) {
    this.dataStore.splice(foundAt, 1);
    --this.length;
    return true;
  }
  return false;
}

function length() {
  return this.listSize;
}

function toString() {
  return this.dataStore;
}

function insert(el, after) {
  let insertPos = this.find(after);
  if (insertPos > -1) {
    this.dataStore.splice(insertPos+1, 0, el);
    ++this.listSize;
    return true;
  }
  return false;
}

function clear() {
  delete this.dataStore;
  this.dataStore = [];
  this.listSize = this.pos = 0;
}

function contains(el) {
  for (let i = 0;i < this.dataStore.length;i++) {
    if (this.dataStore[i] === el) {
      return true;
    }
  }
  return false;
}

function front() {
  this.pos = 0;
}

function end() {
  this.pos = this.listSize - 1;
}

function prev() {
  if (this.pos > 0) {
    --this.pos;
  }
}

function next() {
  if(this.pos < this.listSize - 1) {
    ++this.pos;
  }
}

function currPos() {
  return this.pos;
}

function moveTo(pos) {
  this.pos = pos;
}

function getElement() {
  return this.dataStore[this.pos];
}