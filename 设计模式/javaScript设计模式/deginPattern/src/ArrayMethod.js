let arrA = [1,2,3,3];
let arrB = [2,4,5,6];
let setA = new Set(arrA);
let setB = new Set(arrB);

//求并集
let unionSet = new Set([...setA, ...setB]);
console.log(Array.from(unionSet));

//求交集
let intersectionSet = new Set([...setA].filter(x => setB.has(x)));
console.log(Array.from(intersectionSet));

//求补集
let differenceSet = new Set([...setA].filter(x => !setB.has(x)));
console.log(Array.from(differenceSet));
