// import esRequest from '../../../utils/esRequest';
// import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
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
    // 景点
    if (e.currentTarget.dataset.item.id === 'icon01') {
      wx.navigateTo({
        url: '/pages/scenicModule/scenicList/scenicList'
      })
    }
    // 历史
    if (e.currentTarget.dataset.item.id === 'icon02') {
      wx.navigateTo({
        url: '/pages/historyModule/historyList/historyList'
      })
    }
    // 特产
    if (e.currentTarget.dataset.item.id === 'icon03') {
      wx.navigateTo({
        url: '/pages/specialtyModule/specialtyList/specialtyList'
      })
    }
    // 社交
    if (e.currentTarget.dataset.item.id === 'icon04') {
      wx.navigateTo({
        url: '/pages/marryModule/bindList/bindList'
      })
    }
  },

  // 活动
  appointmentList: function () {
    wx.navigateTo({
      url: '/pages/appointmentModule/appointmentList/appointmentList'
    })
  },

  // 头像
  wallportraitType: function () {
    wx.navigateTo({
      url: '/pages/pictureModule/wallportraitType/wallportraitType'
    })
  },

  // 壁纸
  wallpaperType: function () {
    wx.navigateTo({
      url: '/pages/pictureModule/wallpaperType/wallpaperType'
    })
  },

  // 文案
  wallwritingType: function () {
    wx.navigateTo({
      url: '/pages/pictureModule/wallwritingType/wallwritingType'
    })
  },

  // 笑话
  storyList01: function () {
    wx.navigateTo({
      url: '/pages/happyModule/storyList/storyList?id=01'
    })
  },

  // 图片
  storyList02: function () {
    wx.navigateTo({
      url: '/pages/happyModule/storyList/storyList?id=02'
    })
  },

  // 视频
  storyList03: function () {
    wx.navigateTo({
      url: '/pages/happyModule/storyList/storyList?id=03'
    })
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
  }
})
