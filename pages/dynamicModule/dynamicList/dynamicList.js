import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: false,
    windowWidth: 0,
    windowHeight: 0,
    authorId: '',
    dynamicPage: 1,
    dynamicLimit: 6,
    totalCount: 0,
    dynamicNo: false,
    dynamicList: [],
    authorInfo: {},
    parameterDate: {},
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (options) {
    this.data.authorId = options.authorId ? options.authorId : ''
    this.getAuthorInfo()
    this.getDynamicList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 获取作者信息
  getAuthorInfo: function () {
    let data = {
      id: this.data.authorId
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code === 0) {
        this.setData({
          authorInfo: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 作者动态列表
  getDynamicList: function () {
    let data = {
      page: this.data.dynamicPage,
      limit: this.data.dynamicLimit,
      author_id: this.data.authorId
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

  // 作者动态触底函数
  onReachBottom: function () {
    if (this.data.totalCount > this.data.dynamicList.length) {
      this.data.dynamicPage += 1
      this.getDynamicList()
    }
  },

  // 点击关注
  collectionuser: function () {
    if (!wx.getStorageSync('id_key')) {
      this.setData({ loginShow: true })
    } else {
      this.setData({
        dialogShow: true
      })
    }
  },

  // 关注确定按钮
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      let data = {
        followers_id: wx.getStorageSync('id_key').toString(),
        user_id: this.data.authorInfo.id.toString(),
        user_name: this.data.authorInfo.nickName,
        user_image: this.data.authorInfo.avatarUrl,
        user_info: this.data.authorInfo.personalSignature,
      }
      esRequest('follow_collection', data).then(res => {
        if (res && res.data.code === 0) {
          wx.setStorageSync('tp_key', '05')
          Toast.success('已关注')
        } else {
          Toast.fail('系统错误')
        }
      })
    }
  },

  // 我的动态详情
  dynamicDeatils: function (e) {
    let dynamicId = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/dynamicModule/dynamicDeatils/dynamicDeatils?dynamicId=${dynamicId}&authorId=${this.data.authorId}`
    })
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.navigateTo({
      url: '/pages/loginModule/loginPage/loginPage'
    })
  }

})