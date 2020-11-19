let loginRequest = {
  is_register: {
    apiMethod: 'POST',
    apiName: '/login/is_register',
    name: '判断账号是否存在（参数：userName，state）'// state为0：注册，state为1：修改密码
  },
  register_inster: {
    apiMethod: 'POST',
    apiName: '/login/register_inster',
    name: '将注册信息写入数据库（参数：userName，password，nickName，avatarUrl，gender）'
  },
  change_password: {
    apiMethod: 'POST',
    apiName: '/login/change_password',
    name: '修改密码（参数：newPassword，id）'
  },
  sign_in: {
    apiMethod: 'POST',
    apiName: '/login/sign_in',
    name: '判断账号密码是否正确（参数：userName，password）'
  }
}
module.exports = loginRequest