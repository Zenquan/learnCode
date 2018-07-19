let CArray = require('./CArray');
function quickSort(arr) {
  if (arr.length === 0) {
    return [];
  }
  let left = [];
  let right = [];
  let pivot = arr[0];
  for (let i = 1;i < arr.length;i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

let cArr = new CArray(5000000);
cArr.setData();
let start = Date.now();
quickSort(cArr.dataStore);
let diff = Date.now() - start;
console.log(diff);

/*
  100 ->  0ms
  1000  -> 3ms
  10000 -> 16ms 17ms  17ms  
  100000  ->  170ms 175ms 
  500000 ->   848ms 1070ms
  1000000 -> 1803ms 1847ms 内存占用0.1G
  500000  ->  10039ms 10437ms
 */

