Page({

  data: {
    active: 0,
    icon: {
      // normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      normal: '/images/homeMoudle/home.png',
      active: '/images/homeMoudle/home(5).png',
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