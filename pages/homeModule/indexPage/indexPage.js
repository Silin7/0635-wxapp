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
        url: '/pages/scenicModule/scenicList/scenicList',
      })
    }
    if (e.currentTarget.dataset.item.id === 'icon02') {
      wx.navigateTo({
        url: '/pages/historyModule/historyList/historyList',
      })
    }
  }
})