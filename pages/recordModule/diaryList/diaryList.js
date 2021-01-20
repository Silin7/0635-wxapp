import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    diaryList: []
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
    this.diaryList()
  },

  // 日记列表
  diaryList: function () {
    let data = {
      user_id: this.data.id_key
    }
    esRequest('record_diary', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          diaryList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 日记详情
  diaryDetails: function (e) {
    wx.navigateTo({
      url: '/pages/recordModule/keepDiary/keepDiary?type=01&id=' + e.currentTarget.dataset.item.id
    })
  },

  // 写日记
  keepDiary: function () {
    wx.navigateTo({
      url: '/pages/recordModule/keepDiary/keepDiary'
    })
  }

})