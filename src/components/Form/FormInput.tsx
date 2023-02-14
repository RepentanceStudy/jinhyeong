import { FormControl, TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

type Props = {
   name: string;
   label: string;
   value?: string;
   type: string;
};
type InputProps = Props & TextFieldProps;

const FormInputText: FC<InputProps> = ({ name, label, value, type, ...other }) => (
   <FormControl sx={{ width: '100%' }}>
      <TextField name={name} type={type} label={label} defaultValue={value ? value : ''} {...other} />
   </FormControl>
);

export default FormInputText;
