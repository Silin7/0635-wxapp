import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    imageList: [],
    picture: '',
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
    this.girlRandom()
  },

  // 随机获取美女福利图片
  girlRandom: function () {
    esRequest('girl_random').then(res => {
      if (res && res.data.code == 1) {
        this.setData({
          imageList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 下载图片
  bPicture: function (e) {
    console.log(e.currentTarget.dataset.item)
    // this.setData({
    //   picture: e.currentTarget.dataset.item.imageUrl
    // })
    Dialog.confirm({
      title: '保存到相册',
      message: '您确定要下载超清原图吗？',
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },

  // 换一批
  refreshBtn: function () {
    wx.redirectTo({
      url: '/pages/otherModule/girlRandom/girlRandom',
    })
  }
})