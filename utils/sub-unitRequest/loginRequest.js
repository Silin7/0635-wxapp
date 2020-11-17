let loginRequest = {
  is_register: {
    apiName: '/login/is_register',
    name: '注册：判断账号是否存在'
  },
  register_inster: {
    apiName: '/login/register_inster',
    name: '注册：将注册信息写入数据库'
  },
  change_password: {
    apiName: '/login/change_password',
    name: '注册：修改密码'
  },
  sign_in: {
    apiName: '/login/sign_in',
    name: '登录：判断账号是否存在'
  }
}
module.exports = loginRequest