import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    swiperList: [],
    personDetails: {}
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key')
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.marryDetails()
  },

  // 点击首页轮播图
  swiperTap: function (e) {
    wx.previewImage({
      // 当前显示图片的http链接
      current: e.currentTarget.dataset.item,
      // 需要预览的图片http链接列表
      urls: this.data.swiperList
    })
  },

  // 基本信息
  marryDetails: function () {
    let data = {
      user_id: '100001'
    }
    esRequest('marry_details', data).then(res => {
      if (res && res.data.code === 0) {
        this.data.swiperList = []
        this.data.swiperList.push(res.data.data.photo1)
        this.data.swiperList.push(res.data.data.photo2)
        this.data.swiperList.push(res.data.data.photo3)
        this.setData({
          swiperList: this.data.swiperList,
          personDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // xxx
  xxx: function (e) {
    console.log(e.currentTarget.dataset.xxx)
  }

})