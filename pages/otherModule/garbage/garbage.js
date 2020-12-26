import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    rubbishName: '塑料',
    aim: {},
    recommendList: [],
    flag: false
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
  },

  onChange(e) {
    this.setData({
      rubbishName: e.detail,
    })
  },

  // 垃圾分类
  getRubbish: function () {
    let data = {
      name: this.data.rubbishName
    }
    esRequest('rubbish', data).then(res => {
      if (res && res.data.code == 1) {
        this.setData({
          flag: true,
          aim: res.data.data.aim,
          recommendList: res.data.data.recommendList
        })
      } else if (res && res.data.code == 0) {
        this.setData({
          flag: false,
          msg: res.data.msg
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})