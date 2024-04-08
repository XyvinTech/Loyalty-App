import { Box } from '@mui/material'
import React from 'react'
import LoginForm from '../components/login/loginForm'

export default function Login() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
            <Box sx={{ borderRadius: '8px',p:4,boxShadow:'0 0 6px #5559' }}>
                <Box sx={{mt:1,mb:5}}>
                    <img width={'100%'} height={'50px'} style={{objectFit:'contain'}} src='https://www.pngkey.com/png/full/529-5291672_sample-logo-png-transparent-background.png' />
                </Box>
                <LoginForm />
            </Box>
        </Box>
    )
}
