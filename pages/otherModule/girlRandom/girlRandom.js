import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    isAuthSavePhoto: false, 
    windowWidth: 0,
    windowHeight: 0,
    photoUrl: '',
    photoList: [],
    imageList: []
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
    this.girlRandom()
  },

  onShow: function () {
  },

  // 随机获取美女福利图片
  girlRandom: function () {
    this.setData({
      photoList: [],
      imageList: []
    })
    esRequest('girl_random').then(res => {
      if (res && res.data.code == 1) {
        res.data.data.forEach(item => {
          this.data.photoList.push(item.imageUrl)
        })
        this.setData({
          imageList: res.data.data,
          photoList: this.data.photoList
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 查看大图或保存图片
  bPicture: function (e) {
    this.data.photoUrl = e.currentTarget.dataset.item.imageUrl
    wx.previewImage({
      // 当前显示图片的http链接
      current: this.data.photoUrl,
      // 需要预览的图片http链接列表
      urls: this.data.photoList
    })
  },

  // 换一批
  refreshBtn: function () {
    wx.redirectTo({
      url: '/pages/otherModule/girlRandom/girlRandom',
    })
  }

})