import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    isShow: false,
    dropTitle1: '全部地区',
    basic_area: '',
    dropTitle2: '租赁方式',
    room_type: '',
    dropTitle3: '房屋租金',
    pay_type: '',
    roomNo: false,
    roomPage: '1',
    roomLimit: '10',
    totalCount: 0,
    roomList: []
  },

  onLoad: function (options) {
    this.getroomList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 全部地区
  dropTap1: function (e) {
    this.setData({
      isShow: false,
      roomList: [],
      basic_area: e.currentTarget.dataset.id,
      dropTitle1: e.currentTarget.dataset.title
    })
    this.selectComponent('#item1').toggle('false');
    this.getroomList()
  },

  // 租赁方式
  dropTap2: function (e) {
    this.setData({
      isShow: false,
      roomList: [],
      room_type: e.currentTarget.dataset.id,
      dropTitle2: e.currentTarget.dataset.title
    })
    this.selectComponent('#item2').toggle(false);
    this.getroomList()
  },

  // 信子水平
  dropTap3: function (e) {
    this.setData({
      isShow: false,
      roomList: [],
      pay_type: e.currentTarget.dataset.id,
      dropTitle3: e.currentTarget.dataset.title
    })
    this.selectComponent('#item3').toggle(false);
    this.getroomList()
  },

  // 线下活动列表
  getroomList: function () {
    let data = {
      page: this.data.roomPage,
      limit: this.data.roomLimit,
      basic_area: this.data.basic_area,
      room_type: this.data.room_type,
      pay_type: this.data.pay_type
    }
    esRequest('location_room_list', data).then(res => {
      if (res && res.data.code === 0) {
        if (res.data.totalCount == 0) {
          this.setData({ roomNo: true })
        } else {
          this.setData({ roomNo: false })
        }
        this.setData({
          isShow: true,
          totalCount: res.data.totalCount,
          roomList: this.data.roomList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 线下活动触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.roomList.length) {
      this.data.roomPage += 1
      this.getroomList()
    }
  },

  // 线下活动详情
  roomDetails: function (e) {
    wx.navigateTo({
      url: '/pages/locationModule/roomDetails/roomDetails?id=' + e.currentTarget.dataset.item.id
    })
  },

  // 新增工作岗位
  goAddPage: function () {
    wx.navigateTo({
      url: '/pages/locationModule/roomAdd/roomAdd',
    })
  },

})