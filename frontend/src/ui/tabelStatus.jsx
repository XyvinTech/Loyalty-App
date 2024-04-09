import { Badge, Chip, Typography, colors } from '@mui/material'
import React from 'react'

const chipColor = (status) => {
    if (['success', 'paid','active'].includes(status.toLowerCase())) {
        return '#25a100' //returns green
    } else if (['attempted'].includes(status.toLowerCase())) {
        return '#028ebd' //returns blue
    }else if (['failed',"fail",'inactive'].includes(status.toLowerCase())) {
        return '#ba0000' //returns red
    }
    return '#a2acb0' //returns grey
}

export default function TabelStatus({ title }) {
    return (
        <Typography variant='subtitle2'
            sx={{ p: 0.2, backgroundColor: chipColor(title), color: 'white', fontWeight: 600, borderRadius: 10,textAlign:'center' }}>
            {title}
        </Typography>
    )
}
