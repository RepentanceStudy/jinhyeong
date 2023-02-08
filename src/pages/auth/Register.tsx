import { LoadingButton } from '@mui/lab';
import { Button, Container, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import FormInput from '../../components/Form/FormInput';
import useAuth from '../../hooks/useAuth';
import useInputSchema from '../../hooks/useInputSchema';

import { ContentStyle, From } from '../../styles/form';
import { FormSchema, INPUT_TYPE } from '../../types/form';

export default function Register() {
   const { register } = useAuth();

   const inputRef = useRef<HTMLInputElement>(null);

   const RegisterShcema: FormSchema = {
      email: {
         validate: (value: string) => {
            if (!value) {
               return '입력이 필요합니다.';
            }
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
               return '올바른 형식이 아닙니다.';
            }
            return null;
         },
      },
      password: {
         validate: (value: string) => {
            if (!value) {
               return '입력이 필요합니다.';
            }
            if (value.length < 8) {
               return '8자리 이상을 입력해주세요.';
            }
            return null;
         },
      },
      confirmPassword: {
         validate: (confirmPasswordValue: string) => {
            if (!confirmPasswordValue) {
               return '입력이 필요합니다.';
            }
            const passwordValue = inputRef.current!.value;
            if (passwordValue !== confirmPasswordValue) {
               return '비밀번호가 일치하지 않습니다.';
            }
            return null;
         },
      },
   };

   const useform = useInputSchema(
      {
         email: '',
         password: '',
         confirmPassword: '',
      },
      RegisterShcema,
   );

   const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         const form = useform.getForm();

         await register(form['password'], form['password']);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Container>
         <ContentStyle>
            <Stack direction="column" alignItems="center" sx={{ mb: 2 }}>
               <From onSubmit={handleOnSubmit}>
                  <FormInput
                     onChange={useform.handleOnChange}
                     name={'email'}
                     label="아이디"
                     error={useform.error?.['email']?.isError}
                     helperText={useform.error?.['email']?.message}
                     type={INPUT_TYPE.TEXT}
                     sx={{ mb: 3 }}
                     fullWidth
                  />
                  <FormInput
                     onChange={useform.handleOnChange}
                     inputRef={inputRef}
                     name={'password'}
                     label="비밀번호"
                     error={useform.error?.['password']?.isError}
                     helperText={useform.error?.['password']?.message}
                     type={INPUT_TYPE.PAWSSWORD}
                     sx={{ mb: 3 }}
                     fullWidth
                  />
                  <FormInput
                     onChange={useform.handleOnChange}
                     name={'confirmPassword'}
                     label="비밀번호 확인"
                     error={useform.error?.['confirmPassword']?.isError}
                     helperText={useform.error?.['confirmPassword']?.message}
                     type={INPUT_TYPE.PAWSSWORD}
                     sx={{ mb: 3 }}
                     fullWidth
                  />
                  <LoadingButton disabled={false} fullWidth type="submit" variant="contained" loading={false}>
                     Sign up
                  </LoadingButton>
               </From>

               <Button color="secondary" sx={{ mt: 3 }} fullWidth href="/login" variant="contained">
                  Sign in
               </Button>
            </Stack>
         </ContentStyle>
      </Container>
   );
}
