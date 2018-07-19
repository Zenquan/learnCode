let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.baidu.com', true);
xhr.error = function(err) {
  console.log(err);
};
xhr.onreadystatechange() {
  console.log(xhr.response);
};
xhr.setRequestHeader('key', 'value');
xhr.open(null);