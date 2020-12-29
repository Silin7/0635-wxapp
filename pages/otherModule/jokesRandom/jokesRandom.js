import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    jokesList: [],
    jokes: '',
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
    this.jokesRandom()
  },

  // 随机获取笑话列表
  jokesRandom: function () {
    esRequest('jokes_random').then(res => {
      if (res && res.data.code == 1) {
        this.setData({
          jokesList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 分享笑话
  shareJokes: function (e) {
    console.log(e.currentTarget.dataset.item)
    // this.setData({
    //   jokes: e.currentTarget.dataset.item.imageUrl
    // })
    Dialog.confirm({
      title: '分享给朋友',
      message: '分享给朋友',
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },

  // 换一批
  refreshBtn: function () {
    wx.redirectTo({
      url: '/pages/otherModule/jokesRandom/jokesRandom',
    })
  }
})