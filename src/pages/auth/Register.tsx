import { LoadingButton } from '@mui/lab';
import { Button, Container, Stack } from '@mui/material';
import { useRef } from 'react';
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
         value: '',
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
         value: '',
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
         value: '',
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

   const { form, handleOnChange, isFormValid } = useInputSchema(RegisterShcema);

   const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();

         await register(form.email.value, form.password.value);
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
                     onChange={handleOnChange}
                     name={'email'}
                     label="아이디"
                     error={!!form.email?.error}
                     helperText={form.email?.error}
                     type={INPUT_TYPE.TEXT}
                     sx={{ mb: 3 }}
                     fullWidth
                  />
                  <FormInput
                     onChange={handleOnChange}
                     inputRef={inputRef}
                     name={'password'}
                     label="비밀번호"
                     error={!!form.password?.error}
                     helperText={form.password?.error}
                     type={INPUT_TYPE.PAWSSWORD}
                     sx={{ mb: 3 }}
                     fullWidth
                  />
                  <FormInput
                     onChange={handleOnChange}
                     name={'confirmPassword'}
                     label="비밀번호 확인"
                     error={!!form.confirmPassword?.error}
                     helperText={form.confirmPassword?.error}
                     type={INPUT_TYPE.PAWSSWORD}
                     sx={{ mb: 3 }}
                     fullWidth
                  />
                  <LoadingButton disabled={!isFormValid} fullWidth type="submit" variant="contained" loading={false}>
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
