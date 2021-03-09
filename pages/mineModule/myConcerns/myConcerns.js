import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    type: '',
    windowWidth: 0,
    windowHeight: 0,
    concernsList: [],
    collectionList: []
  },

  onLoad: function (options) {
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  onShow: function () {
    if (this.data.type == '01') {
      wx.setNavigationBarTitle({
        title: '我的关注'
      })
      this.getConcernsList()
    }
    if (this.data.type == '02') {
      wx.setNavigationBarTitle({
        title: '我的收藏'
      })
      this.getCollectionList()
    }
  },

  // 我的关注
  getConcernsList: function () {
    let data = {
      followers_id: wx.getStorageSync('id_key').toString()
    }
    esRequest('concerns_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          concernsList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 取消关注
  cancelFollow: function (e) {
    let data = {
      followers_id: e.currentTarget.dataset.item.followers_id,
      watched_id: e.currentTarget.dataset.item.watched_id
    }
    esRequest('cancel_users', data).then(res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('tp_key', '04')
        Toast.success('操作成功')
        this.getConcernsList()
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 我的收藏
  getCollectionList: function () {
    let data = {
      followers_id: wx.getStorageSync('id_key').toString()
    }
    esRequest('collection_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          collectionList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 取消收藏
  cancelCollection: function (e) {
    let data = {
      followers_id: e.currentTarget.dataset.item.followers_id,
      menu_id: e.currentTarget.dataset.item.menu_id
    }
    esRequest('cancel_collection', data).then(res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('tp_key', '05')
        Toast.success('操作成功')
        this.getCollectionList()
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 跳转到关注的人详情
  myConcerns: function (e) {
    wx.navigateTo({
      url: '/pages/marryModule/marryDetails/marryDetails?register_id=' + e.currentTarget.dataset.item.watched_id
    })
  },

  // 跳转到菜谱详情
  myCollection: function (e) {
    wx.navigateTo({
      url: '/pages/recipeModule/recipeDetail/recipeDetail?id=' + e.currentTarget.dataset.item.menu_id
    })
  }
})