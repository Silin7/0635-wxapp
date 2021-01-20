import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    messageTab: 0,
    perMessageList: [],
    sysMessageList: []
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
    this.getPerMessage()
    this.getSysMessage()
  },

  // 消息tabs切换
  messageTabChange: function (e) {
    this.data.messageTab = e.detail.index
  },

  // 个人私信列表
  getPerMessage: function () {
    let data = {
      receiver_id: this.data.id_key
    }
    esRequest('permessage_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          perMessageList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 系统消息列表
  getSysMessage: function () {
    let data = {
      receiver_id: this.data.id_key
    }
    esRequest('sysmessage_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          sysMessageList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 消息详情
  messageDetails: function (e) {
    wx.navigateTo({
      url: '/pages/messageModule/messageDetails/messageDetails?id=' + e.currentTarget.dataset.item.id + '&type=' + this.data.messageTab
    })
  }
})