Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function() {
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.navigateTo({
            url: '/pages/loginModule/phone/phone',
          });
        }
      }
    })
  },
  getUserInfo: function(e) {
    wx.setStorageSync('rawData', e.detail.rawData)
    wx.setStorageSync('signature', e.detail.signature)
    wx.setStorageSync('encryptedData', e.detail.encryptedData)
    wx.setStorageSync('iv', e.detail.iv)
    wx.setStorageSync('cloudID', e.detail.cloudID)
    wx.navigateTo({
      url: '/pages/loginModule/phone/phone',
    });
  }
})
