import { Button } from '@mui/material';
import useAuth from '../hooks/useAuth';

export default function Home() {
   const { logout } = useAuth();

   return (
      <div>
         <p>Login After Page!</p>
         <Button onClick={() => logout()}>Logout</Button>
      </div>
   );
}
