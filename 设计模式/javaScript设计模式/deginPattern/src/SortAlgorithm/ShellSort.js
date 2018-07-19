let CArray = require('./CArray');

function shellSort(cArr) {
  let j;
  let start = Date.now();
  for (let g = 0;g < cArr.gaps.length;g++) {
    for (let i = cArr.gaps[g];i < cArr.dataStore.length;i++) {
      let temp = cArr.dataStore[i];
      for (j = i;j >= cArr.gaps[g] && cArr.dataStore[j - cArr.gaps[g]] > temp;j -= cArr.gaps[g]) {
        cArr.dataStore[j] = cArr.dataStore[j - cArr.gaps[g]];
      }
      cArr.dataStore[j] = temp;
    }
  }
  let diff = Date.now() - start;
  console.log(diff);
}

function shellSortDiff(cArr) {
  let N = cArr.dataStore.length;
  let h = 1;
  let arr = [];
  arr.push(h);
  while(h < N/3) {
    h = 3 * h +1;
    arr.push(h);
  }
  return arr;
}

let cArr = new CArray(500000);
cArr.setData();
cArr.setGaps(shellSortDiff(cArr));
console.log('go here');
console.log(cArr.gaps);
shellSort(cArr);

/*
  100 ->  4ms
  1000  -> 17ms
  10000 -> 163ms 144ms 155ms;  gaps=[23,10,4,1]
  100000  ->  14449ms 14561ms gaps=[23,10,4,1]
  100000  ->  1468ms 1632ms 1600ms  gaps = [301, 132, 57, 23, 10, 4, 1]
  500000 -> 15187ms 14813ms 14478ms gaps = [701,301, 132, 57, 23, 10, 4, 1]
  500000 -> 
 */