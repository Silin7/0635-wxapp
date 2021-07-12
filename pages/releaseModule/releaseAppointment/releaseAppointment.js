import baseURL from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: '',
    windowWidth: 0,
    windowHeight: 0,
    autosize: {
      maxHeight: 120,
      minHeight: 120
    },
    uploadImgs: [],
    userInfo: {},
    dataForm: {
      sponsor_id: '',
      sponsor_name: '',
      sponsor_gender: '',
      sponsor_age: '',
      sponsor_img: '',
      appointment_title: '',
      appointment_info: '',
      appointment_time: '',
      appointment_place: '',
      appointment_wx: '',
      area_type: '',
      area_type_text: '',
      appointment_type: '',
      appointment_type_text: '',
      appointment_pay: '',
      appointment_pay_text: '',
      appointment_gander: '',
      appointment_gander_text: '',
      appointment_details: '',
      activity_poster: ''
    },
    pickerShow: false,
    dialogType: '01',
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
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
    if (!wx.getStorageSync('id_key')) {
      this.setData({
        loginShow: true
      })
    }
  },

  // 活动标题
  appointmentTitle: function (event) {
    this.data.dataForm.appointment_title = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 活动简介
  appointmentInfo: function (event) {
    this.data.dataForm.appointment_info = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 活动时间
  appointmentTime: function (event) {
    this.data.dataForm.appointment_time = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 活动地点
  appointmentPlace: function (event) {
    this.data.dataForm.appointment_place = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 联系方式
  appointmentWx: function (event) {
    this.data.dataForm.appointment_wx = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 地区分类
  areaType: function () {
    this.setData({
      pickerType: 'area_type',
      pickerShow: true,
      pickerTitle: '选择所在县市',
      pickerList: ['东昌府区', '阳谷县', '莘县', '茌平区', '东阿县', '冠县', '高唐县', '临清市']
    })
  },

  // 活动分类
  appointmentType: function () {
    this.setData({
      pickerType: 'appointment_type',
      pickerShow: true,
      pickerTitle: '选择活动分类',
      pickerList: ['约饭', '看电影', '唱歌', '运动', '旅游', '其他']
    })
  },

  // 付款方式
  appointmentPay: function () {
    this.setData({
      pickerType: 'appointment_pay',
      pickerShow: true,
      pickerTitle: '选择付款方式',
      pickerList: ['发起方支付', '参与方支付', 'AA制', '免费', '其他']
    })
  },

  // 性别要求
  appointmentGander: function () {
    this.setData({
      pickerType: 'appointment_gander',
      pickerShow: true,
      pickerTitle: '选择性别要求',
      pickerList: ['仅限男生', '仅限女生', '不限性别']
    })
  },

  // 详细信息
  appointmentDetails: function (event) {
    this.data.dataForm.appointment_details = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 选中弹出框
  confirmItem(event) {
    let valueIndex = '0' + (event.detail.index + 1)
    if (this.data.pickerType == 'area_type') {
      this.data.dataForm.area_type = valueIndex
      this.data.dataForm.area_type_text = event.detail.value
    }
    if (this.data.pickerType == 'appointment_type') {
      this.data.dataForm.appointment_type = valueIndex
      this.data.dataForm.appointment_type_text = event.detail.value
    }
    if (this.data.pickerType == 'appointment_pay') {
      this.data.dataForm.appointment_pay = valueIndex
      this.data.dataForm.appointment_pay_text = event.detail.value
    }
    if (this.data.pickerType == 'appointment_gander') {
      this.data.dataForm.appointment_gander = valueIndex
      this.data.dataForm.appointment_gander_text = event.detail.value
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
    if (wx.getStorageSync('userIfo')) {
      let userIfo = wx.getStorageSync('userIfo')
      this.data.dataForm.sponsor_id = wx.getStorageSync('id_key').toString()
      this.data.dataForm.sponsor_name = userIfo.nick_name
      this.data.dataForm.sponsor_gender = userIfo.gender
      this.data.dataForm.sponsor_age = userIfo.age
      this.data.dataForm.sponsor_img = userIfo.avatar_url
    } else {
      this.getMineInfo()
    }
    if (this.data.uploadImgs.length == 0) {
      this.setData({
        dialogType: '02',
        dialogShow: true
      });
    } else {
      this.setData({
        dialogType: '01',
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
      if (_this.data.dialogType == '01') {
        let filep = _this.data.uploadImgs[0].url
        wx.uploadFile({ 
          url: baseURL.baseURL + '/appointment/appointment_release_img',
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
      if (_this.data.dialogType == '02') {
        esRequest('appointment_release_txt', _this.data.dataForm).then(res => {
          if (res && res.data.code === 0) {
            Toast.success('发布成功')
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          } else {
            Toast.fail('系统错误')
          }
        })
      }
    }
  },

  // 本人信息
  getMineInfo: function () {
    let _this = this
    let data = {
      id: wx.getStorageSync('id_key')
    }
    esRequest('mine_info',data).then(res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('userIfo', res.data.data)
        let userIfo = res.data.data
        _this.data.dataForm.sponsor_id = wx.getStorageSync('id_key').toString()
        _this.data.dataForm.sponsor_name = userIfo.nick_name
        _this.data.dataForm.sponsor_gender = userIfo.gender
        _this.data.dataForm.sponsor_age = userIfo.age
        _this.data.dataForm.sponsor_img = userIfo.avatar_url
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.redirectTo({
      url: '/pages/loginModule/loginPage/loginPage',
    })
  }
})