Page({

  data: {
    active: 0,
    icon: {
      home_normal: '/images/homeMoudle/home_normal.png',
      home_active: '/images/homeMoudle/home_active.png',
      compass_normal: '/images/homeMoudle/compass_normal.png',
      compass_active: '/images/homeMoudle/compass_active.png',
      release_normal: '/images/homeMoudle/release_normal.png',
      release_active: '/images/homeMoudle/release_active.png',
      news_normal: '/images/homeMoudle/news_normal.png',
      news_active: '/images/homeMoudle/news_active.png',
      mine_normal: '/images/homeMoudle/mine_normal.png',
      mine_active: '/images/homeMoudle/mine_active.png',
    },
  },

  onChange(event) {
    this.setData({ active: event.detail });
  },

  onLoad: function (options) {

  },
  
  onReady: function () {

  },
  
  onShow: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  }
})