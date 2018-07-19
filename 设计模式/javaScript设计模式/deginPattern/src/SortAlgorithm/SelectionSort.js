let CArray = require('./CArray');
function selectionSort(cArr) {
  let min, temp;
  let start = Date.now();
  for (let outer = 0;outer <= cArr.dataStore.length - 2;outer++) {
    min = outer;
    for (let inner = outer + 1;inner <= cArr.dataStore.length-1;inner++) {
      if (cArr.dataStore[inner] < cArr.dataStore[min]) {
        min = inner;
      }
      cArr.swap(cArr.dataStore, outer, inner);
    }
  }
  let diff = Date.now() - start;
  console.log(diff);
}

let cArr = new CArray(10000);
cArr.setData();
console.log('go here');
selectionSort(cArr);

/*
  100 ->  1ms
  1000  -> 46ms
  10000 -> 4432ms 4586ms 4539ms;
 */
