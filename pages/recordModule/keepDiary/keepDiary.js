import mixins from '../../mixinsMoudle/mixins'
import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    type: '',
    id: '',
    time_show: false,
    diary_time: '',
    currentDate: new Date().getTime(),
    weather: '晴',
    pickerShow: false,
    pickerTitle: '',
    pickerList: [],
    diary_content: '',
    dataForm: {}
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key').toString()
    if (options.type) {
      this.setData({
        type: options.type,
      })
    }
    if (options.id) {
      this.setData({
        id: options.id,
      })
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    let date = {
      detail: new Date().getTime()
    }
    this.confirmDate(date)
    if (this.data.type === '01') {
      this.diaryDetail()
    }
  },
  
  // 弹出日期选择器
  dataTap: function () {
    this.setData({
      time_show: true
    })
  },
  // 选择日期
  confirmDate(event) {
    let diary_time = mixins.formatDate(event.detail, '08')
    this.setData({
      diary_time: diary_time
    })
  },

  // 选择天气
  weatherTap: function () {
    this.setData({
      pickerShow: true,
      pickerTitle: '请选择天气',
      pickerList: ['晴', '阴', '多云', '雨', '雪', '雾', '霾', '浮尘', '扬沙', '沙尘暴', '台风']
    })
  },
  confirmItem(event) {
    this.setData({
      weather: event.detail.value
    })
  },

  // 写日记
  diaryContent(event) {
    this.setData({
      diary_content: event.detail
    })
  },

  // 日记详情
  diaryDetail: function () {
    let data = {
      id: this.data.id
    }
    esRequest('diary_detail', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          diary_time: res.data.data.diary_date,
          weather: res.data.data.diary_weather,
          diary_content: res.data.data.diary_content
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 保存日记
  keepDiary: function () {
    let data = {
      user_id: this.data.id_key,
      diary_date: this.data.diary_time,
      diary_weather: this.data.weather,
      diary_content: this.data.diary_content
    }
    esRequest('keep_diary', data).then(res => {
      if (res && res.data.code === 0) {
        Toast.success('操作成功')
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 删除日记
  deleteDiary: function () {
    Dialog.confirm({
      title: '删除日记',
      message: '您确定要删除这篇日记吗？',
    }).then(() => {
      let data = {
        id: this.data.id
      }
      esRequest('delete_diary', data).then(res => {
        if (res && res.data.code === 0) {
          Toast.success('操作成功')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          Toast.fail('系统错误')
        }
      })
    }).catch(() => {
      Toast('取消')
    });
    
  }
})