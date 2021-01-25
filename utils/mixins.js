/* 此文件为js参数做处理 */

// 时间戳转日期
// date: 时间戳
// type: 返回日期格式类型 01:YYYY, 02:YYYY-MM, 03:YYYY-MM-DD, 04:YYYY-MM-DD hh, 05:YYYY-MM-DD hh-mm, 06:YYYY-MM-DD hh-mm-ss, 07:YYYY年MM月DD日 默认: 03, 可不传
// connector: 连接符 默认: '-', 可不传
var formatDate = function (date, type, connector) {
  var date = new Date(date);
  var YY = date.getFullYear();
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  if (!type) {
    type = '03'
  }
  if (!connector) {
    connector = '-'
  }
  if (type === '01') {
    return YY;
  }
  if (type === '02') {
    return YY + connector +  MM;
  }
  if (type === '03') {
    return YY + connector +  MM + connector +  DD;
  }
  if (type === '04') {
    return YY + connector +  MM + connector +  DD + " " + hh;
  }
  if (type === '05') {
    return YY + connector +  MM + connector +  DD + " " + hh + ':' + mm;
  }
  if (type === '06') {
    return YY + connector +  MM + connector +  DD + " " + hh + ':' + mm + ':' + ss;
  }
  if (type === '07') {
    return YY + '年' +  MM + '月' +  DD + '日';
  }
  if (type === '08') {
    return YY + '年' +  MM + '月' +  DD + '日' + ' ' + hh + '点' +  mm + '分';
  }
}

// 根据出生日期算出年龄（周岁）
// data：生日，格式：YYYY-MM-DD
var getAge = function (data) {
  var returnAge;
  var strBirthdayArr = data.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  if (nowYear == birthYear) {
    //同年 则为0岁
    returnAge = 0;
  } else {
    // 年之差
    var ageDiff = nowYear - birthYear;
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        // 日之差
        var dayDiff = nowDay - birthDay;
        if(dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff ;
        }
      } else {
        // 月之差
        var monthDiff = nowMonth - birthMonth;
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff ;
        }
      }
    } else {
      // 返回-1, 表示出生日期输入错误 晚于今天
      returnAge = -1;
    }
  }
  return returnAge;
}

module.exports = {
  formatDate: formatDate,
  getAge: getAge,
}