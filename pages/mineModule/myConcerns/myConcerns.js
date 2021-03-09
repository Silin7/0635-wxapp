import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    type: '',
    windowWidth: 0,
    windowHeight: 0,
    page: 1,
    limit: 10,
    totalCount: 0,
    concernsList: [],
    collectionList: [],
    parameterDate: {},
    dialogTitle: '',
    dialogText: '',
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
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
      this.setData({
        dialogTitle: '取消关注',
        dialogText: '您确定要取消关注此用户吗?',
      })
      this.getConcernsList()
    }
    if (this.data.type == '02') {
      wx.setNavigationBarTitle({
        title: '我的收藏'
      })
      this.setData({
        dialogTitle: '取消收藏',
        dialogText: '您确定要取消收藏此菜谱吗?',
      })
      this.getCollectionList()
    }
  },

  // 我的关注
  getConcernsList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      followers_id: wx.getStorageSync('id_key').toString()
    }
    esRequest('concerns_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          concernsList: this.data.concernsList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 我的关注触底函数
  onScrollBottom1: function () {
    if (this.data.totalCount > this.data.concernsList.length) {
      this.data.page += 1
      this.getConcernsList()
    }
  },

  // 取消关注
  cancelFollow: function (e) {
    this.setData({ dialogShow: true })
    this.data.parameterDate = {
      followers_id: e.currentTarget.dataset.item.followers_id,
      watched_id: e.currentTarget.dataset.item.watched_id
    }
  },

  // 我的收藏
  getCollectionList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      followers_id: wx.getStorageSync('id_key').toString()
    }
    esRequest('collection_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          collectionList: this.data.collectionList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 我的关注触底函数
  onScrollBottom2: function () {
    if (this.data.totalCount > this.data.collectionList.length) {
      this.data.page += 1
      this.getCollectionList()
    }
  },

  // 取消收藏
  cancelCollection: function (e) {
    this.setData({ dialogShow: true })
    this.data.parameterDate = {
      followers_id: e.currentTarget.dataset.item.followers_id,
      menu_id: e.currentTarget.dataset.item.menu_id
    }
  },

  // 取消关注/收藏 确定按钮
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      // 取消关注
      if (this.data.type == '01') {
        esRequest('cancel_users', this.data.parameterDate).then(res => {
          if (res && res.data.code === 0) {
            wx.setStorageSync('tp_key', '04')
            Toast.success('操作成功')
            this.getConcernsList()
          } else {
            Toast.fail('系统错误')
          }
        })
      }
      // 取消收藏
      if (this.data.type == '02') {
        esRequest('cancel_collection', this.data.parameterDate).then(res => {
          if (res && res.data.code === 0) {
            wx.setStorageSync('tp_key', '05')
            Toast.success('操作成功')
            this.getCollectionList()
          } else {
            Toast.fail('系统错误')
          }
        })
      }
    }
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