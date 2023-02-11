export const INPUT_TYPE = {
   TEXT: 'text',
   PAWSSWORD: 'password',
} as const;

export type FormError = string | null | undefined;

export type FormState = {
   [name: string]: {
      value: string;
      error: FormError;
   };
};

export type FormSchema = {
   [x: string]: {
      value: string;
      error?: FormError;
      validate: (value: string, formState?: FormState | undefined) => FormError;
      onChange?: () => void;
   };
};
