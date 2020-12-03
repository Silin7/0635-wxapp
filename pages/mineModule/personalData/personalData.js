import mixins from '../../mixinsMoudle/mixins'
import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    dataForm: {
      id: '',
      nickName: '',
      avatarUrl: '',
      userPhone: '',
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
    this.setData({
      id_key: wx.getStorageSync('id_key').substr(1)
    })
    this.getMineInfo()
  },
  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  onShow: function () {
  },
  // 获取个人信息
  getMineInfo: function () {
    let data = {
      id: wx.getStorageSync('id_key')
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code == 0) {
        this.setData({
          dataForm: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 填写电话
  userPhoneTap: function (event) {
    this.data.dataForm.userPhone = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },
  // 选择性别
  genderChange: function (event) {
    // this.data.dataForm.gender = event.detail
    // this.setData({
    //   dataForm: this.data.dataForm
    // });
  },
  // 弹出日期选择器
  dataTap: function () {
    this.setData({
      showDate: true
    })
  },
  // 选择日期
  confirmDate(event) {
    let birthday = mixins.formatDate(event.detail, '03', '-')
    let age = mixins.getAge(birthday)
    this.data.dataForm.birthday = birthday
    this.data.dataForm.age = age
    this.setData({
      dataForm: this.data.dataForm
    })
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
  // 选中星座，所在县市
  confirmItem(event) {
    if (this.data.pickerType == 'constellation') {
      this.data.dataForm.constellation = event.detail.value
    }
    if (this.data.pickerType == 'address') {
      this.data.dataForm.address = event.detail.value
    }
    this.setData({
      dataForm: this.data.dataForm
    })
  },
  // 填写个性签名
  personalSignatureTap: function (event) {
    this.data.dataForm.personalSignature = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },
  // 保存
  save_btn: function () {
    let data = this.data.dataForm
    for (let key in data) {
      if (data[key] == '') {
        if (key == 'userPhone') {
          Toast.fail('请填写电话')
          return
        }
        if (key == 'birthday') {
          Toast.fail('请填写生日')
          return
        }
        if (key == 'gender') {
          Toast.fail('请选择性别')
          return
        }
        if (key == 'constellation') {
          Toast.fail('请选择星座')
          return
        }
        if (key == 'address') {
          Toast.fail('请填写地址')
          return
        }
        if (key == 'personalSignature') {
          this.data.dataForm.personalSignature = '保持热爱奔赴山海，各自努力顶峰相见！'
        }
      }
    }
    if (mixins.phoneNumber(this.data.dataForm.userPhone)) {
      this.data.dataForm.id = wx.getStorageSync('id_key')
      esRequest('update_mineInfo', this.data.dataForm).then(res => {
        console.log(res)
        if (res && res.data.code == 0) {
          Toast.success('操作成功')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          Toast.fail(res.data.msg)
        }
      })
    } else {
      Toast.fail('电话格式错误')
    }
  }
})