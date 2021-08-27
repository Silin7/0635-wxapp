import regular from "../../../utils/regular"
import esRequest from "../../../utils/esRequest"
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    state: '',
    user_name: '',
    password: '',
    password2: '',
    new_password: '',
    nick_name: '',
    gender: '',
    avatar_url: '',
  },

  onLoad: function (options) {
    this.setData({
      state: options.state ? options.state : '0'
    })
  },

  // 账号
  inputName: function (event) {
    this.setData({
      user_name: event.detail.value
    })
  },

  // 密码
  inputPassword: function (event) {
    this.setData({
      password: event.detail.value
    })
  },

  // 再次输入密码
  inputPassword2: function (event) {
    this.setData({
      password2: event.detail.value
    })
  },

  // 请输入新密码
  inputPassword3: function (event) {
    this.setData({
      new_password: event.detail.value
    })
  },

  // 授权 注册
  bindGetUserInfo: function (e) {
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      Toast.fail('未授权')
      return
    } else {
      this.data.nick_name = e.detail.userInfo.nickName
      this.data.gender = e.detail.userInfo.gender.toString(),
      this.data.avatar_url = e.detail.userInfo.avatarUrl
    }
    if (!this.data.user_name) {
      Toast.fail('请输入账号')
      return
    }
    if (!this.data.password) {
      Toast.fail('请输入密码')
      return
    }
    if (this.data.state == '0') {
      if (!this.data.password2) {
        Toast.fail('请再次输入密码')
        return
      }
    }
    if (this.data.state == '1') {
      if (!this.data.new_password) {
        Toast.fail('请输入新密码')
        return
      }
    }
    if (!regular.APNumber(this.data.user_name)) {
      Toast.fail('账号格式错误')
      return
    }
    if (!regular.APNumber(this.data.password)) {
      Toast.fail('密码格式错误')
      return
    }
    if (this.data.state == '0') {
      if (this.data.password !== this.data.password2) {
        Toast.fail('密码不一致')
        return
      }
    }
    if (this.data.state == '0') {
      let data = {
        user_name: this.data.user_name,
        password: this.data.password,
        nick_name: this.data.nick_name,
        gender: this.data.gender,
        avatar_url: this.data.avatar_url
      }
      esRequest('register_inster', data).then(res => {
        if (res && res.data.code === 0) {
          Toast.success('注册成功')
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/loginModule/loginPage/loginPage'
            })
          }, 2000)
        } else {
          Toast.fail(res.data.msg)
        }
      })
    }
    if (this.data.state == '1') {
      let data = {
        user_name: this.data.user_name,
        password: this.data.password,
        new_password: this.data.new_password
      }
      esRequest('change_password', data).then(res => {
        if (res && res.data.code === 0) {
          Toast.success('修改成功')
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/loginModule/loginPage/loginPage'
            })
          }, 2000)
        } else {
          Toast.fail(res.data.msg)
        }
      })
    }
  },

  // 去登录
  to_login: function () {
    wx.redirectTo({
      url: '/pages/loginModule/loginPage/loginPage'
    })
  }

})