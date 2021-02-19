Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    wallportraitType: [
      { id: '1001', name: '精选', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1002', name: '文字控', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1003', name: '帅哥型男', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1004', name: '美女佳人', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1005', name: '情侣专区', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1006', name: '可爱萌系', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1007', name: '明星写真', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1008', name: '卡通动漫', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1009', name: '影视精选', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1010', name: '体育竞技', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1011', name: '炫酷游戏', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1012', name: '神秘星座', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1013', name: '世界名车', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
      { id: '1014', name: '自然风光', image: 'http://121.89.215.228/birch-forest-media/wallportraitType/1004.jpg' },
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

  // 头像系列
  wallportraitSeries: function (e) {
    wx.navigateTo({
      url: '/pages/pictureModule/wallpaperSeries/wallpaperSeries?id=' + e.currentTarget.dataset.item.id + '&name=' +  e.currentTarget.dataset.item.name
    })
  }

})