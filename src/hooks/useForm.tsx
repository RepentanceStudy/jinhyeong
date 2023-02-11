import { FormEvent, useState } from 'react';
import { FormSchema, FormState } from '../types/form';

type UseInputSchemaReturn = {
   form: FormState;
   isFormValid: boolean;
   handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleOnSubmit: (
      submit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
   ) => (event: FormEvent<HTMLFormElement>) => Promise<void>;
};
const useForm = (formSchema: FormSchema): UseInputSchemaReturn => {
   const initForm = Object.keys(formSchema).reduce((acc, input) => {
      acc = {
         ...acc,
         [input]: {
            value: formSchema[input].value,
            error: formSchema[input].error,
         },
      };
      return acc;
   }, {});

   const [form, setForm] = useState<FormState>(initForm);
   const [isFormValid, setIsFormValid] = useState(false);

   const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const errorMessage = formSchema[name].validate(value, form);

      const changedForm = {
         ...form,
         [name]: { value: value, error: errorMessage },
      };

      setForm(changedForm);
      _isFormValid(changedForm);
   };

   const _isFormValid = (nextForm: FormState): void => {
      const formValues = Object.values(nextForm);
      const hasErrors = formValues.some(data => data.error !== null);
      setIsFormValid(!hasErrors);
   };

   const handleOnSubmit =
      (onSubmit: { (e: FormEvent<HTMLFormElement>): Promise<void> }) =>
      async (formSubmit: FormEvent<HTMLFormElement>) => {
         if (isFormValid) {
            onSubmit(formSubmit);
         } else {
            alert('비정상 접근입니다.');
         }
      };

   return { form, handleOnChange, isFormValid, handleOnSubmit };
};

export { useForm };
