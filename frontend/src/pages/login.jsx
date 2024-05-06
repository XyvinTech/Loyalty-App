import { Box } from '@mui/material'
import React from 'react'
import LoginForm from '../components/login/loginForm'
import logo from '../assets/logo/logo-new.jpeg';

export default function Login() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f9ced5'
            }}>
            <Box sx={{ borderRadius: '8px',p:4,boxShadow:'0 0 6px #5559', backgroundColor:'#ffffff' }}>
                <Box sx={{mt:1}}>

                    <img width={'100%'} height={'200px'} style={{objectFit:'contain',borderRadius:'50%'}} src={logo} alt="logo" />
                </Box>
                <LoginForm />
            </Box>
        </Box>
    )
}
