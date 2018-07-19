/* 适配器模式主要用来解决两个已有接口之间不匹配的问题，它不考虑这些接口是怎样实现的，
   也不考虑它们将来可能会如何演化。适配器模式不需要改变已有的接口，就能使他们协同作用
*/

let googleMap = {
  show() {
    console.log('开始渲染谷歌地图');
  }
};
let baiduMap = {
  display() {
    console.log('开始渲染百度地图');
  }
};
let baiduAdapter = {
  show() {
    baiduMap.display();
  }
};
let renderMap = function(map) {
  try {
    if (map.show instanceof Function) {
      map.show();
    } else {
      throw new Error('未具备show接口');
    }

  } catch (error) {
    console.log(error.message);
  }

};
renderMap(googleMap);
renderMap(baiduMap);
