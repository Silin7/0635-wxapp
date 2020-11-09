import regular from "../../../utils/regular"
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    userName: '',
    password: '',
  },

  onLoad: function (options) {
  },

  // 账号
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
    if (!this.data.userName) {
      Toast.fail('请输入账号')
      return
    }
    if (!this.data.password) {
      Toast.fail('请输入密码')
      return
    }
    if (!regular.APNumber(this.data.userName)) {
      Toast.fail('账号格式错误')
      return
    }
    if (!regular.APNumber(this.data.password)) {
      Toast.fail('密码格式错误')
      return
    }
    console.log(this.data)
  },

  // 注册
  to_register: function () {
    wx.redirectTo({
      url: '/pages/loginModule/registerPage/registerPage'
    })
  }

})