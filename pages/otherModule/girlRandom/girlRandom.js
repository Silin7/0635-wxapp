import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    isAuthSavePhoto: false, 
    windowWidth: 0,
    windowHeight: 0,
    imageList: [],
    photoUrl: '',
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
    this.setData({
      photoUrl: e.currentTarget.dataset.item.imageUrl
    })
    Dialog.confirm({
      title: '保存到相册',
      message: '您确定要下载超清原图吗？',
    }).then(() => {
      // on confirm
      this.onSaveToPhone()
    }).catch(() => {
      // on cancel
    });
  },

  // 换一批
  refreshBtn: function () {
    wx.redirectTo({
      url: '/pages/otherModule/girlRandom/girlRandom',
    })
  },

  // 保存图片到手机
  onSaveToPhone() {
    this.getSetting().then((res) => {
      // 判断用户是否授权了保存到本地的权限
      if (!res.authSetting['scope.writePhotosAlbum']) {
        this.authorize().then(() => {
          this.savedownloadFile(this.data.photoUrl)
          this.setData({
            isAuthSavePhoto: false
          })
        }).catch(() => {
          wx.showToast({
            title: '您拒绝了授权',
            icon: 'none',
            duration: 1500
          })
          this.setData({
            isAuthSavePhoto: true
          })
        })
      } else {
        this.savedownloadFile(this.data.photoUrl)
      }
    })
  },
  //打开设置，引导用户授权
  onOpenSetting() {
    wx.openSetting({
      success:(res) => {
        console.log(res.authSetting)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.showToast({
            title: '您未授权',
            icon: 'none',
            duration: 1500
          })
          this.setData({// 拒绝授权
            isAuthSavePhoto: true
          })

        } else {// 接受授权
          this.setData({
            isAuthSavePhoto: false
          })
          this.onSaveToPhone() // 接受授权后保存图片

        }

      }
    })
   
  },
  // 获取用户已经授予了哪些权限
  getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          resolve(res)
        }
      })
    })
  },
  // 发起首次授权请求
  authorize() {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success: () => {
          resolve()
        },
        fail: res => { //这里是用户拒绝授权后的回调
          console.log('拒绝授权')
          reject()
        }
      })
    })
  },
  savedownloadFile(img) {
    this.downLoadFile(img).then((res) => {
      return this.saveImageToPhotosAlbum(res.tempFilePath)
    }).then(() => {      
    })
  },
  //单文件下载(下载文件资源到本地)，客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径。
  downLoadFile(img) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: img,
        success: (res) => {
          console.log('downloadfile', res)
          resolve(res)
        }
      })
    })
  },
  // 保存图片到系统相册
  saveImageToPhotosAlbum(saveUrl) {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: saveUrl,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            duration: 1000,
          })
          resolve()
        }
      })
    })
  },
  // 弹出模态框提示用户是否要去设置页授权
  showModal(){
    wx.showModal({
      title: '检测到您没有打开保存到相册的权限，是否前往设置打开？',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          this.onOpenSetting() // 打开设置页面          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})