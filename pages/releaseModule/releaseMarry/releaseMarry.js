import baseURL from '../../../utils/baseURL';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: false,
    windowWidth: 0,
    windowHeight: 0,
    autosize: {
      maxHeight: 120,
      minHeight: 120
    },
    uploadImgs: [],
    userInfo: {},
    dataForm: {
      type: '',
      type_text: '',
      user_id: '',
      name: '',
      gender: '',
      age: '',
      constellation: '',
      constellation_text: '',
      address: '',
      address_text: '',
      height: '',
      weight: '',
      education: '',
      education_text: '',
      occupation: '',
      occupation_text: '',
      income: '',
      income_text: '',
      state: '',
      state_text: '',
      car: '',
      car_text: '',
      house: '',
      house_text: '',
      introduce: ''
    },
    pickerShow: false,
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    if (!wx.getStorageSync('id_key')) {
      this.setData({
        loginShow: true
      })
    }
  },

  // 社交类型
  bindType: function () {
    this.setData({
      pickerType: 'type',
      pickerShow: true,
      pickerTitle: '请选择社交类型',
      pickerList: ['结婚', '恋爱', '交友']
    })
  },

  // 昵称
  bindName: function (event) {
    this.data.dataForm.name = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 性别切换
  genderChange(event) {
    this.data.dataForm.gender = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 身高
  bindHeight: function (event) {
    this.data.dataForm.height = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 体重
  bindWeight: function (event) {
    this.data.dataForm.weight = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 年龄
  bindAge: function (event) {
    this.data.dataForm.age = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 请选择星座
  bindConstellation: function () {
    this.setData({
      pickerType: 'constellation',
      pickerShow: true,
      pickerTitle: '请选择星座',
      pickerList: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    })
  },

  // 地区
  bindAddress: function () {
    this.setData({
      pickerType: 'address',
      pickerShow: true,
      pickerTitle: '请选择地区',
      pickerList: ['东昌府区', '阳谷县', '莘县', '茌平区', '东阿县', '冠县', '高唐县', '临清市']
    })
  },

  // 学历
  bindEducation: function () {
    this.setData({
      pickerType: 'education',
      pickerShow: true,
      pickerTitle: '请选择学历',
      pickerList: ['高中及以下', '大专', '本科', '研究生', '博士及以上', '保密']
    })
  },

  // 职业
  bindOccupation: function () {
    this.setData({
      pickerType: 'occupation',
      pickerShow: true,
      pickerTitle: '请选择职业',
      pickerList: ['生活 | 服务业', '行政 | 公务员', '销售 | 客服', '传媒 | 通信', '教育 | 法律', '财会 | 医疗', '技术 | 工程师', '学生', '其他', '保密']
    })
  },

  // 收入
  bindIncome: function () {
    this.setData({
      pickerType: 'income',
      pickerShow: true,
      pickerTitle: '请选择收入',
      pickerList: ['3千及以下', '3千至5千', '5千至1万', '1万至2万', '2万以上', '保密']
    })
  },

  // 感情状态
  bindState: function () {
    this.setData({
      pickerType: 'state',
      pickerShow: true,
      pickerTitle: '请选择收入',
      pickerList: ['单身', '恋爱', '已婚', '离异', '保密']
    })
  },

  // 是否有车
  bindCar: function () {
    this.setData({
      pickerType: 'car',
      pickerShow: true,
      pickerTitle: '是否有车',
      pickerList: ['是', '否', '保密']
    })
  },

  // 是否有房
  bindHouse: function () {
    this.setData({
      pickerType: 'house',
      pickerShow: true,
      pickerTitle: '是否有房',
      pickerList: ['是', '否', '保密']
    })
  },

  // 个人简介
  bindIntroduce: function (event) {
    this.data.dataForm.introduce = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 选中弹出框
  confirmItem(event) {
    let valueIndex = '0' + (event.detail.index + 1)
    if (this.data.pickerType == 'type') {
      this.data.dataForm.type = valueIndex
      this.data.dataForm.type_text = event.detail.value
    }
    if (this.data.pickerType == 'constellation') {
      this.data.dataForm.constellation = valueIndex
      this.data.dataForm.constellation_text = event.detail.value
    }
    if (this.data.pickerType == 'address') {
      this.data.dataForm.address = valueIndex
      this.data.dataForm.address_text = event.detail.value
    }
    if (this.data.pickerType == 'education') {
      this.data.dataForm.education = valueIndex
      this.data.dataForm.education_text = event.detail.value
    }
    if (this.data.pickerType == 'occupation') {
      this.data.dataForm.occupation = valueIndex
      this.data.dataForm.occupation_text = event.detail.value
    }
    if (this.data.pickerType == 'income') {
      this.data.dataForm.income = valueIndex
      this.data.dataForm.income_text = event.detail.value
    }
    if (this.data.pickerType == 'state') {
      this.data.dataForm.state = valueIndex
      this.data.dataForm.state_text = event.detail.value
    }
    if (this.data.pickerType == 'car') {
      this.data.dataForm.car = valueIndex
      this.data.dataForm.car_text = event.detail.value
    }
    if (this.data.pickerType == 'house') {
      this.data.dataForm.house = valueIndex
      this.data.dataForm.house_text = event.detail.value
    }
    this.setData({
      dataForm: this.data.dataForm
    })
  },

  // 图片上传完成
  afterRead: function (event) {
    this.data.uploadImgs.push(event.detail.file)
    this.setData({
      uploadImgs: this.data.uploadImgs
    })
  },

  // 删除已经上传的图片
  deleteImg: function () {
    this.setData({
      uploadImgs: []
    })
  },

  // 发布动态
  releaseDynamic: function () {
    console.log(this.data.dataForm)
    if (this.data.uploadImgs.length == 0) {
      Toast.fail('请上传图片')
      return
    } else {
      this.data.dataForm.user_id = wx.getStorageSync('id_key').toString()
      this.setData({
        dialogShow: true
      });
    }
  },

  // 发布确定按钮
  tapDialogButton: function (e) {
    let _this = this
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      let filep = _this.data.uploadImgs[0].url
      wx.uploadFile({ 
        url: baseURL.baseURL + '/marry/marry_release',
        header: {
          author_id: wx.getStorageSync('id_key').toString()
        },
        filePath: filep, 
        name: 'file', 
        formData: _this.data.dataForm, 
        success: function (res) { 
          Toast.success('发布成功')
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        }, fail: function (err) { 
          Toast.fail('系统错误')
        } 
      }); 
    }
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.redirectTo({
      url: '/pages/loginModule/loginPage/loginPage',
    })
  }
})