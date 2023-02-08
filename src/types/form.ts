export const INPUT_TYPE = {
   TEXT: 'text',
   PAWSSWORD: 'password',
} as const;

export type FormSchema = {
   [x: string]: {
      validate: (value: string) => string | null;
      onChange?: () => void;
   };
};
