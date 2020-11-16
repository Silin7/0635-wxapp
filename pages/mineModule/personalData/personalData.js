import mixins from '../../mixinsMoudle/mixins'
Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    dataForm: {
      nickname: '',
      age: '',
      birthday: '',
      gender: '',
      constellation: '',
      address: '',
      personalSignature: '',
    },
    pickerShow: false,
    pickerType: '',
    pickerTitle: '',
    pickerList: [],
    showDate: false,
    currentDate: new Date(2000, 5, 15).getTime(),
    minDate: new Date(1950, 12, 31).getTime(),
    maxDate: new Date().getTime(),
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
    console.log(mixins.getAge('1997-1-1'))
  },

  // 选择性别
  genderChange: function (event) {
    this.data.dataForm.gender = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },
  // 弹出日期选择器
  dataTap: function () {
    this.setData({
      showDate: true
    })
  },
  // 选择日期
  confirmDate(event) {
    console.log(mixins.formatDate(event.detail, '07'))
  },
  // 请选择星座
  constellationTap: function () {
    this.setData({
      pickerType: 'constellation',
      pickerShow: true,
      pickerTitle: '请选择星座',
      pickerList: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    })
  },
  // 请选择所在县市
  addressTap: function () {
    this.setData({
      pickerType: 'address',
      pickerTitle: '选择所在县市',
      pickerShow: true,
      pickerList: ['东昌府区', '阳谷县', '莘县', '茌平区', '东阿县', '冠县', '高唐县', '临清市', '其他']
    })
  },
  
  
  // 选中
  confirmItem(event) {
    console.log(event)
  }
})