import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    tabActive: 0,
    is_top: '01',
    marry: '',
    gender: '',
    typeList: [
      { key: '推荐', value: '01' },
      { key: '幸福婚姻', value: '02' },
      { key: '甜甜恋爱', value: '03' },
      { key: '女神专区', value: '04' },
      { key: '男神专区', value: '05' }
    ],
    personList: []
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key')
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.marryList()
  },

  tabChange(event) {
    if (event.detail.name === '01') {
      this.data.is_top = '01'
      this.data.marry = ''
      this.data.gender = ''
    }
    if (event.detail.name === '02') {
      this.data.is_top = ''
      this.data.marry = '01'
      this.data.gender = ''
    }
    if (event.detail.name === '03') {
      this.data.is_top = ''
      this.data.marry = '02'
      this.data.gender = ''
    }
    if (event.detail.name === '04') {
      this.data.is_top = ''
      this.data.marry = ''
      this.data.gender = '02'
    }
    if (event.detail.name === '05') {
      this.data.is_top = ''
      this.data.marry = ''
      this.data.gender = '01'
    }
    this.marryList()
  },

  // 获取人员列表
  marryList: function () {
    let data = {
      gender: this.data.gender,
      marry: this.data.marry,
      is_top: this.data.is_top
    }
    esRequest('marry_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          personList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 查看详情
  personDetails: function (e) {
    console.log(e.currentTarget.dataset.item.user_id)
  }
})