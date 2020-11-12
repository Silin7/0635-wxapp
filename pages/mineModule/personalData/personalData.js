import mixins from '../../mixinsMoudle/mixins'
Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    dataForm: {
      nickname: '',
      // 性别（男：01，女：02） 	
      gender: '',
      birthday: '',
      age: '',
      // 感情状况（01：单身；02：热恋；03：已婚；04：离异）
      emotional: '',
      address: '',
      // 职业
      occupation: '',
      // 个性签名
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
  // 请选择所在县市
  addressTap: function () {
    this.setData({
      pickerType: 'address',
      pickerTitle: '选择所在县市',
      pickerShow: true,
      pickerList: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    })
  },
  // 请选择感情状态
  emotionalTap: function () {
    this.setData({
      pickerType: 'emotional',
      pickerShow: true,
      pickerTitle: '请选择感情状态',
      pickerList: ['单身', '热恋', '已婚', '离异', '保密']
    })
  },
  // 请选择职业
  occupationTap: function () {
    this.setData({
      pickerType: 'occupation',
      pickerShow: true,
      pickerTitle: '请选择职业',
      pickerList: ['学生', '教师', '工人', '农民', '其他']
    })
  },
  


  // 选中
  confirmItem(event) {
    console.log(event)
  }
})