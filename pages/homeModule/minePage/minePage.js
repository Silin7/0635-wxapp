import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    mineDataForm: {}
  },

  onLoad: function (options) {
    this.setData({
      id_key: wx.getStorageSync('id_key')
    })
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getMineInfo()
  },

  // 获取个人信息
  getMineInfo: function () {
    let data = {
      id: this.data.id_key
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code === 0) {
        this.setData({
          mineDataForm: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 我的关注
  myConcerns: function () {
    wx.navigateTo({
      url: '/pages/mineModule/myConcerns/myConcerns',
    })
  },
  
  // 编辑个人资料
  personalData: function () {
    let id = this.data.id_key.toString()
    id = id.substr(1)
    wx.navigateTo({
      url: '/pages/mineModule/personalData/personalData?id=' + id,
    })
  }
})