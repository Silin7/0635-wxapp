import esRequest from "../../../utils/esRequest"

Page({
  data: {
    userPhone: '',
    openid: '',
    session_key: '',
    rawData: '',
    signature: ''
  },
  onLoad: function () {
    this.data.openid = wx.getStorageSync('openid')
    this.data.session_key = wx.getStorageSync('session_key')
    this.data.rawData = wx.getStorageSync('rawData')
    this.data.signature = wx.getStorageSync('signature')
  },
  // 获取手机号
  getPhoneNumber: function (e) {
    console.log(e)
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      let data = {
        sessionKey: this.data.session_key,
        rawData: this.data.rawData,
        signature: this.data.signature,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      }
      console.log(data)
    }
  }
})
