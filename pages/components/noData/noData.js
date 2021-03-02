Component({
  // 参数
  properties: {
    height: {
      type: Number
    }
  },

  data: {
    windowWidth: 0
  },

  attached: function () {
  },

  ready: function() {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth
    })
  },

  methods: {
  }

})