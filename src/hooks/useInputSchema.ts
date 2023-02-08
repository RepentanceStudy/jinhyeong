import { useState } from 'react';
import { FormSchema } from '../types/form';

type ErrorState = {
   [x: string]: { message: string | null; isError: boolean };
};
type Form = {
   [x: string]: string;
};
type useInputSchemaReturn = {
   form: Form;
   getForm: () => Form;
   error: ErrorState | null;
   handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const useInputSchema = (initform: Record<string, string | boolean>, formSchema: FormSchema): useInputSchemaReturn => {
   const [form, setForm] = useState(initform);
   const [error, setError] = useState<ErrorState | null>(null);

   const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setForm({
         ...form,
         [name]: value,
      });

      const validationMessage = formSchema[name].validate(value);
      setError(prevState => {
         return {
            ...prevState,
            [name]: { message: validationMessage, isError: validationMessage == null ? false : true },
         };
      });
   };
   const getForm = () => {
      return form;
   };
   return { form, error, handleOnChange, getForm };
};

export default useInputSchema;
