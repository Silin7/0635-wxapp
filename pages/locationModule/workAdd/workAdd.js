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
      basic_title: '',
      basic_salary: '',
      basic_salary_text: '',
      basic_phone: '',
      basic_type: '',
      basic_type_text: '',
      basic_education: '',
      basic_education_text: '',
      basic_experience: '',
      basic_experience_text: '',
      basic_people: '',
      basic_area: '',
      basic_area_text: '',
      basic_address: '',
      basic_welfare: '',
      basic_info: '',
      business_name: '',
      business_gsfr: '',
      business_zczb: '',
      business_xydm: '',
      business_clsj: '',
      business_zcdz: '',
      business_jyfw: '',
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

  // 岗位名称
  basicTitle: function (event) {
    this.data.dataForm.basic_title = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 薪资水平
  basicSalary: function () {
    this.setData({
      pickerType: 'basicSalary',
      pickerShow: true,
      pickerTitle: '请选择薪资水平',
      pickerList: ['1000元以下', '1000-3000元', '3000-5000元', '5000-8000元', '8000-10000元', '10000元以上']
    })
  },

  // 招聘人数
  basicPeople: function (event) {
    this.data.dataForm.basic_people = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 联系电话
  basicPhone: function (event) {
    this.data.dataForm.basic_phone = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 工作类型
  basicType: function () {
    this.setData({
      pickerType: 'basicType',
      pickerShow: true,
      pickerTitle: '请选择工作类型',
      pickerList: ['生活 | 服务', '人事 | 后勤', '采购 | 销售', '司机 | 普工', '电商 | 传媒', '财务 | 教育', '电气 | 计算机', '管理 | 实习生', '其他']
    })
  },

  // 学历要求
  basicEducation: function () {
    this.setData({
      pickerType: 'basicEducation',
      pickerShow: true,
      pickerTitle: '请选择学历要求',
      pickerList: ['学历不限', '高中以上学历', '专科以上学历', '本科以上学历', '研究生以上学历']
    })
  },

  // 经验要求
  basicExperience: function () {
    this.setData({
      pickerType: 'basicExperience',
      pickerShow: true,
      pickerTitle: '请选择经验要求',
      pickerList: ['工作经验不限', '一至三年工作经验', '三至五年工作经验', '五年以上工作经验']
    })
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

  // 办公地址
  basicAddress: function (event) {
    this.data.dataForm.basic_address = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 福利待遇
  basicWelfare: function (event) {
    this.data.dataForm.basic_welfare = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 职位简介
  basicInfo: function (event) {
    this.data.dataForm.basic_info = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 公司名称
  businessName: function (event) {
    this.data.dataForm.business_name = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 企业法人
  businessGsfr: function (event) {
    this.data.dataForm.business_gsfr = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 注册资本
  businessZczb: function (event) {
    this.data.dataForm.business_zczb = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 信用代码
  businessXydm: function (event) {
    this.data.dataForm.business_xydm = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },
  

  // 成立时间
  businessClsj: function () {
    this.setData({
      showDate: true
    })
  },

  // 注册地址
  businessZcdz: function (event) {
    this.data.dataForm.business_zcdz = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  // 经营范围
  businessJyfw: function (event) {
    this.data.dataForm.business_jyfw = event.detail.value
    this.setData({
      dataForm: this.data.dataForm
    });
  },

  

  // 选中弹出框
  confirmItem(event) {
    let valueIndex = '0' + (event.detail.index + 1)
    if (this.data.pickerType == 'basicSalary') {
      this.data.dataForm.basic_salary = valueIndex
      this.data.dataForm.basic_salary_text = event.detail.value
    }
    if (this.data.pickerType == 'basicType') {
      this.data.dataForm.basic_type = valueIndex
      this.data.dataForm.basic_type_text = event.detail.value
    }
    if (this.data.pickerType == 'basicEducation') {
      this.data.dataForm.basic_education = valueIndex
      this.data.dataForm.basic_education_text = event.detail.value
    }
    if (this.data.pickerType == 'basicExperience') {
      this.data.dataForm.basic_experience = valueIndex
      this.data.dataForm.basic_experience_text = event.detail.value
    }
    if (this.data.pickerType == 'basicArea') {
      this.data.dataForm.basic_area = valueIndex
      this.data.dataForm.basic_area_text = event.detail.value
    }
    this.setData({
      dataForm: this.data.dataForm
    })
  },

  // 选中日期
  confirmDate(event) {
    let clsj = mixins.formatDate(event.detail, '03', '-')
    this.data.dataForm.business_clsj = clsj
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
    this.setData({
      dialogShow: false
    })
    if (e.detail.index == 1) {
      esRequest('location_work_add', this.data.dataForm).then (res => {
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