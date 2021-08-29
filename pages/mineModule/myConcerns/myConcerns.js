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
    if (options.type == '01') {
      wx.setNavigationBarTitle({
        title: '我的喜欢'
      })
      this.setData({
        dialogTitle: '取消喜欢',
        dialogText: '您确定要取消喜欢此用户吗?',
      })
      this.getConcernsList()
    }
    if (options.type == '02') {
      wx.setNavigationBarTitle({
        title: '我的关注'
      })
      this.setData({
        dialogTitle: '取消关注',
        dialogText: '您确定要取消关注此用户吗?',
      })
      this.getCollectionList()
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 我的喜欢
  getConcernsList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
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

  // 我的喜欢触底函数
  onScrollBottom1: function () {
    if (this.data.totalCount > this.data.concernsList.length) {
      this.data.page += 1
      this.getConcernsList()
    }
  },

  // 取消喜欢
  cancelFollow: function (e) {
    this.setData({ dialogShow: true })
    this.data.parameterDate = {
      watched_id: e.currentTarget.dataset.item.watched_id
    }
  },

  // 我的喜欢触底函数
  onScrollBottom2: function () {
    if (this.data.totalCount > this.data.collectionList.length) {
      this.data.page += 1
      this.getCollectionList()
    }
  },

  // 我的关注
  getCollectionList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
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

  // 取消关注
  cancelCollection: function (e) {
    this.setData({ dialogShow: true })
    this.data.parameterDate = {
      user_id: e.currentTarget.dataset.item.user_id
    }
  },

  // 取消喜欢/关注 确定按钮
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      // 取消喜欢
      if (this.data.type == '01') {
        esRequest('cancel_users', this.data.parameterDate).then(res => {
          if (res && res.data.code === 0) {
            wx.setStorageSync('tp_key', '04')
            Toast.success('操作成功')
            this.setData({ concernsList: [] })
            this.getConcernsList()
          } else {
            Toast.fail('系统错误')
          }
        })
      }
      // 取消关注
      if (this.data.type == '02') {
        esRequest('cancel_collection', this.data.parameterDate).then(res => {
          if (res && res.data.code === 0) {
            wx.setStorageSync('tp_key', '05')
            Toast.success('操作成功')
            this.setData({ collectionList: [] })
            this.getCollectionList()
          } else {
            Toast.fail('系统错误')
          }
        })
      }
    }
  },
  
  // 跳转到喜欢的人详情
  myConcerns: function (e) {
    wx.navigateTo({
      url: '/pages/marryModule/marryDetails/marryDetails?id=' + e.currentTarget.dataset.item.watched_id
    })
  },

  // 跳转到关注的人详情
  myCollection: function (e) {
    wx.navigateTo({
      url: '/pages/dynamicModule/dynamicList/dynamicList?authorId=' + e.currentTarget.dataset.item.user_id
    })
  }
})