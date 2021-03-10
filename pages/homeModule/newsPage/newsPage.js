import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    loginShow: false,
    windowWidth: 0,
    windowHeight: 0,
    messageTab: 0,
    totalCount: 0,
    page: 1,
    limit: 10,
    perMessageNo: false,
    perMessageList: [],
    sysMessageNo: false,
    sysMessageList: [],
    triggered: true,
    parameterDate: {},
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (options) {
    if (wx.getStorageSync('id_key')) {
      this.data.id_key = wx.getStorageSync('id_key').toString()
      this.getPerMessage()
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    if (!wx.getStorageSync('id_key')) {
      this.setData({
        loginShow: true
      })
    }
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.redirectTo({
      url: '/pages/loginModule/loginPage/loginPage',
    })
  },

  // 消息tabs切换
  messageTabChange: function (e) {
    this.data.messageTab = e.detail.index
    if (e.detail.index === 0) {
      this.setData({
        page: 1,
        limit: 10,
        totalCount: 0,
        perMessageList: []
      })
      this.getPerMessage()
    }
    if (e.detail.index === 1) {
      this.setData({
        page: 1,
        limit: 10,
        totalCount: 0,
        sysMessageList: []
      })
      this.getSysMessage()
    }
  },

  // 个人私信列表
  getPerMessage: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      receiver_id: this.data.id_key
    }
    return new Promise (async (resolve, reject) => {
      esRequest('permessage_list', data).then(res => {
        if (res && res.data.code === 0) {
          if (res.data.totalCount == 0) {
            this.setData({ perMessageNo: true })
          } else {
            this.setData({ perMessageNo: false })
          }
          this.setData({
            totalCount: res.data.totalCount,
            perMessageList: this.data.perMessageList.concat(res.data.data)
          })
        } else {
          Toast.fail('系统错误')
        }
      })
      resolve()
    })
  },

  // 删除个人私信
  permessageDelete: function (e) {
    this.setData({
      dialogShow: true
    })
    this.data.parameterDate = {
      id: e.currentTarget.dataset.item.id
    }
  },

  // 删除个人私信确定按钮
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      this.setData({
        page: 1,
        limit: 10,
        totalCount: 0,
        perMessageList: []
      })
      esRequest('permessage_delete', this.data.parameterDate).then(res => {
        if (res && res.data.code === 0) {
          Toast.success('操作成功')
          this.getPerMessage()
        } else {
          Toast.fail('系统错误')
        }
      })
    }
  },

  // 个人私信下拉刷新
  permessagerePull: function () {
    this.setData({
      page: 1,
      limit: 10,
      totalCount: 0,
      perMessageList: []
    })
    this.awaitPerMessage()
  },
  async awaitPerMessage () {
    await this.getPerMessage()
    Toast.success('刷新成功')
    this.setData({
      triggered: false
    })
  },

  // 个人私信触底函数
  onScrollBottom1: function () {
    if (this.data.totalCount > this.data.perMessageList.length) {
      this.data.page += 1
      this.getPerMessage()
    }
  },

  // 个人私信详情
  messageDetails: function (e) {
    wx.navigateTo({
      url: '/pages/dynamicModule/messageDetails/messageDetails?id=' + e.currentTarget.dataset.item.id
    })
  },

  // 系统消息列表
  getSysMessage: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      receiver_id: this.data.id_key
    }
    esRequest('sysmessage_list', data).then(res => {
      if (res && res.data.code === 0) {
        if (res.data.totalCount == 0) {
          this.setData({ sysMessageNo: true })
        } else {
          this.setData({ sysMessageNo: false })
        }
        this.setData({
          totalCount: res.data.totalCount,
          sysMessageList: this.data.sysMessageList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 系统消息触底函数
  onScrollBottom2: function () {
    if (this.data.totalCount > this.data.sysMessageList.length) {
      this.data.page += 1
      this.getSysMessage()
    }
  },

  // 系统消息详情
  messageSystem: function (e) {
    wx.navigateTo({
      url: '/pages/dynamicModule/advertisement/advertisement?id=' + e.currentTarget.dataset.item.id + '&type=2'
    })
  }

})