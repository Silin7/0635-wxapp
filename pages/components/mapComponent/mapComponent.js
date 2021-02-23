Page({
  data: {
    sname: '',
    splace: '',
    // 经度
    slatitude: '',
    // 纬度
    slongitude: '',
    distance: '',
    windowWidth: 0,
    windowHeight: 0,
    // 经度
    latitude: '',
    // 纬度
    longitude: '',
    // 缩放级别(比例尺)
    scale: 10,
    // 标记点
    markers: [],
    // 路线
    polyline: [],
  },

  onLoad: function (option) {
    this.setData({
      sname: option.sname ? option.sname : '',
      splace: option.splace ? option.splace : '',
      slatitude: option.slatitude ? Number(option.slatitude) : '',
      slongitude: option.slongitude ? Number(option.slongitude) : ''
    })
    this.getLocation()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
  },

  getLocation: function () {
    let _this = this
    wx.getLocation({
      // 默认为 wgs84,返回gps坐标
      type: 'wgs84',
      success: function (res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 18,
            height: 18,
            iconPath: '/images/mineModule/bj2.png',
            callout: {
              content: '我',
              fontSize: "12",
              textAlign: "center",
              borderWidth: 0,
              color: "#d4237a",
              bgColor: "#FFFFFF",
              display: "ALWAYS",
              padding: 5,
              borderRadius: 5,
            }
          },{
            id: 1,
            latitude: _this.data.slatitude,
            longitude: _this.data.slongitude,
            width: 18,
            height: 18,
            iconPath: '/images/mineModule/bj.png',
            callout: {
              content: _this.data.sname,
              fontSize: "12",
              textAlign: "center",
              borderWidth: 0,
              color: "#4545FF",
              bgColor: "#FFFFFF",
              display: "ALWAYS",
              padding: 5,
              borderRadius: 5,
            }
          }],
          polyline: [{
            points: [{
              latitude: res.latitude,
              longitude: res.longitude,
            },{
              latitude: _this.data.slatitude,
              longitude: _this.data.slongitude,
            }],
            width: 2,
            dottedLine: true,
            color: "#d4237a",
          }]
        })
        _this.getDistance(_this.data.longitude, _this.data.latitude, _this.data.slongitude, _this.data.slatitude)
      }
    })
  },
    
  //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  getDistance: function (lat1, lng1, lat2, lng2){
    var radLat1 = this.radFunction(lat1);
    var radLat2 = this.radFunction(lat2);
    var a = radLat1 - radLat2;
    var b = this.radFunction(lng1) - this.radFunction(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    s = s.toFixed(2);
    this.setData({
      distance: s
    })
    console.log('this.data.distance', this.data.distance)
  },
  //进行经纬度转换为距离的计算
  radFunction: function (d){
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
  }
})


