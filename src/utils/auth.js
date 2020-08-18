import Cookies from 'js-cookie';

export function getUser() {
  return {
    appkey: Cookies.get('appkey'),
    username: Cookies.get('username'),
    email: Cookies.get('email'),
    role: Cookies.get('role'),
  };
}
export function setUser(userInfo) {
  const info = Object.entries(userInfo);
  for (let i = 0; i < info.length; i += 1) {
    Cookies.set(info[i][0], info[i][1]);
  }
  return true;
}
export function removeUser() {
  Cookies.remove('appkey');
  Cookies.remove('username');
  Cookies.remove('role');
  Cookies.remove('email');
}
