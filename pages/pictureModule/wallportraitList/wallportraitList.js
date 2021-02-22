import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    series_id: '',
    series_name: '',
    seriesPage: '1',
    seriesLimit: '10',
    seriesList: []
  },

  onLoad: function (options) {
    if (options.id) {
      this.data.series_id = options.id
    }
    if (options.name) {
      this.setData({
        series_name: options.name
      })
    }
    this.wallportraitList()
  },

  onReady: function () {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
  },

  // 头像系列
  wallportraitList: function () {
    let data = {
      page: this.data.seriesPage,
      limit: this.data.seriesLimit,
      series_id: this.data.series_id
    }
    esRequest('wallportrait_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          seriesList: this.data.seriesList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.seriesList.length) {
      this.data.seriesPage += 1
      this.wallportraitList()
    }
  },
  
  // 点击保存图片
  savePicture: function (e) {
    let urls = []
    let current = e.currentTarget.dataset.img
    urls.push(current)
    wx.previewImage({
      // 当前显示图片的http链接
      current: current,
      // 需要预览的图片http链接列表
      urls: urls
    })
  }
})