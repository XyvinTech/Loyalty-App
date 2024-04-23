import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledTable from '../ui/styledTable'
import { tableHeaderReplace } from '../utils/tableHeaderReplace'
import { deleteCategory, getCategory } from '../services/category'
import AddCategory from '../components/category/addCategory'
import { toast } from 'react-toastify'

const HEADER = [
    'Title',
    'created on',
]

export default function Categories() {
    const [open, setOpen] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [editStatus, setEditStatus] = useState(false)
    const [selectedData, setSelectedData] = useState()

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getCategory().then((res) => {
            if (res.status) {
                console.log(res.result);
                setCategoryData(tableHeaderReplace(res.result, ['title', 'createdAt'], HEADER))
            }
        })
    }
    const deleteCategories = (id)=>{
        deleteCategory(id).then(res=>{
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
            deleteCategories(e.data._id)
        }
    }

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AddCategory open={open} onClose={() => { setOpen(false) }} isUpdate={editStatus} categoryData={selectedData} isSubmitted={init} />
            <Stack direction={"row"}
                sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 0 15px #ccc' }}>
                <Typography variant='h6' sx={{ fontWeight: 600, color: 'secondary.contrastText' }}>Categories</Typography>
                <Button variant='contained' onClick={() => { setEditStatus(false); setOpen(true) }}>Add Category</Button>
            </Stack>
            <StyledTable header={HEADER} data={categoryData} actions={["Edit","Delete"]} isAction onActionClick={handleTableAction} />
        </Box>
    )
}
