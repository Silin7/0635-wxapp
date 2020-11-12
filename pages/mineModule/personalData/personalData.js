import mixins from '../../mixinsMoudle/mixins'
Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    dataForm: {
      nickname: '',
      // 性别（男：01，女：02） 	
      gender: '01',
      birthday: '',
      age: '',
      // 感情状况（01：单身；02：热恋；03：已婚；04：离异）
      emotional: '',
      height: '',
      weight: '',
      // 民族
      nation: '',
      address: '',
      school: '',
      hobby: '',
      // 职业
      occupation: '',
      // 个性签名
      personalSignature: '',
    },
    pickerTitle: '',
    showDate: false,
    currentDate: new Date(2000, 5, 15).getTime(),
    minDate: new Date(1950, 12, 31).getTime(),
    maxDate: new Date().getTime(),
    showAdderss: false,
    adderssList: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
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
    this.aaa()
  },
  
  async aaa() {
    await this.dsq()
    console.log('11111111111111111')
  },

  dsq: function () {
    return new Promise(async(resolve, reject) => {
      setTimeout(() => {
        console.log(reject)
        resolve()
      }, 3000);
    })
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

  // 弹出所在城市选择器
  addressTap: function () {
    this.setData({
      pickerTitle: '选择所在城市',
      showAdderss: true
    })
  },
  // 选择所在城市
  confirmItem(event) {
    console.log(event)
  }
})

// 导航栏
// onClickLeft() {
//   wx.showToast({ title: '点击返回', icon: 'none' });
// },
// onClickRight() {
//   wx.showToast({ title: '点击按钮', icon: 'none' });
// },