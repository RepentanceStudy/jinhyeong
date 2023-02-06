import { Route, Routes } from 'react-router-dom';
import AuthGuard from './layouts/guards/AuthGuard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';

function App() {
   return (
      <Routes>
         <Route
            index
            path="/"
            element={
               <AuthGuard>
                  <Home />
               </AuthGuard>
            }
         />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
      </Routes>
   );
}

export default App;
