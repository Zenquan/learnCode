let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test/');
let db = mongoose.connection;
db.on('error', () => {
  console.error('连接失败');
});
db.once('open', () => {
  // do something
});


// 简单示例
let kittySchema = mongoose.Schema({
  name: String
});

let Kitten = mongoose.model('kitten', kittySchema);

let silence = new Kitten({name: 'silence'});

kittySchema.methods.speak = function() {
  console.log(this.name);
};

//
let UserSchema = new mongoose.Schema({
  username: { type: String },
  userpwd: { type: String },
  userage: { type: Number },
  logindate: { type: Date }
});

let User = mongoose.model(UserSchema);

function insert() {
  let user = new User({
    username: 'Treasure',
    userpwd: 'Sunshine',
    userage: '21',
    logindate: new Date()
  });

  user.save((err, res) => {
    if (err) {
      console.log(`Error:${err}`);      
    } else {
      console.log(`Res:${res}`);
    }
  });
}

function update() {
  let wherestr = {'username': 'Treasure'};
  let updatestr = {'userpwd' : '1234567'};
  User.update(wherestr, updatestr, (err, res) => {
    if (err) {
      console.log(`Error:${err}`);
    } else {
      console.log(`Res:${res}`);
    }
  });
}

function del() {
  let wherestr = {'username': 'Treasure'};
  User.remove(wherestr, (err, res) => {
    if (err) {
      console.log(`Error:${err}`);
    } else {
      console.log(`Res:${res}`);
    }
  });
}

function getByConditions() {
  let wherestr = {'username' : 'Treasure'};
  let opt = {'username': 1, '_id': 0};
  User.find(wherestr, (err, res) => {
    if (err) {
      console.log(`Error:${err}`);
    } else {
      console.log(`Res:${res}`);
    }
  });
}

/*eslint-disable*/
/*
    $or　　　　或关系

　　$nor　　　 或关系取反

　　$gt　　　　大于

　　$gte　　　 大于等于

　　$lt　　　　 小于

　　$lte　　　  小于等于

　　$ne            不等于

　　$in             在多个值范围内

　　$nin           不在多个值范围内

　　$all            匹配数组中多个值

　　$regex　　正则，用于模糊查询

　　$size　　　匹配数组大小

　　$maxDistance　　范围查询，距离（基于LBS）

　　$mod　　   取模运算

　　$near　　　邻域查询，查询附近的位置（基于LBS）

　　$exists　　  字段是否存在

　　$elemMatch　　匹配内数组内的元素

　　$within　　范围查询（基于LBS）

　　$box　　　 范围查询，矩形范围（基于LBS）

　　$center       范围醒询，圆形范围（基于LBS）

　　$centerSphere　　范围查询，球形范围（基于LBS）

　　$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
*/

/* eslint-enable*/