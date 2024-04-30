import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledTable from '../ui/styledTable'
import AddLoyalty from '../components/loyaltycard/addloyalty'
import { getLoyalityCard } from '../services/loyaltyCard'
import { tableHeaderReplace } from '../utils/tableHeaderReplace'

const HEADER = [
    'Title',
    'Brand',
    'Worth',
 
    'Expiry',
    'Number of Coupons',
    'Category',
    'Status'
]

export default function Loyalcard() {
    const [open, setOpen] = useState(false)
    const [loyalityCards, setLoyalityCards] = useState([])
    const [editStatus, setEditStatus] = useState(false)
    const [selectedData, setSelectedData] = useState()

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getLoyalityCard().then((res) => {
            if (res.status) {
                console.log(res.result);
                setLoyalityCards(tableHeaderReplace(res.result, ['title', 'brand', 'worth',  'expiry', 'no_of_cards', 'category', 'status'], HEADER))
            }
        })
    }

    const handleTableAction = (e) => {
        if (e.action === 'Edit') {
            setSelectedData(e.data)
            setEditStatus(true)
            setOpen(true)
        }
    }

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AddLoyalty open={open} onClose={() => { setOpen(false) }} isUpdate={editStatus} loyalityData={selectedData} isSubmitted={init} />
            <Stack direction={"row"}
                sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 0 15px #ccc' }}>
                <Typography variant='h6' sx={{ fontWeight: 600, color: 'secondary.contrastText' }}>Loyal Cards</Typography>
                <Button variant='contained' sx={{backgroundColor:'#c83c4f'}} onClick={() => { setEditStatus(false); setOpen(true) }}>Add Card</Button>
            </Stack>
            <StyledTable header={HEADER} data={loyalityCards} actions={["Edit","Delete"]} isAction onActionClick={handleTableAction} />
        </Box>
    )
}
