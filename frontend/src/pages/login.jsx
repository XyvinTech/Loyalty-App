import { Box } from '@mui/material'
import React from 'react'
import LoginForm from '../components/login/loginForm'
import logo from '../assets/logo/logo-new.jpeg';
import kedmah from '../assets/logo/Kedmah.jpg'

export default function Login() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#c6e980'
            }}>
            <Box sx={{ borderRadius: '8px',p:4,boxShadow:'0 0 6px #5559', backgroundColor:'#ffffff' }}>
                <Box sx={{mt:1}}>

                    <img width={'100%'} height={'100px'} style={{objectFit:'contain',height:'150px',borderRadius:'30%'}} src={kedmah} alt="logo" />
                </Box>
                <LoginForm />
            </Box>
        </Box>
    )
}
