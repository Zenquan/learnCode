let CArray = require('./CArray');
function insetionSort(cArr) {
  let temp, inner;
  let start = Date.now();
  for (let outer = 1;outer <= cArr.dataStore.length - 1;outer++) {
    temp = cArr.dataStore[outer];
    inner = outer;
    while (inner > 0 && (cArr.dataStore[inner - 1] >= temp)) {
      cArr.dataStore[inner] = cArr.dataStore[inner - 1];
      inner--;
    }
    cArr.dataStore[inner] = temp;
  }
  let diff = Date.now() - start;
  console.log(diff);
}

let cArr = new CArray(10000);
cArr.setData();
insetionSort(cArr);

/*
  100 ->  0ms
  1000  -> 13ms
  10000 -> 1292ms 1469ms 1484ms;
 */
