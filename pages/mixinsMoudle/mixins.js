// 时间戳转日期
// date: 时间戳
// type: 返回日期格式类型 01:YYYY, 02:YYYY-MM, 03:YYYY-MM-DD, 04:YYYY-MM-DD hh, 05:YYYY-MM-DD hh-mm, 06:YYYY-MM-DD hh-mm-ss, 07:YYYY年MM月DD日 默认: 03, 可不传
// connector: 连接符 默认: '-', 可不传
var formatDate = function (date, type, connector) {
  var date = new Date(date);
  var YY = date.getFullYear();
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
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
    return YY + connector +  MM + connector +  DD + " " + hh + mm;
  }
  if (type === '06') {
    return YY + connector +  MM + connector +  DD + " " + hh + mm + ss;
  }
  if (type === '07') {
    return YY + '年' +  MM + '月' +  DD + '日';
  }
}
// 手机号格式验证
var phoneNumber = function(phoneNumber) {
  if (!/^1[3456789]\d{9}$/.test(phoneNumber)) {
    return false
  } else {
    return true
  }
}
// 身份证格式验证
var IDNumber = function(IDNumber) {
  if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(IDNumber)) {
    return false
  } else {
    return true
  }
}

module.exports = {
  formatDate: formatDate,
  phoneNumber: phoneNumber,
  IDNumber: IDNumber,
}