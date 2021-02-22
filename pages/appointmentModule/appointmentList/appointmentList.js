import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    appointmentActive: '01',
    appointmentType: [
      { name: '001', title: '男生' },
      { name: '002', title: '女生' },
      { name: '01', title: '吃饭' },
      { name: '02', title: '电影' },
      { name: '03', title: '唱歌' },
      { name: '04', title: '运动' },
      { name: '05', title: '出游' },
      { name: '06', title: '其他' }
    ],
    isShow: false,
    appointmentPage: '1',
    appointmentLimit: '10',
    totalCount: 0,
    sponsor_gender: '01',
    appointment_type: '',
    appointment_pay: '',
    appointmentList: []
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key').toString()
    this.getAppointmentList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 切换Tab
  appointmentChange: function (event) {
    this.setData({
      isShow: false
    })
    this.data.appointmentPage = '1'
    this.data.appointmentList = []
    if (event.detail.name === '001') {
      this.data.sponsor_gender = '01'
      this.data.appointment_type = ''
    } else if (event.detail.name === '002') {
      this.data.sponsor_gender = '02'
      this.data.appointment_type = ''
    } else {
      this.data.appointment_type = event.detail.name
      this.data.sponsor_gender = ''
    }
    this.getAppointmentList()
  },

  // 约会列表
  getAppointmentList: function () {
    let data = {
      page: this.data.appointmentPage,
      limit: this.data.appointmentLimit,
      sponsor_gender: this.data.sponsor_gender,
      appointment_type: this.data.appointment_type,
      appointment_pay: this.data.appointment_pay
    }
    esRequest('appointment_list', data).then(res => {
      if (res && res.data.code === 0) {
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

  // 约会详情
  appointmentDetails: function (e) {
    console.log(e.currentTarget.dataset.item)
  },

  // 触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.appointmentList.length) {
      this.data.appointmentPage += 1
      this.getAppointmentList()
    }
  }

})