import { CircularProgress } from '@mui/material';
import { ReactNode, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { PATH_APP } from '../../routes';

type Props = {
   children: ReactNode;
};

export default function GuestGuard({ children }: Props) {
   const { isAuthenticated, isInitialized } = useAuth();

   const push = useNavigate();

   useEffect(() => {
      if (isAuthenticated) {
         push(PATH_APP.root);
      }
   }, [isAuthenticated]);

   if (isInitialized === isAuthenticated) {
      return <CircularProgress />;
   }

   return <>{children}</>;
}
