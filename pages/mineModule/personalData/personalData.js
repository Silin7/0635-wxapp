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
    showDate: false,
    currentDate: new Date(2000, 1, 1).getTime(),
    minDate: new Date(1950, 12, 31).getTime(),
    maxDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
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
  },
  // 选择性别
  genderChange: function (event) {
    this.data.dataForm.gender = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },
  // 显示日期按钮
  dataTap: function () {
    this.setData({
      showDate: true
    })
  },
  // 日期取消按钮
  cancelDate: function () {
    this.setData({
      showDate: false
    })
  },
  // 日期确定按钮
  confirmDate(event) {
    this.setData({
      currentDate: event.detail,
    });
    // console.log(mixins.formatDate(event.detail, '07'))
  },
  addressTap: function () {
    this.setData({
      showAdderss: true
    })
  },
  adderssCancel: function () {
    this.setData({
      showAdderss: false
    })
  },
  adderssConfirm(event) {
    const { picker, value, index } = event.detail;
    console.log(`当前值：${value}, 当前索引：${index}`);
  },
  // 根据出生日期算出年龄
  jsGetAge: function (strBirthday) {
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if (nowYear == birthYear) {
      //同年 则为0岁
      returnAge = 0;
    } else {
      var ageDiff = nowYear - birthYear ; //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay;//日之差
          if(dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff ;
          }
        } else {
          var monthDiff = nowMonth - birthMonth;//月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff ;
          }
        }
      } else {
        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
      }
    }
    //返回周岁年龄
    return returnAge;
  }
})

// 导航栏
// onClickLeft() {
//   wx.showToast({ title: '点击返回', icon: 'none' });
// },
// onClickRight() {
//   wx.showToast({ title: '点击按钮', icon: 'none' });
// },