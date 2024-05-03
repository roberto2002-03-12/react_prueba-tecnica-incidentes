import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import { TextFieldInputHookForm } from '../models'

export const TextFieldWithHookForm: React.FC<TextFieldInputHookForm & TextFieldProps> = 
(
  { 
    name, 
    control, 
    label, 
    defaultValue, 
    rules,
    variant = 'outlined',
    ...props 
  }
) => {
  return (
     <Controller
       name={name}
       control={control}
       rules={rules}
       defaultValue={defaultValue}
       render={({ field }) => (
         <TextField
           variant={variant}
           label={label}
           size="small"
           {...field}
           {...props}
         />
       )}
     />
  );
 };