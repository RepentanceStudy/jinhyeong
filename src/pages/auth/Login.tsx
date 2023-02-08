import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../../components/Form/FormInput';
import useAuth from '../../hooks/useAuth';
import { PATH_AUTH } from '../../routes';
import { ContentStyle, From } from '../../styles/form';
import { FormSchema, INPUT_TYPE } from '../../types/form';

export default function Login() {
   const { login } = useAuth();
   const [form, setForm] = useState({
      email: '',
      password: '',
   });
   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({
         ...form,
         [name]: value,
      });
   };

   const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         await login(form.email, form.password);
      } catch (error) {
         console.error(error);

         // reset();

         // if (isMountedRef.current) {
         //    setError('afterSubmit', { ...error, message: error.message });
         // }
      }
   };
   return (
      <Container>
         <ContentStyle>
            <Stack direction="column" alignItems="center" sx={{ mb: 2 }}>
               <From onSubmit={handleOnSubmit}>
                  <FormInput
                     onChange={handleOnChange}
                     name={'email'}
                     label="아이디"
                     type={INPUT_TYPE.TEXT}
                     sx={{ mb: 3 }}
                     fullWidth
                  />
                  <FormInput
                     onChange={handleOnChange}
                     name={'password'}
                     label="비밀번호"
                     type={INPUT_TYPE.PAWSSWORD}
                     sx={{ mb: 3 }}
                     fullWidth
                  />

                  <LoadingButton color="secondary" fullWidth type="submit" variant="contained" loading={false}>
                     Sign in
                  </LoadingButton>
               </From>

               <Button sx={{ mt: 3 }} fullWidth href="/register" variant="contained">
                  Sign up
               </Button>
            </Stack>
         </ContentStyle>
      </Container>
   );
}
