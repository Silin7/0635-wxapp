let loginRequest = {
  register_inster: {
    apiMethod: 'POST',
    apiName: '/login/register_inster',
    name: '注册'
  },
  change_password: {
    apiMethod: 'POST',
    apiName: '/login/change_password',
    name: '修改密码'
  },
  sign_in: {
    apiMethod: 'POST',
    apiName: '/login/sign_in',
    name: '登录'
  }
}

module.exports = loginRequest