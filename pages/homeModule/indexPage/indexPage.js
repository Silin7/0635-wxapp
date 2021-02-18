// import esRequest from '../../../utils/esRequest';
// import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    swiperList: [
      { id: 'swiper01', image: '/images/homeModule/swiper_02.jpg' },
      { id: 'swiper02', image: '/images/homeModule/swiper_02.jpg' },
      { id: 'swiper03', image: '/images/homeModule/swiper_02.jpg' }
    ],
    iconList: [
      { name: '测试', image: '/images/homeModule/banner_xq.jpg', id: 'icon01' },
      { name: '测试', image: '/images/homeModule/banner_xq.jpg', id: 'icon02' },
      { name: '测试', image: '/images/homeModule/banner_xq.jpg', id: 'icon03' },
      { name: '测试', image: '/images/homeModule/banner_xq.jpg', id: 'icon04' },
    ]
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key').toString()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
  },

  // 点击首页轮播图
  swiperTap: function (e) {
    console.log(e.currentTarget.dataset.item)
  },

  // 第一栏导航
  oneNavBind: function (e) {
    if (e.currentTarget.dataset.item.id === 'icon01') {
      wx.navigateTo({
        url: '/pages/scenicModule/scenicList/scenicList'
      })
    }
    if (e.currentTarget.dataset.item.id === 'icon02') {
      wx.navigateTo({
        url: '/pages/historyModule/historyList/historyList'
      })
    }
    if (e.currentTarget.dataset.item.id === 'icon03') {
      wx.navigateTo({
        url: '/pages/specialtyModule/specialtyList/specialtyList'
      })
    }
    if (e.currentTarget.dataset.item.id === 'icon04') {
      wx.navigateTo({
        url: '/pages/marryModule/bindList/bindList'
      })
    }
  },

  // testBind1
  testBind1: function () {
    wx.navigateTo({
      url: '/pages/recipeModule/recipeList/recipeList'
    })
  },
  
  // testBind2
  testBind2: function () {
    wx.navigateTo({
      url: '/pages/recordModule/diaryList/diaryList'
    })
  },

  // testBind3
  testBind3: function () {
    wx.navigateTo({
      url: '/pages/otherModule/girlRandom/girlRandom'
    })
  },

  // testBind4
  testBind4: function () {
    wx.navigateTo({
      url: '/pages/otherModule/jokesRandom/jokesRandom'
    })
  },

  // testBind5
  testBind5: function () {
    wx.navigateTo({
      url: '/pages/otherModule/garbage/garbage'
    })
  },

  // testBind6
  testBind6: function () {
    wx.navigateTo({
      url: '/pages/otherModule/weather/weather'
    })
  },

  // testBind7
  testBind7: function () {
    wx.navigateTo({
      url: '/pages/otherModule/historyToday/historyToday'
    })
  },

  // testBind8
  testBind8: function () {
    wx.navigateTo({
      url: '/pages/pictureModule/wallportraitType/wallportraitType'
    })
  },

  // testBind9
  testBind9: function () {
    wx.navigateTo({
      url: '/pages/pictureModule/wallpaperType/wallpaperType'
    })
  },
})
