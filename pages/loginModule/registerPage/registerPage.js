import regular from "../../../utils/regular"
import esRequest from "../../../utils/esRequest"
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    state: '',
    userName: '',
    password: '',
    password2: '',
    newPassword: '',
    nickName: '',
    gender: '',
    avatarUrl: '',
  },

  onLoad: function (options) {
    this.setData({
      state: options.state ? options.state : '0'
    })
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

  // 再次输入密码
  inputPassword2: function (event) {
    this.setData({
      password2: event.detail.value
    })
  },

  // 请输入新密码
  inputPassword3: function (event) {
    this.setData({
      newPassword: event.detail.value
    })
  },

  // 授权 注册
  bindGetUserInfo: function (e) {
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      Toast.fail('未授权')
      return
    } else {
      this.data.nickName = e.detail.userInfo.nickName
      this.data.gender = e.detail.userInfo.gender.toString(),
      this.data.avatarUrl = e.detail.userInfo.avatarUrl
    }
    if (!this.data.userName) {
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
      if (!this.data.newPassword) {
        Toast.fail('请输入新密码')
        return
      }
    }
    if (!regular.APNumber(this.data.userName)) {
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
        userName: this.data.userName,
        state: '0'
      }
      esRequest('is_register', data).then(res => {
        let data2 = {
          userName: this.data.userName,
          password: this.data.password,
          nickName: this.data.nickName,
          gender: this.data.gender,
          avatarUrl: this.data.avatarUrl
        }
        if (res && res.data.code == 0) {
          esRequest('register_inster', data2).then(res => {
            if (res && res.data.code == 0) {
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
        } else {
          Toast.fail(res.data.msg)
        }
      })
    }
    if (this.data.state == '1') {
      let data1 = {
        userName: this.data.userName,
        state: '1'
      }
      esRequest('is_register', data1).then(res => {
        if (res && res.data.code == 0) {
          this.data.id = res.data.data.id
          let data2 = {
            id: res.data.data.id,
            userName: this.data.userName,
            password: this.data.password,
          }
          esRequest('change_password', data2).then(res => {
            if (res && res.data.code == 0) {
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