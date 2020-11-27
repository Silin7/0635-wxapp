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
      home_normal: '/images/homeMoudle/home_normal.png',
      home_active: '/images/homeMoudle/home_active.png',
      compass_normal: '/images/homeMoudle/compass_normal.png',
      compass_active: '/images/homeMoudle/compass_active.png',
      release_normal: '/images/homeMoudle/release_normal.png',
      release_active: '/images/homeMoudle/release_active.png',
      news_normal: '/images/homeMoudle/news_normal.png',
      news_active: '/images/homeMoudle/news_active.png',
      mine_normal: '/images/homeMoudle/mine_normal.png',
      mine_active: '/images/homeMoudle/mine_active.png',
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