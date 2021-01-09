Component({
  properties: {
    footerActive: {
      type: Number,
      value: 0,
    },
    overlayShow: {
      type: Boolean,
      value: true,
    }
  },
  
  data: {
    footerIcon: {
      home_normal: '/images/homeModule/home_normal.png',
      home_active: '/images/homeModule/home_active.png',
      compass_normal: '/images/homeModule/compass_normal.png',
      compass_active: '/images/homeModule/compass_active.png',
      release_normal: '/images/homeModule/release_normal.png',
      release_active: '/images/homeModule/release_active.png',
      news_normal: '/images/homeModule/news_normal.png',
      news_active: '/images/homeModule/news_active.png',
      mine_normal: '/images/homeModule/mine_normal.png',
      mine_active: '/images/homeModule/mine_active.png',
    }
  },

  attached: function () {
  },

  ready: function() {
  },

  methods: {
    navChange: function (e) {
      // 通过triggerEvent将参数传给父组件
      this.triggerEvent('navChange', e.detail)
    }
  }
})