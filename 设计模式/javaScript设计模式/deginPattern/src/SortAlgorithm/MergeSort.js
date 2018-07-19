let CArray = require('./CArray');
function mergeSort(arr) {
  let start = Date.now();
  if (arr.length < 2) {
    return;
  }
  let step = 1;
  let left, right;
  while (step < arr.length) {
    left = 0;
    right = step;
    while (right + step <= arr.length) {
      mergeArrays(arr, left, left + step, right, right + step);
      left = right + step;
      right = left + step;
    }
    if (right < arr.length) {
      mergeArrays(arr, left, left + step, right, right + step);
    }
    step *= 2;
  }
  let diff = Date.now() - start;
  console.log(diff);
}

function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
  let rightArr = new Array(stopRight - startRight + 1);
  let leftArr = new Array(stopLeft - startLeft + 1);
  let k = startRight;
  for (let i = 0; i < (leftArr.length - 1);i++) {
    leftArr[i] = arr[k];
    k++;
  }
  rightArr[rightArr.length - 1] = Infinity;
  leftArr[leftArr.length - 1 ] = Infinity;
  let m = 0;
  let n = 0;
  for (k = startLeft;k < stopRight;k++) {
    if (leftArr[m] <= rightArr[n]) {
      arr[k] = leftArr[m];
      m++;
    } else {
      arr[k] = rightArr[n];
      n++;
    }
  }
}

let cArr = new CArray(1000000);
cArr.setData();
mergeSort(cArr.dataStore);

/*
  100 ->  0ms
  1000  -> 3ms
  10000 -> 16ms 32ms  16ms  
  100000  ->  201ms 207ms 
  500000 ->   1168ms 1278ms
  1000000 -> 2352ms 2448ms 内存占用0.1G
 */