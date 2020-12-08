import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    scenicActive: 0,
    scenicspotPosition: '东昌府区',
    scenicSpotList: []
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
  // 切换Tabs
  scenicChange: function (e) {
    this.data.scenicspotPosition = e.detail.title
    console.log(this.data.scenicspotPosition)
    this.getScenicSpot()
  },
  // 景点列表
  getScenicSpot: function () {
    let data = {
      scenicspot_position: this.data.scenicspotPosition
    }
    esRequest('scenicspot_list', data).then(res => {
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