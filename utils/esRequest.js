import baseURL from "./baseURL"
import loginRequest from "./sub-unitRequest/loginRequest"
import mineRequest from "./sub-unitRequest/mineRequest"
import dynamicRequest from "./sub-unitRequest/dynamicRequest"
import messageRequest from "./sub-unitRequest/messageRequest"
import recipeRequest from "./sub-unitRequest/recipeRequest"
import scenicspotRequest from "./sub-unitRequest/scenicspotRequest"
import treasureChest from "./sub-unitRequest/treasureChest"

export default (localObjects, parametersData, parameters) => {
  var globalObjects = Object.assign({}, loginRequest, mineRequest, dynamicRequest, messageRequest, recipeRequest, scenicspotRequest, treasureChest)
  var apiMethod = globalObjects[localObjects].apiMethod
  if (parameters) {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName + '/' + parameters
  } else {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName
  }
  // var tokenme = wx.getStorageSync('token')
  // if (tokenme === undefined) {
  //   wx.showToast({
  //     title: '获取用户登录信息异常',
  //   })
  // }
  return new Promise((resolve, reject) => {
    console.log(apiMethod)
    wx.request({
      // header: {
        // 'token':tokenme
      // },
      method: apiMethod,
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