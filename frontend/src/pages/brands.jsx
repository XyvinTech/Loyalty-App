import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledTable from '../ui/styledTable'
import { tableHeaderReplace } from '../utils/tableHeaderReplace'
import AddCategory from '../components/category/addCategory'
import { deleteBrand, getBrand } from '../services/brands'
import { toast } from 'react-toastify'
import AddBrand from '../components/brands/addBrand'

const HEADER = [
    'Logo',
    'Title',
    'created on',
]

export default function Brands() {
    const [open, setOpen] = useState(false)
    const [brandData, setBrandData] = useState([])
    const [editStatus, setEditStatus] = useState(false)
    const [selectedData, setSelectedData] = useState()

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getBrand().then((res) => {
            if (res.status) {
                setBrandData(tableHeaderReplace(res.result, [ 'logo', 'title', 'createdAt'], HEADER))
            }
        })
    }

    const deleteBrands = (id)=>{
        deleteBrand(id).then(res=>{
            toast.success(res.message)
            init()
        })
    }

    const handleTableAction = (e) => {
        if (e.action === 'Edit') {
            setSelectedData(e.data)
            setEditStatus(true)
            setOpen(true)
        }else if (e.action === 'Delete'){
            deleteBrands(e.data._id)
        }
    }

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AddBrand open={open} onClose={() => { setOpen(false) }} isUpdate={editStatus} brandData={selectedData} isSubmitted={init} />
            <Stack direction={"row"}
                sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 0 15px #ccc' }}>
                <Typography variant='h6' sx={{ fontWeight: 600, color: 'secondary.contrastText' }}>Brands</Typography>
                <Button variant='contained' onClick={() => { setEditStatus(false); setOpen(true) }}>Add Brands</Button>
            </Stack>
            <StyledTable header={HEADER} data={brandData} actions={["Edit","Delete"]} isAction onActionClick={handleTableAction} />
        </Box>
    )
}
