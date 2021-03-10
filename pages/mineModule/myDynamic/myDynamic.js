import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    dynamicPage: 1,
    dynamicLimit: 6,
    totalCount: 0,
    dynamicList: [],
    userInfo: {}
  },

  onLoad: function (options) {
    this.getDynamicList()
    if (wx.getStorageSync('userIfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userIfo')
      })
    } else {
      this.getMineInfo()
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 获取个人信息
  getMineInfo: function () {
    let data = {
      id: wx.getStorageSync('id_key')
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('userIfo', res.data.data)
        this.setData({
          userInfo: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 我的动态列表
  getDynamicList: function () {
    let data = {
      page: this.data.dynamicPage,
      limit: this.data.dynamicLimit,
      author_id: wx.getStorageSync('id_key').toString()
    }
    esRequest('my_dynamic_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          dynamicList: this.data.dynamicList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 我的动态触底函数
  onReachBottom: function () {
    if (this.data.totalCount > this.data.dynamicList.length) {
      this.data.dynamicPage += 1
      this.getDynamicList()
    }
  },

  // 我的动态详情
  dynamicDeatils: function (e) {
    let dynamicId = e.currentTarget.dataset.item.id
    let authorId = wx.getStorageSync('id_key').toString()
    wx.navigateTo({
      url: `/pages/dynamicModule/dynamicDeatils/dynamicDeatils?dynamicId=${dynamicId}&authorId=${authorId}`
    })
  }

})