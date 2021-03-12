let loginRequest = {
  is_register: {
    apiMethod: 'GET',
    apiName: '/login/is_register',
    name: '判断账号是否存在'
  },
  register_inster: {
    apiMethod: 'POST',
    apiName: '/login/register_inster',
    name: '将注册信息写入数据库'
  },
  change_password: {
    apiMethod: 'POST',
    apiName: '/login/change_password',
    name: '修改密码'
  },
  sign_in: {
    apiMethod: 'POST',
    apiName: '/login/sign_in',
    name: '判断账号密码是否正确'
  }
}
module.exports = loginRequest