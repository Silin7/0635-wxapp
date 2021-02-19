import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    type_id: '',
    storyList: []
  },

  onLoad: function (options) {
    if (options.id) {
      this.setData({
        type_id: options.id
      })
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getStoryList()
  },

  // 获取段子列表
  getStoryList: function () {
    let data = {
      type_id: this.data.type_id
    }
    esRequest('story_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          storyList: res.data.data
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
    wx.previewImage({
      // 当前显示图片的http链接
      current: current,
      // 需要预览的图片http链接列表
      urls: urls
    })
  },

  // 保存视频到相册
  saveVideo: function (e) {
    let _this = this
    let videoUrl = e.currentTarget.dataset.url
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success () {
              _this.downloadVideo(videoUrl)
            }
          })
        } else {
          _this.downloadVideo(videoUrl)
        }
      }
    })
  },
  downloadVideo: function (videoUrl) {
    Dialog.confirm({
      title: '保存',
      message: '确定要保存视频到相册嘛?',
    }).then(() => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      console.log('videoUrl', videoUrl)
      wx.downloadFile({
        url: videoUrl,
        success: function (downloadRes) {
          console.log('downloadRes.tempFilePath', downloadRes.tempFilePath)
          wx.saveVideoToPhotosAlbum({
            filePath: downloadRes.tempFilePath,
            success: function (saveRes) {
              console.log('saveRes', saveRes)
              Toast.success('保存成功')
            },
            fail: function (saveErr) {
              console.log('saveErr', saveErr)
              Toast.success('保存失败')
            }
          })
        },
        fail: function(downloadErr) {
          console.log('downloadErr', downloadErr)
          Toast.success('系统错误')
        }
      })
    }).catch(() => {
      Toast.success('取消')
    });
  }
})