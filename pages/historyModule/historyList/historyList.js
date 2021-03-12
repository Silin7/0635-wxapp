Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    historyList: [
      {type_id: '1001', type_name: '东昌府区'},
      {type_id: '1002', type_name: '阳谷县'},
      {type_id: '1003', type_name: '莘县'},
      {type_id: '1004', type_name: '茌平区'},
      {type_id: '1005', type_name: '东阿县'},
      {type_id: '1006', type_name: '冠县'},
      {type_id: '1007', type_name: '高唐县'},
      {type_id: '1008', type_name: '临清市'}
    ]
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 历史详情
  historyDetails: function (e) {
    wx.navigateTo({
      url: '/pages/historyModule/historyDetails/historyDetails?cityId=' + e.currentTarget.dataset.id
    })
  }
})