import jwtDecode from 'jwt-decode';
// routes
import { PATH_AUTH } from '../routes';
import axios from './axios';

const isValidToken = (accessToken: string) => {
   if (!accessToken) {
      return false;
   }

   const decoded = jwtDecode<{ exp: number }>(accessToken);

   const currentTime = Date.now() / 1000;

   return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
   let expiredTimer;

   const currentTime = Date.now();

   const timeLeft = exp * 1000 - currentTime;

   clearTimeout(expiredTimer);

   expiredTimer = setTimeout(() => {
      alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요.');

      localStorage.removeItem('accessToken');

      window.location.href = PATH_AUTH.login;
   }, timeLeft);
};

const setSession = (accessToken: string | null) => {
   try {
      if (accessToken) {
         const token = updateTokenExp(accessToken);
         localStorage.setItem('accessToken', token);
         axios.defaults.headers.common.Authorization = `Bearer ${token}`;

         const { exp } = jwtDecode<{ exp: number }>(token);
         handleTokenExpired(exp);
      } else {
         localStorage.removeItem('accessToken');
         delete axios.defaults.headers.common.Authorization;
      }
   } catch (error) {
      console.error(error);
   }
};

const updateTokenExp = (accessToken: string) => {
   const [_header, payload] = accessToken.split('.');
   const payloadDecoded = window.atob(payload);

   const updatedPayload = {
      data: payloadDecoded,
      exp: Math.floor(Date.now() / 1000) + 20,
   };
   const updatedToken = [JSON.parse(window.atob(_header)), updatedPayload]
      .map(part => window.btoa(JSON.stringify(part)))
      .join('.');

   return updatedToken;
};

export { isValidToken, setSession };
