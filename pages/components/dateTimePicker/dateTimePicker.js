Component({
  properties: {
    overlayShow: {
      type: Boolean,
      value: false,
    },
    dateType: {
      type: String,
      value: 'date'
    },
    minDate: Number,
    maxDate: Number,
    currentDate: Number
  },
  
  data: {
  },

  attached: function () {
  },

  ready: function() {
  },

  methods: {
    // 取消按钮
    cancelDate: function () {
      this.setData({
        overlayShow: false
      })
    },
    // 确定按钮
    confirmDate: function (e) {
      // 通过triggerEvent将参数传给父组件
      this.triggerEvent('confirmDate', e.detail)
      this.cancelDate()
    }
  }
})