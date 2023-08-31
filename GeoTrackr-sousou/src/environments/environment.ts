export const env : { [s: string]: string | null } = {
  api_url:'http://localhost:8081',
  login_url:'http://localhost:8081/user/Authenticate',
  register_url:'http://localhost:8081/user/Register',
  listUsers_url:'http://localhost:8081/user/listUsers',
  User_url:'http://localhost:8081/user'
}

export const environment = {
  production: false,
  apiUrl:env['api_url'],
  loginUrl:env['login_url'],
  registerUrl:env['register_url'],
  listUsersUrl:env['listUsers_url'],
  UserUrl:env['User_url']
}




