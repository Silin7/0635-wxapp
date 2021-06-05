import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    dynamicPage: 1,
    dynamicLimit: 6,
    totalCount: 0,
    dynamicNo: false,
    dynamicList: [],
    userInfo: {},
    parameterDate: {},
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
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
      author_id: wx.getStorageSync('id_key').toString(),
      is_pass: '02'
    }
    esRequest('my_dynamic_list', data).then(res => {
      if (res && res.data.code === 0) {
        if (res.data.totalCount == 0) {
          this.setData({ dynamicNo: true })
        } else {
          this.setData({ dynamicNo: false })
        }
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

  // 删除动态
  cancelDynamic: function (e) {
    this.setData({
      dialogShow: true,
    })
    this.data.parameterDate = {
      id: e.currentTarget.dataset.item.id,
      author_id: wx.getStorageSync('id_key').toString()
    }
  },

  // 删除动态确定按钮
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      esRequest('cancel_dynamic', this.data.parameterDate).then(res => {
        if (res && res.data.code === 0) {
          Toast.success('操作成功')
          this.setData({
            dynamicPage: 1,
            dynamicList: []
          })
          this.getDynamicList()
        } else {
          Toast.fail('系统错误')
        }
      })
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