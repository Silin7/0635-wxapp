Page({
  data: {
    pageIndex: 0,
    windowWidth: 0,
    windowHeight: 0,
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  onShow: function () {
  },

  changeTabs(event) {
    this.setData({
      pageIndex: event.detail.index
    })
  },

})