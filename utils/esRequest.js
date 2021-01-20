import baseURL from "./baseURL"
import adminRequest from "./sub-unitRequest/adminRequest"
import loginRequest from "./sub-unitRequest/loginRequest"
import historyRequest from "./sub-unitRequest/historyRequest"
import mineRequest from "./sub-unitRequest/mineRequest"
import dynamicRequest from "./sub-unitRequest/dynamicRequest"
import messageRequest from "./sub-unitRequest/messageRequest"
import recipeRequest from "./sub-unitRequest/recipeRequest"
import recordRequest from "./sub-unitRequest/recordRequest"
import scenicspotRequest from "./sub-unitRequest/scenicspotRequest"
import treasureChest from "./sub-unitRequest/treasureChest"
import otherRequest from "./sub-unitRequest/otherRequest"
import marryRequest from "./sub-unitRequest/marryRequest"

export default (localObjects, parametersData, parameters) => {
  var globalObjects = Object.assign({}, adminRequest, loginRequest, historyRequest, mineRequest, dynamicRequest, messageRequest, recipeRequest, recordRequest, scenicspotRequest, treasureChest, otherRequest, marryRequest)
  var apiMethod = globalObjects[localObjects].apiMethod
  if (parameters) {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName + '/' + parameters
  } else {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName
  }
  return new Promise((resolve, reject) => {
    wx.request({
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