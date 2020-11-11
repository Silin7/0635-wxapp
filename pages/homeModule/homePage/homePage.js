// "navigationBarBackgroundColor": "#C7C7FE",
Page({
  data: {
    windowHeight: 0,
    swiperList: [
      { id: 'swiper01', image: '/images/homeMoudle/swiper_01.jpg' },
      { id: 'swiper02', image: '/images/homeMoudle/swiper_02.jpg' },
      { id: 'swiper03', image: '/images/homeMoudle/swiper_03.jpg' }
    ],
    iconList: [
      { name: '聊城景区', image: '/images/homeMoudle/icon_lx.jpg', id: 'icon01' },
      { name: '聊城美食', image: '/images/homeMoudle/icon_ms.jpg', id: 'icon02' },
      { name: '解压游戏', image: '/images/homeMoudle/icon_yx.jpg', id: 'icon03' },
      { name: '暂未开通', image: '/images/homeMoudle/icon_dd.jpg', id: 'icon04' },
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
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
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