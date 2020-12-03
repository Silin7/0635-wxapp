import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    footerActive: 0,
    overlayShow: true,
    swiperList: [
      { id: 'swiper01', image: '/images/homeMoudle/swiper_02.jpg' },
      { id: 'swiper02', image: '/images/homeMoudle/swiper_02.jpg' },
      { id: 'swiper03', image: '/images/homeMoudle/swiper_02.jpg' }
    ],
    iconList: [
      { name: '测试', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon01' },
      { name: '测试', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon02' },
      { name: '测试', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon03' },
      { name: '测试', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon04' },
    ],
    // 消息模块
    messageTab: 0,
    perMessageList: [],
    sysMessageList: [],
    // 我的模块
    mineDataForm: {},
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key')
    this.getMineInfo()
  },
  
  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  onShow: function () {
  },

  // 底部导航切换
  navChange(event) {
    this.setData({
      footerActive: event.detail
    })
    if (event.detail === 0) {
      wx.setNavigationBarTitle({
        title: '0635聊吧' 
      })
    }
    if (event.detail === 1) {
      wx.setNavigationBarTitle({
        title: '发现' 
      })
    }
    if (event.detail === 3) {
      wx.setNavigationBarTitle({
        title: '消息' 
      })
      this.getPerMessage()
      this.getSysMessage()
    }
    if (event.detail === 4) {
      wx.setNavigationBarTitle({
        title: '我的' 
      })
      this.getMineInfo()
    }
  },

  // 点击首页轮播图
  swiperTap: function (e) {
    console.log(e.currentTarget.dataset.item)
  },

  // 话题列表
  topicList: function () {
    wx.navigateTo({
      url: '/pages/topicModule/topicList/topicList',
    })
  },

  /* 消息模块 */
  // 消息tabs切换
  messageTabChange: function (e) {
    this.data.messageTab = e.detail.index
  },
  // 个人私信列表
  getPerMessage: function () {
    let data = {
      receiver_id: this.data.id_key
    }
    esRequest('permessage_list', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          perMessageList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 系统消息列表
  getSysMessage: function () {
    let data = {
      receiver_id: this.data.id_key
    }
    esRequest('sysmessage_list', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          sysMessageList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 消息详情
  messageDetails: function (e) {
    wx.navigateTo({
      url: '/pages/messageModule/messageDetails/messageDetails?id=' + e.currentTarget.dataset.item.id + '&type=' + this.data.messageTab,
    })
  },

  /* 我的模块 */
  // 获取个人信息
  getMineInfo: function () {
    let data = {
      id: this.data.id_key
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code == 0) {
        this.setData({
          mineDataForm: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 我的关注
  myConcerns: function () {
    wx.navigateTo({
      url: '/pages/mineModule/myConcerns/myConcerns',
    })
  },
  // 编辑个人资料
  personalData: function () {
    wx.navigateTo({
      url: '/pages/mineModule/personalData/personalData',
    })
  }
})