Page({
  data: {
    wallportraitType: [
      { id: '1001', name: '女生头像', image: 'http://121.89.215.228/0635-files/wallportraitType/1001.jpg' },
      { id: '1002', name: '男生头像', image: 'http://121.89.215.228/0635-files/wallportraitType/1002.jpg' },
      { id: '1003', name: '情侣头像', image: 'http://121.89.215.228/0635-files/wallportraitType/1003.jpg' },
      { id: '1004', name: '闺蜜头像', image: 'http://121.89.215.228/0635-files/wallportraitType/1004.jpg' },
      { id: '1005', name: '萌系头像', image: 'http://121.89.215.228/0635-files/wallportraitType/1005.jpg' },
      { id: '1006', name: '沙雕头像', image: 'http://121.89.215.228/0635-files/wallportraitType/1006.jpg' },
      { id: '1007', name: '动漫头像', image: 'http://121.89.215.228/0635-files/wallportraitType/1007.jpg' },
      { id: '1008', name: '其他分类', image: 'http://121.89.215.228/0635-files/wallportraitType/1008.jpg' }
    ]
  },

  // 头像系列
  wallportraitSeries: function (e) {
    wx.navigateTo({
      url: '/pages/pictureModule/wallportraitSeries/wallportraitSeries?id=' + e.currentTarget.dataset.item.id + '&name=' +  e.currentTarget.dataset.item.name
    })
  }
})