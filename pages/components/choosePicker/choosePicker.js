Component({
  properties: {
    overlayShow: {
      type: Boolean,
      value: false,
    },
    pickerTitle: {
      type: String,
      value: ''
    },
    dataList: {
      type: Array,
      value: []
    }
  },
  
  data: {
  },

  attached: function () {
  },

  ready: function() {
  },

  methods: {
    // 取消按钮
    onCancel: function () {
      this.setData({
        overlayShow: false
      })
    },
    // 确定按钮
    onConfirm: function (e) {
      // 通过triggerEvent将参数传给父组件
      this.triggerEvent('confirmItem', e.detail)
    }
  }
})