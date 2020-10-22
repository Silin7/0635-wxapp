let registerRequest = {
  post_register: {
    apiName: '/register/post_register',
    name: '注册：判断账号是否存在'
  },
  post_register_inster: {
    apiName: '/register/post_register_inster',
    name: '注册：将注册信息写入数据库'
  },
  post_register_change: {
    apiName: '/register/post_register_change',
    name: '注册：修改密码'
  },
}
module.exports = registerRequest