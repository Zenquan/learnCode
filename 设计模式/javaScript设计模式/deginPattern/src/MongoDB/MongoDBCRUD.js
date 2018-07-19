/**
 * 查询选择器
 * 1.选择器匹配
 * db.collections.find({Object_id: ''});
 * 2.范围查询
 * db.collections.find({tag:'free'}, {price:{$lt:20}});
 * 3.集合操作符
 * db.collections.find()
 * 4.布尔操作符
 * db.products.find('details.color': {$in:['black','blue']})
 * 5.匹配子文档
 * db.users.find(address:{$eleMatch:{name:'home',state:'NY'}})
 * 6.限制子文档
 * 7.限制容量
 * db.users.find({tags:{$size:5}})
 * 8.函数
 * db.reviews.find({$where:"function(){return this.helpful_votes > 3;}"});
 * 9.正则表达式
 * db.reviews.find(/$a/)
 * 10.其他查询符
 * 
 * 查询选项
 * 1.投影
 * 2.排序
 * 3.skip和limit
 * 
 * 更新
 * 1.多文档更新
 * db.reviews.update{{ObjectId()},}
 * 2.upsert 不存在插入
 * 3.更新操作符
 */