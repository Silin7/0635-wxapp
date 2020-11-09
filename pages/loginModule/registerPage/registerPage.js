import regular from "../../../utils/regular"
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

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
    if (!this.data.userName) {
      Toast.fail('请输入用户名')
      return
    }
    if (!this.data.password) {
      Toast.fail('请输入密码')
      return
    }
    // 用户名,密码应为4到16位的字母，数字，下划线组成
    if (!regular.APNumber(this.data.userName)) {
      Toast.fail('用户名格式不正确')
      return
    }
    if (!regular.APNumber(this.data.password)) {
      Toast.fail('密码格式不正确')
      return
    }
    console.log(this.data)
  },

})