import { LoadingButton } from '@mui/lab';
import { Button, Container, Stack } from '@mui/material';
import FormInput from '../../components/Form/FormInput';
import { useForm } from '../../hooks/useForm';
import { ContentStyle, From } from '../../styles/form';
import { FormSchema, INPUT_TYPE } from '../../types/form';
import useAuth from '../../hooks/useAuth';

export default function Login() {
   const { login } = useAuth();

   const loginShcema: FormSchema = {
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

            return null;
         },
      },
   };
   const { form, handleOnChange, isFormValid } = useForm(loginShcema);

   const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         await login(form.email.value, form.password.value);
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
                     error={!!form.email.error}
                     helperText={form.email.error}
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
                     error={!!form.password.error}
                     helperText={form.password.error}
                     type={INPUT_TYPE.PAWSSWORD}
                     sx={{ mb: 3 }}
                     fullWidth
                  />

                  <LoadingButton
                     disabled={!isFormValid}
                     color="secondary"
                     fullWidth
                     type="submit"
                     variant="contained"
                     loading={false}>
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
