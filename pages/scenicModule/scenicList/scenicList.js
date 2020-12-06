import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    scenicSpotList: [],
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  onShow: function () {
    this.getScenicSpot()
  },
  // 景点列表
  getScenicSpot: function () {
    esRequest('scenicspot_list').then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          scenicSpotList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 消息详情
  scenicDetails: function (e) {
    wx.navigateTo({
      url: '/pages/scenicModule/scenicDetails/scenicDetails?id=' + e.currentTarget.dataset.item.id
    })
  },
})