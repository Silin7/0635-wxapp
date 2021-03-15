import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    id: '',
    seriesList: {}
  },

  onLoad: function (options) {
    if (options.id) {
      this.data.id = options.id
    }
    this.wallwritingList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 头像系列
  wallwritingList: function () {
    let data = {
      id: this.data.id
    }
    esRequest('wallwriting_list', data).then(res => {
      if (res && res.data.code === 0) {
        res.data.data.series_images = JSON.parse(res.data.data.series_images)
        this.setData({
          seriesList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  
  // 点击保存图片
  savePicture: function (e) {
    let urls = []
    let current = e.target.dataset.img
    urls.push(current)
    console.log(urls)
    wx.previewImage({
      // 当前显示图片的http链接
      current: current,
      // 需要预览的图片http链接列表
      urls: urls
    })
  }
})