import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import StyledTable from '../ui/styledTable'
import { coupenData } from '../assets/json/coupen'
import AddLoyalty from '../components/loyaltycard/addloyalty'

const HEADER = [
    'Coupen ID',
    'worth',
    'Vendor Code',
    'Expiry',
    'Number of Coupen',
    'tags',
    'Status'
]

export default function Loyalcard() {
    const [open,setOpen] = useState(false)
    return (
        <Box sx={{ p: 2,display:'flex' ,flexDirection:'column',gap:2}}>
            <AddLoyalty open={open} onClose={()=>{setOpen(false)}}/>
            <Stack direction={"row"}
                sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 0 15px #ccc' }}>
                <Typography variant='h6' sx={{ fontWeight: 600, color: 'secondary.contrastText' }}>Loyal Cards</Typography>
                <Button variant='contained' onClick={()=>{setOpen(true)}}>Add Card</Button>
            </Stack>
            <StyledTable header={HEADER} data={coupenData}/>
        </Box>
    )
}
