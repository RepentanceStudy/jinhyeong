// library
import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../types/auth';
import { PATH_AUTH } from '../routes';

const LoginTypes = {
   Initial: 'INITIALIZE',
   Login: 'LOGIN',
   Logout: 'LOGOUT',
   Register: 'REGISTER',
} as const;
type LoginTypes = typeof LoginTypes[keyof typeof LoginTypes];

type JWTAuthPayload = {
   [LoginTypes.Initial]: {
      isAuthenticated: boolean;
      user: AuthUser;
   };
   [LoginTypes.Login]: {
      user: AuthUser;
   };
   [LoginTypes.Logout]: undefined;
   [LoginTypes.Register]: {
      user: AuthUser;
   };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
   isAuthenticated: false,
   isInitialized: false,
   user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
   switch (action.type) {
      case 'INITIALIZE':
         return {
            isAuthenticated: action.payload.isAuthenticated,
            isInitialized: true,
            user: action.payload.user,
         };
      case 'LOGIN':
         return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
         };
      case 'LOGOUT':
         return {
            ...state,
            isAuthenticated: false,
            user: null,
         };

      case 'REGISTER':
         return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
         };

      default:
         return state;
   }
};

const AuthContext = createContext<JWTContextType | null>(null);

type AuthProviderProps = {
   children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
   const [state, dispatch] = useReducer(JWTReducer, initialState);

   useEffect(() => {
      const initialize = async () => {
         try {
            const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

            if (accessToken && isValidToken(accessToken)) {
               setSession(accessToken);

               const [_header, payload] = accessToken.split('.');
               const userEmail = window.atob(payload);

               dispatch({
                  type: LoginTypes.Initial,
                  payload: {
                     isAuthenticated: true,
                     user: {
                        email: userEmail,
                     },
                  },
               });
            } else {
               dispatch({
                  type: LoginTypes.Initial,
                  payload: {
                     isAuthenticated: false,
                     user: null,
                  },
               });
            }
         } catch (error) {
            dispatch({
               type: LoginTypes.Initial,
               payload: {
                  isAuthenticated: false,
                  user: null,
               },
            });
         }
      };

      initialize();
   }, []);

   const login = async (email: string, password: string) => {
      const response = await axios.post('/users/login', {
         email,
         password,
      });
      const { token, message } = response.data;

      setSession(token);

      dispatch({
         type: LoginTypes.Login,
         payload: {
            user: { email },
         },
      });
      alert(message);
   };

   const register = async (email: string, password: string) => {
      await axios.post('/users/create', {
         email,
         password,
      });

      dispatch({
         type: LoginTypes.Register,
         payload: {
            user: { email },
         },
      });
      window.location.href = PATH_AUTH.root;
   };

   const logout = async () => {
      setSession(null);
      dispatch({ type: LoginTypes.Logout });
      console.log('as');
      window.location.href = PATH_AUTH.root;
   };

   return (
      <AuthContext.Provider
         value={{
            ...state,
            method: 'jwt',
            login,
            logout,
            register,
         }}>
         {children}
      </AuthContext.Provider>
   );
}

export { AuthContext, AuthProvider };
