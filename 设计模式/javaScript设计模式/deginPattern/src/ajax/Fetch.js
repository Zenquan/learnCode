let input = 'https://www.baidu.com';
let init = {
  method: 'GET',
  headers: [],
  body: null,
  mode: 'cors',
  crdentials: 'omit',
  cache: 'no-store'
};

fetch(input, init)
.then(res => res.json())
.then(data => console.log(data))
.catch(e => console.log(e));