import esRequest from './utils/esRequest';


App({
  onLaunch: function () {
    // 获取openid和session_key
    wx.login({
      success: (res) => {
        if (res.code) {
          let data = {
            appid: 'wx6fef8f853abfa20e',
            secret: '9a4bc1e1b91c5c905b0bca7c5d7a99e9',
            code: res.code,
            grant_type: 'authorization_code'
          }
          esRequest('wx_login', data).then(res => {
            if (res && res.errMsg === "request:ok") {
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('session_key', res.data.session_key)
            } else {
              console.warn('fail' + JSON.stringify(err))
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  globalData: {
    userInfo: null
  }
})