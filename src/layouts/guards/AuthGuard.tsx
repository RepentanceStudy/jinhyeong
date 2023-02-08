import { CircularProgress } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

type Props = {
   children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
   const { isAuthenticated, isInitialized } = useAuth();

   const push = useNavigate();
   const { pathname } = useLocation();

   const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

   useEffect(() => {
      if (requestedLocation && pathname !== requestedLocation) {
         push(requestedLocation);
      }
      if (isAuthenticated) {
         setRequestedLocation(null);
      }
   }, [isAuthenticated, pathname, push, requestedLocation]);

   if (!isInitialized) {
      return <CircularProgress />;
   }

   if (!isAuthenticated) {
      if (pathname !== requestedLocation) {
         setRequestedLocation(pathname);
      }
      return <Navigate to="/login" replace />;
   }

   return <>{children}</>;
}
