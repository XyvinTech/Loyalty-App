import { Badge, Chip, Typography, colors } from '@mui/material'
import React from 'react'

const chipColor = (status) => {
    if (['success', 'paid', 'active'].includes(status.toLowerCase())) {
        return '#25a100' //returns green
    } else if (['attempted'].includes(status.toLowerCase())) {
        return '#028ebd' //returns blue
    } else if (['failed', "fail", 'inactive'].includes(status.toLowerCase())) {
        return '#ba0000' //returns red
    }
    return '#a2acb0' //returns grey
}

export default function TabelStatus({ title }) {
    return (
        <Chip label={<Typography variant='subtitle2'
            sx={{ color: 'white', fontWeight: 600, textAlign: 'center' }}>
            {title}
        </Typography>} sx={{ backgroundColor: chipColor(title), color: '#fff' }} />
    )
}
