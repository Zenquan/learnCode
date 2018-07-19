/*
  享元模式划分内外状态：
  1.内部状态储存于对象内部
  2.内部状态可以被一些对象贡献
  3.内部状态可以独立于具体饿场景，通常不会改变
  4.外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享
  享元模式适用范围：
  1.一个程序中使用大量的相似对象
  2.由于使用大量相同对象，导致大量内存开销
  3.对象的大多数状态可以变为外部状态
  4.剥离出对象的外部状态之后，可以使用相对较少的共享对象取代大量对象
*/

// 剥离外部状态
let Upload = function (uploadType) {
  this.uploadType = uploadType;
};
Upload.prototype.delFile = function (id) {
  uploadManger.setExternalState(id, this);
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom);
  }
  if(window.confirm(`确定删除该文件吗？${this.fileName}`)) {
    return this.dom.parentNode.removeChild(this.dom);
  }
};

// 工厂进行对象实例化
let UploadFactory  = (function () {
  let createdFlyWeightObj ={};
  return {
    create(uploadType) {
      if (createdFlyWeightObj[uploadType]) {
        return createdFlyWeightObj[uploadType];
      }
      createdFlyWeightObj[uploadType] = new Upload(uploadType)
      return createdFlyWeightObj[uploadType];
    }
  }
})();

// 管理器封装外部状态
let uploadManger =(function() {
  let uploadDatabase = {};
  return {
    add(id, uploadType, fileName, fileSize) {
      let flyWeightObj = UploadFactory.create(uploadType);
      let dom = document.createElement('div');
      dom.innerHTML = `<span>文件名称：${fileName}，文件大小：${fileSize}</span><button class="delFile">删除</button>`;
      dom.querySelector('.delFile').onclick = function() {
        flyWeightObj.delFile(id);
      }
      document.body.appendChild(dom);
      uploadDatabase[id] = {
        fileName,
        fileSize,
        dom
      };
      return flyWeightObj;
    },
    setExternalState(id, flyWeightObj) {
      let uploadData = uploadDatabase[id];
      for (let i in uploadData){
        flyWeightObj[i] = uploadData[i];
      }
    }
  }
})();

// 触发上传动作函数
let id = 0;
window.startUpload = function(uploadType,files) {
  for(let i = 0, file; file = files[i++];) {
    let uploadObj = uploadManger.add(++id, uploadType, file.fileName, file.fileSize);
  }
};

// 测试
startUpload('plugin',[
  {
    fileName: '1.txt',
    fileSize: 1000
  },
  {
    fileName: '2.txt',
    fileSize: 3000
  },
  {
    fileName: '3.txt',
    fileSize: 5000
  }
]);

startUpload('flash',[
  {
    fileName: '4.txt',
    fileSize: 1000
  },
  {
    fileName: '5.txt',
    fileSize: 3000
  },
  {
    fileName: '6.txt',
    fileSize: 6000
  }
]);
