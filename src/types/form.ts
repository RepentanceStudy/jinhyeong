export const INPUT_TYPE = {
   TEXT: 'text',
   PAWSSWORD: 'password',
} as const;

type FormError = string | null;

export type FormSchema = {
   [x: string]: {
      value: string;
      validate: (value: string) => FormError;
      onChange?: () => void;
      error?: FormError;
   };
};
