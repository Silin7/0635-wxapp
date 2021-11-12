import baseURL from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: '',
    windowWidth: 0,
    windowHeight: 0,
    autosize: {
      maxHeight: 200,
      minHeight: 150
    },
    dynamicContent: '',
    uploadImgs: [],
    userInfo: {},
    dialogType: '01',
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
    uploadedImgs: []
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
    if (!wx.getStorageSync('id_key')) {
      this.setData({
        loginShow: true
      })
    }
  },
  
  // 动态内容change
  contentChange: function (event) {
    this.setData({
      dynamicContent: event.detail
    });
  },

  // 图片上传完成
  afterRead: function (event) {
    event.detail.file.forEach(item => {
      this.data.uploadImgs.push(item)
    })
    this.setData({
      uploadImgs: this.data.uploadImgs
    })
  },

  // 删除已经上传的图片
  deleteImg: function (event) {
    this.data.uploadImgs.splice(event.detail.index, 1)
    this.setData({
      uploadImgs: this.data.uploadImgs
    })
  },

  // 发布动态
  releaseDynamic: function () {
    if (this.data.dynamicContent === '' && this.data.uploadImgs.length === 0) {
      Toast.fail('请填写内容')
      return
    }
    if (this.data.uploadImgs.length === 0) {
      this.setData({
        dialogType: '02',
        dialogShow: true
      });
    } else {
      this.setData({
        dialogType: '01',
        dialogShow: true
      });
    }
    if (wx.getStorageSync('userIfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userIfo')
      })
    } else {
      this.getMineInfo()
    }
  },

  // 发布确定按钮
  tapDialogButton: function (e) {
    let _this = this
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      if (_this.data.dialogType == '01') {
        _this.data.uploadImgs.forEach(item => {
          wx.uploadFile({ 
            url: baseURL.baseURL + '/system/upload_files',
            header: {
              author_id: wx.getStorageSync('id_key').toString(),
              file_path: 'dynamicModules'
            },
            filePath: item.url,
            name: 'file',
            formData: {},
            success: function (res) {
              _this.data.uploadedImgs.push(res.data)
              if (_this.data.uploadImgs.length === _this.data.uploadedImgs.length) {
                _this.saveDynamic()
              }
            }
          });
        })
      }
      if (_this.data.dialogType == '02') {
        _this.saveDynamic()
      }
    }
  },

  // 发布接口存入数据库
  saveDynamic: function () {
    let data = {
      author_id: wx.getStorageSync('id_key').toString(),
      author_name: this.data.userInfo.nick_name,
      author_avatar: this.data.userInfo.avatar_url,
      content: this.data.dynamicContent,
      images: this.data.uploadedImgs.join(',')
    }
    esRequest('dynamic_release', data).then(res => {
      if (res && res.data.code === 0) {
        Toast.success('发布成功')
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 本人信息
  getMineInfo: function () {
    esRequest('mine_info').then(res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('userIfo', res.data.data)
        this.data.userInfo = res.data.data
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.redirectTo({
      url: '/pages/loginModule/loginPage/loginPage',
    })
  }
})