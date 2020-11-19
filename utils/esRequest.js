import baseURL from "./baseURL"
import loginRequest from "./sub-unitRequest/loginRequest"
import mineRequest from "./sub-unitRequest/mineRequest"

export default (localObjects, parametersData, parameters) => {
  let globalObjects = Object.assign({}, loginRequest, mineRequest)
  var requestURL = ''
  if (parameters) {
    requestURL = baseURL.baseURL + globalObjects[localObjects].apiName + '/' + parameters
  } else {
    requestURL = baseURL.baseURL + globalObjects[localObjects].apiName
  }
  // var tokenme = wx.getStorageSync('token')
  // if (tokenme === undefined) {
  //   wx.showToast({
  //     title: '获取用户登录信息异常',
  //   })
  // }
  return new Promise((resolve, reject) => {
    wx.request({
      // header: {
        // 'token':tokenme
      // },
      method: localObjects.apiMethod,
      url: requestURL,
      data: parametersData,
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