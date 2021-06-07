import mixins from '../../../utils/mixins'
// import baseURL from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    autosize: {
      maxHeight: 120,
      minHeight: 120
    },
    uploadImgs: [],
    dataForm: {
      room_name: '',
      room_type: '',
      room_type_text: '',
      lxr_phone: '',
      pay_type: '',
      pay_type_text: '',
      pay_rent: '',
      pay_method: '',
      room_areas: '',
      room_shape: '',
      room_orientation: '',
      room_renovation: '',
      room_renovation_text: '',
      room_height: '',
      basic_area: '',
      basic_area_text: '',
      basic_address: '',
      room_elevator: '01',
      room_refrigerator: '01',
      room_washing: '01',
      room_heater: '01',
      room_broadband: '01',
      room_toilet: '01',
      room_bed: '01',
      room_wardrobe: '01',
      room_conditioner: '01',
      room_heating: '01',
      room_cook: '01',
      room_info: '',
    },
    pickerShow: false,
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
    showDate: false,
    currentDate: new Date(2000, 5, 15).getTime()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
  },

  // 小区名称
  roomName: function (event) {
    this.data.dataForm.room_name = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 租赁类型
  roomType: function () {
    this.setData({
      pickerType: 'roomType',
      pickerShow: true,
      pickerTitle: '请选择租赁类型',
      pickerList: ['整租', '合租']
    })
  },

  // 联系电话
  lxrPhone: function (event) {
    this.data.dataForm.lxr_phone = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 区间价格
  payType: function () {
    this.setData({
      pickerType: 'payType',
      pickerShow: true,
      pickerTitle: '请选择区间价格',
      pickerList: ['500元以下', '500-800元', '800-1200元', '1200元以上']
    })
  },

  // 租金
  payRent: function (event) {
    this.data.dataForm.pay_rent = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 支付方式
  payMethod: function (event) {
    this.data.dataForm.pay_method = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 房屋面积
  roomAreas: function (event) {
    this.data.dataForm.room_areas = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 房屋房型
  roomShape: function (event) {
    this.data.dataForm.room_shape = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 房屋朝向
  roomOrientation: function (event) {
    this.data.dataForm.room_orientation = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 装修状况
  roomRenovation: function (event) {
    this.setData({
      pickerType: 'roomRenovation',
      pickerShow: true,
      pickerTitle: '选择装修状况',
      pickerList: ['精装', '简装', '无装修']
    })
  },

  // 楼层高度
  roomHeight: function (event) {
    this.data.dataForm.room_height = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 地区分类
  basicArea: function () {
    this.setData({
      pickerType: 'basicArea',
      pickerShow: true,
      pickerTitle: '选择所在地区',
      pickerList: ['东昌府区', '阳谷县', '莘县', '茌平区', '东阿县', '冠县', '高唐县', '临清市']
    })
  },

  // 详细地址
  basicAddress: function (event) {
    this.data.dataForm.basic_address = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 电梯
  roomElevator: function (event) {
    this.data.dataForm.room_elevator = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 冰箱
  roomRefrigerator: function (event) {
    this.data.dataForm.room_refrigerator = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 洗衣机
  roomWashing: function (event) {
    this.data.dataForm.room_washing = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 热水器
  roomHeater: function (event) {
    this.data.dataForm.room_heater = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 宽带
  roomBroadband: function (event) {
    this.data.dataForm.room_broadband = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 卫生间
  roomToilet: function (event) {
    this.data.dataForm.room_toilet = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 床
  roomBed: function (event) {
    this.data.dataForm.room_bed = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 衣柜
  roomWardrobe: function (event) {
    this.data.dataForm.room_wardrobe = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 空调
  roomConditioner: function (event) {
    this.data.dataForm.room_conditioner = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 暖气
  roomHeating: function (event) {
    this.data.dataForm.room_heating = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },
  
  // 做饭
  roomCook: function (event) {
    this.data.dataForm.room_cook = event.detail
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 简介
  roomInfo: function (event) {
    this.data.dataForm.room_info = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 选中弹出框
  confirmItem(event) {
    let valueIndex = '0' + (event.detail.index + 1)
    if (this.data.pickerType == 'payType') {
      this.data.dataForm.pay_type = valueIndex
      this.data.dataForm.pay_type_text = event.detail.value
    }
    if (this.data.pickerType == 'roomType') {
      this.data.dataForm.room_type = valueIndex
      this.data.dataForm.room_type_text = event.detail.value
    }
    if (this.data.pickerType == 'basicArea') {
      this.data.dataForm.basic_area = valueIndex
      this.data.dataForm.basic_area_text = event.detail.value
    }
    if (this.data.pickerType == 'roomRenovation') {
      this.data.dataForm.room_renovation = valueIndex
      this.data.dataForm.room_renovation_text = event.detail.value
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

  // 确定按钮
  releaseDynamic: function () {
    this.setData({
      dialogShow: true
    });
    // if (this.data.uploadImgs.length == 0) {
    //   Toast.fail('请上传图片')
    //   return
    // } else {
    //   this.setData({
    //     dialogShow: true
    //   });
    // }
  },

  // 弹框确定按钮
  tapDialogButton: function (e) {
    console.log('this.data.dataForm', this.data.dataForm, JSON.stringify(this.data.dataForm))
    this.setData({
      dialogShow: false
    })
    if (e.detail.index == 1) {
      esRequest('location_room_add', this.data.dataForm).then (res => {
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
  },
})