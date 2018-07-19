function getWeek(str) {
  // 将字符串转为标准时间格式
	str = Date.parse(str);
	str = new Date(str);
  // 先计算出该日期为第几周
	let week = Math.ceil(str.getDate()/7);
	let month = str.getMonth() + 1;
  // 判断这个月前7天是周几，如果不是周一，则计入上个月
	if  (str.getDate() < 7) {
		if (str.getDay() !== 1) {
			week = 5;
			month = str.getMonth();
		}
	}
	console.log(`${month}-${week}`);
}

// 测试
getWeek('2016-09-01');
getWeek('2016-02-01');
getWeek('2016-09-15');
