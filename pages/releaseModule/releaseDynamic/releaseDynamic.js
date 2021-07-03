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
    this.data.uploadImgs.push(event.detail.file)
    this.setData({
      uploadImgs: this.data.uploadImgs
    })
  },

  // 删除已经上传的图片
  deleteImg: function () {
    this.setData({
      uploadImgs: []
    })
  },

  // 发布动态
  releaseDynamic: function () {
    if (this.data.dynamicContent == '' && this.data.uploadImgs.length == 0) {
      Toast.fail('请填写内容')
      return
    }
    if (this.data.uploadImgs.length == 0) {
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
        let filep = _this.data.uploadImgs[0].url
        let formData = {
          author_id: wx.getStorageSync('id_key').toString(),
          author_name: _this.data.userInfo.nick_name,
          author_avatar: _this.data.userInfo.avatar_url,
          content: _this.data.dynamicContent
        }
        wx.uploadFile({ 
          url: baseURL.baseURL + '/dynamic/dynamic_release_img',
          header: {
            author_id: wx.getStorageSync('id_key').toString()
          },
          filePath: filep, 
          name: 'file', 
          formData: formData, 
          success: function (res) { 
            Toast.success('发布成功')
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          }, fail: function (err) { 
            Toast.fail('系统错误')
          } 
        }); 
      }
      if (_this.data.dialogType == '02') {
        let data = {
          author_id: wx.getStorageSync('id_key').toString(),
          author_name: _this.data.userInfo.nick_name,
          author_avatar: _this.data.userInfo.avatar_url,
          content: _this.data.dynamicContent
        }
        esRequest('dynamic_release_txt', data).then(res => {
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
      }
    }
  },

  // 本人信息
  getMineInfo: function () {
    let data = {
      id: wx.getStorageSync('id_key')
    }
    esRequest('mine_info',data).then(res => {
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