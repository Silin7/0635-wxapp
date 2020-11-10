// "navigationBarBackgroundColor": "#C7C7FE",
Page({
  data: {
    windowHeight: 0,
    swiperList: [
      { id: '01', image: '/images/homeMoudle/swiper_01.jpg' },
      { id: '02', image: '/images/homeMoudle/swiper_02.jpg' },
      { id: '03', image: '/images/homeMoudle/swiper_03.jpg' },
      { id: '04', image: '/images/homeMoudle/swiper_04.jpg' },
      { id: '05', image: '/images/homeMoudle/swiper_05.jpg' }
    ],
    footerActive: 0,
    footerIcon: {
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
    this.setData({
      footerActive: event.detail
    })
    console.log(event.detail)
  },

  onLoad: function (options) {

  },
  
  onReady: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight
    this.setData({ windowHeight: windowHeight })
  },
  
  onShow: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  swiperTap: function (e) {
    console.log(e.currentTarget.dataset.item)
  }
})