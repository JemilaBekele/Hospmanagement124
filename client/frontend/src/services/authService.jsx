import axios from 'axios'

import { jwtDecode } from "jwt-decode";



const setToken = (token) => {
       localStorage.setItem('token' ,token);
};


const getToken = ()=> {
   const token = localStorage.getItem('token');
   if(token){
       return token;
   }
   return null;
}



const login = (data) => {
   return axios.post('/api/v1/auth/login',  data);
}

const userRow = (data) => {
  return axios.get('/api/v1/auth/getuser', data);
}
const getUserEmail = () => {
   const token = getToken();
   if(token){
       const payLoad = jwtDecode(token);
       return payLoad?.email;
   }
   return null;
}
const getUserALL= () => {
  const token = getToken();
  if(token){
      const payLoad = jwtDecode(token);
      return payLoad;
  }
  return null;
}

const getUserRole = () => {
   const token = getToken();
   if(token){
       const payLoad = jwtDecode(token);
       return payLoad?.role;
   }
   return null;
}

const isLoggedIn = () => {
  const token = getToken();
  if (token) {
      const payLoad = jwtDecode(token);
      const isLogin = payLoad && Date.now() < payLoad.exp * 1000;
      return isLogin;
  }
  return false;  // Explicitly return false if there's no token

}
const getuserId = () => {
  const token = getToken();
  if(token){
      const payLoad = jwtDecode(token);
      return payLoad?.userId;
  }
  return null;
}

const logOut = ()=> {
  localStorage.clear();
}

export  const authService = { getUserALL,userRow, logOut,getToken, setToken, login, getUserEmail, getUserRole, getuserId,isLoggedIn};
