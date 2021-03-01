import regular from "../../../utils/regular"
import esRequest from "../../../utils/esRequest"
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    userName: '',
    password: '',
  },

  onShow: function (options) {
    // Toast.fail('请先登录')
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
  signIn: function () {
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
    esRequest('sign_in', this.data).then(res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('tp_key', '01')
        wx.setStorageSync('id_key', res.data.data.id)
        Toast.success('登录成功')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/homeModule/indexPage/indexPage'
          })
        }, 2000)
      } else {
        Toast.fail(res.data.msg)
      }
    })
  },

  // 注册
  to_register: function () {
    wx.redirectTo({
      url: '/pages/loginModule/registerPage/registerPage'
    })
  },

  // 修改密码
  changePassword: function () {
    wx.redirectTo({
      url: '/pages/loginModule/registerPage/registerPage?state=1'
    })
  }

})