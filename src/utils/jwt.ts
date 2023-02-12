import jwtDecode from 'jwt-decode';
// routes
import { PATH_AUTH } from '../routes';
import axios from './axios';

const isValidToken = (accessToken: string) => {
   if (!accessToken) {
      return false;
   }

   const [_header, payload] = accessToken.split('.');
   const payloadDecoded = window.atob(payload);

   // const decoded = jwtDecode<{ exp: number }>(accessToken);

   // const currentTime = Date.now() / 1000;

   // return decoded.exp > currentTime;
   return payloadDecoded;
};

const handleTokenExpired = (exp: number) => {
   // eslint-disable-next-line prefer-const
   let expiredTimer;

   const currentTime = Date.now();

   const timeLeft = exp * 1000 - currentTime;

   clearTimeout(expiredTimer);

   expiredTimer = setTimeout(() => {
      alert('Token expired');

      localStorage.removeItem('accessToken');

      window.location.href = PATH_AUTH.login;
   }, timeLeft);
};

const setSession = (accessToken: string | null) => {
   try {
      if (accessToken) {
         console.log(accessToken);
         localStorage.setItem('accessToken', accessToken);
         axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

         // const { exp } = jwtDecode<{ exp: number }>(accessToken);
         // handleTokenExpired(exp);
      } else {
         localStorage.removeItem('accessToken');
         delete axios.defaults.headers.common.Authorization;
      }
   } catch (error) {
      console.error(error);
   }
};

export { isValidToken, setSession };
