
/* 此文件为js参数验证规则 */

// 手机号验证
var phoneNumber = function(phoneNumber) {
  if (!/^1[3456789]\d{9}$/.test(phoneNumber)) {
    return false
  } else {
    return true
  }
}
// 身份证验证
var IDNumber = function(IDNumber) {
  if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(IDNumber)) {
    return false
  } else {
    return true
  }
}

// 账号,密码验证 4到16位（字母，数字，下划线，减号）
var APNumber = function(phoneNumber) {
  if (!/^[a-zA-Z0-9_-]{4,16}$/.test(phoneNumber)) {
    return false
  } else {
    return true
  }
}

module.exports = {
  phoneNumber: phoneNumber,
  IDNumber: IDNumber,
  APNumber: APNumber
}