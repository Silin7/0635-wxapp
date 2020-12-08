import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    scenicId: '',
    scenicDetails: {},
    isFollow: '0'
  },
  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key')
    this.data.scenicId = options.id ? options.id : '2'
  },
  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  onShow: function () {
    this.getScenicSpot()
    this.isPunchClock()
  },
  // 景点详情
  getScenicSpot: function () {
    let data = {
      id: this.data.scenicId
    }
    esRequest('scenicspot_info', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          scenicDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 是否已打卡
  isPunchClock: function () {
    let data = {
      scenicSpot_id: this.data.scenicId,
      followers_id: this.data.id_key,
    }
    esRequest('is_follow_scenicspot', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          isFollow: res.data.type
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 打卡
  punchClock: function () {
    let data = {
      scenicSpot_id: this.data.scenicId,
      followers_id: this.data.id_key,
    }
    console.log(data)
    // is_follow_scenicspot
  },

})