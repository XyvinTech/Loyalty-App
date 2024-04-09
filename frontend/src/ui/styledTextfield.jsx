import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

export default function StyledTextfield({ placeholder, type, leftIcon, rightIcon, height = '40px', ...props }) {
  return (
    <TextField
      type={type && type}
      placeholder={placeholder}
      InputProps={{
        style: { height: height, width: '100%' },
        startAdornment: leftIcon && (<InputAdornment position="end">{leftIcon}</InputAdornment>),
        endAdornment: rightIcon && (<InputAdornment position="end">{rightIcon}</InputAdornment>),
      }} {...props} />
  )
}
