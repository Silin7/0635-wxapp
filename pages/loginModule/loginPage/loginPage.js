import regular from "../../../utils/regular"

Page({
  data: {
    userName: '',
    password: '',
  },

  onLoad: function (options) {
  },

  // 用户名
  inputName: function (event) {
    this.setData({
      userName: event.detail.value
    })
  },

  // 密码
  inputPassword: function (event) {
    this.setData({
      password: event.detail.value
    })
  },

  // 登录
  sign_in: function () {
    if (!regular.APNumber(this.data.userName)) {
      wx.showToast({
        title: '用户名应为4到16位的字母，数字，下划线组成',
        icon: 'none',
        duration: 2000
      })
      return
    }
    console.log(this.data)
  },

})