import mixins from '../../mixinsMoudle/mixins'
// import esRequest from '../../../utils/esRequest';
// import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    time_show: false,
    diary_time: '',
    currentDate: new Date().getTime(),
    weather: '',
    pickerShow: false,
    pickerTitle: '',
    pickerList: [],
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
    console.log('this.data.currentDate---->', this.data.currentDate)
    
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

  weatherTap: function () {
    this.setData({
      pickerShow: true,
      pickerTitle: '请选择天气',
      pickerList: ['晴', '阴', '多云', '雨', '雪', '雾', '霾', '浮尘', '扬沙', '沙尘暴', '台风']
    })
  },
  // 选择天气
  confirmItem(event) {
    this.setData({
      weather: event.detail.value
    })
  },

  // 日期处理函数
  formatDate(date) {
    date = new Date(date);
    var tYear = date.getFullYear();
    var tMonth = date.getMonth();
    var tDate = date.getDate();
    tMonth = this.add0MD(tMonth + 1);
    tDate = this.add0MD(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
  },
  add0MD: function (MD) {
    var key = MD;
    if(MD.toString().length == 1){
      key = "0" + MD;
    }
    return key;
  },

  // xxx
  // xxx: function () {
  //   let data = {
  //   }
  //   esRequest('xxx', data).then(res => {
  //     if (res && res.data.state === 'success') {
  //       console.log(res)
  //     } else {
  //       Toast.fail('系统错误')
  //     }
  //   })
  // }
})