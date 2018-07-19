function Dictionary() {
  this.add = add;
  this.dataStore = [];
  this.find = find;
  this.remove = remove;
  this.showAll = showAll;
  this.count = count;
  this.clear = clear;
}

function add(key, val) {
  this.dataStore[key] = val;
}

function find(key) {
  return this.dataStore[key];
}

function remove(key) {
  delete this.dataStore[key];
}

function showAll() {
  for (let key in Object.keys(this.dataStore)) {
    console.log(`${key}->${this.dataStore[key]}`);
  }
}

function count() {
  let n = 0;
  for (let key in Object.keys(this.dataStore)) {
    ++n;
  }
  return n;
}

function clear() {
  for (let key in Object.keys(this.dataStore)) {
    delete this.dataStore[key];
  }
}

