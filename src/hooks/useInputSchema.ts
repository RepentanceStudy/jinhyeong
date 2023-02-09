import { useState } from 'react';
import { FormSchema } from '../types/form';

type Form = {
   [name: string]: {
      value: string;
      error: string | null;
   };
};
type useInputSchemaReturn = {
   form: Form;
   isFormValid: boolean;
   handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const useInputSchema = (formSchema: FormSchema): useInputSchemaReturn => {
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

   const [form, setForm] = useState<Form>(initForm);
   const [isFormValid, setIsFormValid] = useState(false);

   const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const errorMessage = formSchema[name].validate(value);

      const changedForm = {
         ...form,
         [name]: { value: value, error: errorMessage },
      };

      setForm(changedForm);
      _isFormValid(changedForm);
   };

   const _isFormValid = (nextForm: Form): void => {
      const formValues = Object.values(nextForm);
      const hasErrors = formValues.some(data => data.error !== null);

      setIsFormValid(!hasErrors);
   };

   return { form, handleOnChange, isFormValid };
};

export default useInputSchema;
