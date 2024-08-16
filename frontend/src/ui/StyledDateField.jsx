import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

export default function StyledDateField({ placeholder, leftIcon, rightIcon, height = '40px', ...props }) {
  return (
    <TextField
      type="date"
      placeholder={placeholder}
      InputLabelProps={{
        shrink: true,  // This ensures the placeholder is displayed correctly
      }}
      InputProps={{
        style: { height: height, width: '100%' },
        startAdornment: leftIcon && (<InputAdornment position="end">{leftIcon}</InputAdornment>),
        endAdornment: rightIcon && (<InputAdornment position="end">{rightIcon}</InputAdornment>),
      }} {...props} />
  );
}
