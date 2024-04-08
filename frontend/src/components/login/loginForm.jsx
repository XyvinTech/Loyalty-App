import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { LockOutlined, Person, PersonOffOutlined, PersonOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import React, { useState } from 'react'

export default function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    return (
        <Box sx={{ width: { xs: '80vw', md: '25vw' } }}>
            <Stack spacing={2} sx={{}}>
                <TextField
                    fullWidth
                    variant='standard'
                    label="Username"
                    placeholder='Enter Username'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonOutlined />
                            </InputAdornment>
                        ),
                    }} />
                <TextField
                    fullWidth
                    variant='standard'
                    label="Password"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder='Enter Password'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={() => { setPasswordVisible(!passwordVisible) }}>
                                    {passwordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }} />
            </Stack>
            <Box sx={{ mt:5 }}>
                <Button variant='contained' sx={{borderRadius: 8,width:'100%'}}>Submit</Button>
            </Box>
            <Box sx={{ mt:5,display:'flex' }}>
                <Typography sx={{color:'#777',cursor:'pointer',userSelect:'none'}}>Forgot Password?</Typography>
            </Box>
        </Box>
    )
}
