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
    currentDate: Number
  },
  
  data: {
    maxDate: new Date().getTime(),
    minDate: new Date(1970, 1, 1).getTime()
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