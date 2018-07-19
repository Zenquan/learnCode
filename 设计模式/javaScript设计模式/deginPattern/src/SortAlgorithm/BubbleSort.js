let CArray = require('./CArray');
function bubbleSort(cArr) {
  let numElements = cArr.dataStore.length;
  let temp;
  let start = Date.now();
  for (let outer = numElements;outer >=2;outer--) {
    for(let inner = 0;inner <= outer-1;inner++) {
      if(cArr.dataStore[inner] < cArr.dataStore[inner + 1]) { // 这里大于小于决定选择的方向，小于排最小的，大于排最大的。
        cArr.swap(cArr.dataStore, inner, inner+1);
      }
      // console.log(cArr.toString());
    }
  }
  let diff = Date.now() - start;
  console.log(diff);
  return cArr;
}

let cArr = new CArray(10000); 
cArr.setData();
cArr = bubbleSort(cArr);

/*
  100 ->  1ms
  1000  -> 32ms
  10000 -> 3345ms 3485ms 3508ms
 */