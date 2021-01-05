Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    historyList: [
      { id: '1001', city: '' },
      { id: '1002', city: '茌平区' },
      { id: '1003', city: '临清市' },
      { id: '1004', city: '阳谷县' },
      { id: '1005', city: '东阿县' },
      { id: '1006', city: '高唐县' },
      { id: '1007', city: '冠县' },
      { id: '1008', city: '莘县' },
    ]
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

  // 历史详情
  historyDetails: function (e) {
    wx.navigateTo({
      url: '/pages/historyModule/historyDetails/historyDetails?cityId=' + e.currentTarget.dataset.id
    })
  }
})