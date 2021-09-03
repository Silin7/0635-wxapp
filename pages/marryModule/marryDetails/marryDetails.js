import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: false,
    marryId: '',
    windowWidth: 0,
    windowHeight: 0,
    personDetails: {},
    userInfo: {},
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (options) {
    this.data.marryId = options.id ? options.id : ''
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.marryDetails()
  },

  // 点击首页轮播图（大图预览）
  swiperTap: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.item,
      urls: this.data.personDetails.photo
    })
  },

  // 基本信息
  marryDetails: function () {
    let data = {
      id: this.data.marryId
    }
    esRequest('marry_details', data).then(res => {
      if (res && res.data.code === 0) {
        res.data.data.photo = JSON.parse(res.data.data.photo)
        this.setData({
          personDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 本人信息
  getUserInfo: function () {
    esRequest('mine_info').then(res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('userIfo', res.data.data)
        this.data.userInfo = res.data.data
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 喜欢Ta
  btnGz: function () {
    if (!wx.getStorageSync('id_key')) {
      this.setData({ loginShow: true })
    } else {
      if (wx.getStorageSync('userIfo')) {
        this.setData({ userInfo: wx.getStorageSync('userIfo') })
      } else {
        this.getUserInfo()
      }
      this.setData({ dialogShow: true })
    }
  },

  // 喜欢确定按钮
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      // 是否喜欢了此用户
      let _this = this
      let data = {
        watched_id: _this.data.personDetails.id,
      }
      esRequest('is_follow_users', data).then(res => {
        if (res && res.data.code === 0) {
          if (res.data.data) {
            Toast.success('已喜欢')
          } else {
            _this.followUsers()
          }
        } else {
          Toast.fail('系统错误')
        }
      })
    }
  },


  // 喜欢此用户
  followUsers: function () {
    let _this = this
    let data = {
      watched_id: _this.data.personDetails.id,
      nick_name: _this.data.personDetails.name,
      photo: _this.data.personDetails.cover,
      introduce: _this.data.personDetails.introduce
    }
    esRequest('follow_users', data).then(res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('tp_key', '04')
        Toast.success('已喜欢')
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 要微信 / 求约会
  btnWY: function (e) {
    if (!wx.getStorageSync('id_key')) {
      this.setData({ loginShow: true })
    } else {
      if (wx.getStorageSync('userIfo')) {
        this.setData({ userInfo: wx.getStorageSync('userIfo') })
      } else {
        this.getUserInfo()
      }
      let data = {
        register_id: this.data.personDetails.id
      }
      esRequest('is_marry_sign', data).then(res => {
        if (res && res.data.code === 0) {
          if (res.data.data) {
            Toast.success('已发送消息')
          } else {
            wx.navigateTo({
              url: `/pages/marryModule/marryRegistration/marryRegistration?receiver_id=${this.data.personDetails.user_id}&register_id=${this.data.personDetails.id}&gender=${this.data.personDetails.gender}`
            })
          }
        }
      })
    }
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.navigateTo({
      url: '/pages/loginModule/loginPage/loginPage'
    })
  }
})