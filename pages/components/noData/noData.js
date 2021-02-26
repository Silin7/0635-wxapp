Page({

  data: {
    windowWidth: 0,
    windowHeight: 0
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  }
})