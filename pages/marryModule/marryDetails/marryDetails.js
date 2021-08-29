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

  // 点击首页轮播图
  swiperTap: function (e) {
    wx.previewImage({
      // 当前显示图片的http链接
      current: e.currentTarget.dataset.item,
      // 需要预览的图片http链接列表
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
        register_id: this.data.personDetails.id,
        followers_id: this.data.userInfo.id
      }
      esRequest('marry_issign', data).then(res => {
        if (res && res.data.code === 0) {
          if (res.data.type === '0') {
            wx.navigateTo({
              url: `/pages/marryModule/marryRegistration/marryRegistration?receiver_id=${this.data.personDetails.user_id}&register_id=${this.data.personDetails.id}&gender=${this.data.personDetails.gender}`
            })
          }
          if (res.data.type === '1') {
            Toast.success('已发送消息')
          }
        }
      })
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
      let _this = this
      let data = {
        followers_id: wx.getStorageSync('id_key').toString(),
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
    }
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.navigateTo({
      url: '/pages/loginModule/loginPage/loginPage'
    })
  }
})