//添加cookie 值为中文需要转码 重复名称会覆盖
function setCookie(name, val, day) {
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + day);
  document.cookie = `${name}=${val};expires=${expireDate.toGMTString}`;
}

//读取cookie 返回一个包含cookie键值对的数组
function getCookies() {
  let cookies = [];
  if(!document.cookie) {
    let cookieArr = document.cookie.split(';');
    for (let i = 0;i<cookieArr.length;i++) {
      let keyArr = cookieArr[i].split("=");
      let name = keyArr[0];
      let val = keyArr[1];
      cookies.push({name: val});
    }
  } else {
    return false;
  }
  return cookies;
}
console.log(cookies);

//删除cookie 把失效日期设置为过期
function removeCookie(name) {
  let cookies = getCookies();
  if (cookies) {
    for(let cookie of cookies) {
     if(cookie.name === name) {
        setCookie(name, null, -99);
        break;
      }
    }
  } else {
    return false;
  }
}

let CookieManager = {
  setCookie,
  getCookies,
  removeCookie
};
