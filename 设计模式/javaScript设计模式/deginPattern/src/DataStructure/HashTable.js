function HashTable() {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.put = put;
  this.betterPut = betterPut;
  // this.get = get;
}

function simpleHash(data) {
  let total = 0;
  for (let i = 0;i < data.length;++i) {
    total = data.charCodeAt(i);
  }
  return total % this.table.length;
}

function put(data) {
  let pos = this.simpleHash(data);
  this.table[pos] = data;
}

function showDistro() {
  let n = 0;
  for (let i = 0;i < this.table.length; ++i) {
    if (this.table[i] !== undefined) {
      console.log(`${i}:${this.table[i]}`);
    }
  }
}

function betterHash(data) {
  const H = 37;
  let total = 0;
  for (let i = 0;i < data.length;++i) {
    total += H * total + data.charCodeAt(i);
  }
  total = total % this.table.length;
  return parseInt(total);
}

function betterPut(data) {
  let pos = this.betterHash(data);
  this.table[pos] = data;
}

// 开链法
/*
function buildChains() {
  for (let i = 0; i < this.table.length; i++) {
    this.table[i] = new Array();
  }
}

function putChain(key, data) {
  let pos = this.betterHash(key);
  let index = 0;
  if (this.table[pos][index] === undefined) {
    this.table[pos][index + 1] = data;
  } else {
    while (this.table[pos][index] !== undefined) {
      ++index;
    }
    this.table[pos][index] = data;
  } 
}

function getChain(key) {
  let index = 0;
  let pos = this.betterHash(key);
  if (this.table[pos][index] === key) {
    return this.table[pos][index+1];
  } else {
    while (this.table[pos][index] !== key && index <= 2 ) {
      index += 2;
    }
    return this.table[pos][index+1];
  }
  return undefined;
}
  */

