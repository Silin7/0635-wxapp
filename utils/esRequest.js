  import baseURL from "./baseURL"
  // import homeRequest from "./sub-unitRequest/homeRequest"
  // import activityRequest from './sub-unitRequest/activityRequest'
  // import universityRequest from './sub-unitRequest/universityRequest'
  // import cateringRequest from './sub-unitRequest/cateringRequest'
  // import blessingRequest from './sub-unitRequest/blessingRequest'
  // import healthRequest from './sub-unitRequest/healthRequest'
  // import walletRequest from './sub-unitRequest/walletRequest'

  export default ( methodme, urlme, datame, id, id2 ) => {
    let globalNameObj = Object.assign({}, homeRequest, activityRequest, universityRequest, cateringRequest, blessingRequest, healthRequest, walletRequest)
    var url = ''
    if (id2 && id) {
      url = baseURL.baseURL + globalNameObj[urlme].apiName + '/' + id + '/' + id2
    } else if (id) {
      url = baseURL.baseURL + globalNameObj[urlme].apiName + '/' + id
    } else {
      url = baseURL.baseURL + globalNameObj[urlme].apiName
    }
    // const tokenme = wx.getStorageSync('token')
    // if (tokenme === undefined) {
    //   wx.showToast({
    //     title: '获取用户登录信息异常',
    //   })
    // }
    return new Promise((resolve, reject) => {
      wx.request({
        header: {
          // 'token':tokenme
        },
        method: methodme,
        url: url,
        data: datame,
        success(res) {
          resolve(res)
        },
        fail(err) {
          console.warn('fail' + JSON.stringify(err))
          reject(err)
        }
      })
    })
  }