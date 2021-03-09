import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: false,
    register_id: '',
    windowWidth: 0,
    windowHeight: 0,
    swiperList: [],
    personDetails: {},
    userInfo: {},
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (options) {
    this.data.register_id = options.register_id ? options.register_id : ''
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
      urls: this.data.swiperList
    })
  },

  // 基本信息
  marryDetails: function () {
    let data = {
      register_id: this.data.register_id
    }
    esRequest('marry_details', data).then(res => {
      if (res && res.data.code === 0) {
        this.data.swiperList = []
        this.data.swiperList.push(res.data.data.photo1)
        this.data.swiperList.push(res.data.data.photo2)
        this.data.swiperList.push(res.data.data.photo3)
        this.setData({
          swiperList: this.data.swiperList,
          personDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 本人信息
  getUserInfo: function () {
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

  // 关注Ta
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
        register_id: this.data.personDetails.register_id,
        followers_id: this.data.userInfo.id
      }
      esRequest('marry_issign', data).then(res => {
        if (res && res.data.code === 0) {
          if (res.data.type === '0') {
            wx.navigateTo({
              url: `/pages/marryModule/marryRegistration/marryRegistration?receiver_id=${this.data.personDetails.user_id}&register_id=${this.data.personDetails.register_id}&gender=${this.data.personDetails.gender}`
            })
          }
          if (res.data.type === '1') {
            Toast.success('已发送消息')
          }
        }
      })
    }
  },

  // 关注确定按钮
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
        watched_id: _this.data.personDetails.register_id,
        nick_name: _this.data.personDetails.nick_name,
        photo: _this.data.personDetails.photo1,
        introduce: _this.data.personDetails.introduce
      }
      esRequest('follow_users', data).then(res => {
        if (res && res.data.code === 0) {
          wx.setStorageSync('tp_key', '04')
          Toast.success('已关注')
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