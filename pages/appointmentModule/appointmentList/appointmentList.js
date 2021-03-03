import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    isShow: false,
    appointmentPage: '1',
    appointmentLimit: '10',
    totalCount: 0,
    dropTitle1: '全部地区',
    area_type: '',
    dropTitle2: '全部分类',
    appointment_type: '',
    dropTitle3: '不限性别',
    sponsor_gender: '',
    appointmentNo: false,
    appointmentList: []
  },

  onLoad: function (options) {
    this.getAppointmentList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  dropTap1: function (e) {
    this.setData({
      isShow: false,
      appointmentList: [],
      area_type: e.currentTarget.dataset.id,
      dropTitle1: e.currentTarget.dataset.title
    })
    this.selectComponent('#item1').toggle('false');
    this.getAppointmentList()
  },

  dropTap2: function (e) {
    this.setData({
      isShow: false,
      appointmentList: [],
      appointment_type: e.currentTarget.dataset.id,
      dropTitle2: e.currentTarget.dataset.title
    })
    this.selectComponent('#item2').toggle(false);
    this.getAppointmentList()
  },

  dropTap3: function (e) {
    this.setData({
      isShow: false,
      appointmentList: [],
      sponsor_gender: e.currentTarget.dataset.id,
      dropTitle3: e.currentTarget.dataset.title
    })
    this.selectComponent('#item3').toggle(false);
    this.getAppointmentList()
  },

  // 线下活动列表
  getAppointmentList: function () {
    let data = {
      page: this.data.appointmentPage,
      limit: this.data.appointmentLimit,
      area_type: this.data.area_type,
      appointment_type: this.data.appointment_type,
      sponsor_gender: this.data.sponsor_gender,
    }
    esRequest('appointment_list', data).then(res => {
      if (res && res.data.code === 0) {
        if (res.data.totalCount == 0) {
          this.setData({ appointmentNo: true })
        } else {
          this.setData({ appointmentNo: false })
        }
        this.setData({
          isShow: true,
          totalCount: res.data.totalCount,
          appointmentList: this.data.appointmentList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 线下活动触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.appointmentList.length) {
      this.data.appointmentPage += 1
      this.getAppointmentList()
    }
  },

  // 线下活动详情
  appointmentDetails: function (e) {
    wx.navigateTo({
      url: '/pages/appointmentModule/appointmentDetails/appointmentDetails?id=' + e.currentTarget.dataset.item.id
    })
  },

})