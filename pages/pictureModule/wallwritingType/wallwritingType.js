Page({
  data: {
    wallportraitType: [
      { id: '1001', name: '人生', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1001.jpg' },
      { id: '1002', name: '励志', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1002.jpg' },
      { id: '1003', name: '可爱', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1003.jpg' },
      { id: '1004', name: '沙雕', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1005', name: '治愈', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1005.jpg' },
      { id: '1006', name: '文艺', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1006.jpg' },
      { id: '1007', name: '爱情', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1007.jpg' },
      { id: '1008', name: '其他', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1008.jpg' }
    ]
  },
  
  // 文案系列
  wallportraitSeries: function (e) {
    wx.navigateTo({
      url: '/pages/pictureModule/wallwritingSeries/wallwritingSeries?id=' + e.currentTarget.dataset.item.id + '&name=' +  e.currentTarget.dataset.item.name
    })
  }
})