import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledTable from '../ui/styledTable'
import { tableHeaderReplace } from '../utils/tableHeaderReplace'
import { deleteApp, getApp } from '../services/apps'
import { toast } from 'react-toastify'
import AddApp from '../components/apps/addApp'

const HEADER = [
    'Logo',
    'Title',
    'Description',
    'Created on',
]

export default function Apps() {
    const [open, setOpen] = useState(false)
    const [appsData, setAppsData] = useState([])
    const [editStatus, setEditStatus] = useState(false)
    const [selectedData, setSelectedData] = useState()

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getApp().then((res) => {
            if (res.status) {
                console.log(res.result)
                setAppsData(tableHeaderReplace(res.result, [ 'logo', 'title', 'description',  'createdAt'], HEADER))
            }
        })
    }

    const deleteApps = (id)=>{
        deleteApp(id).then(res=>{
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
            deleteApps(e.data._id)
        }
    }


    console.log(appsData)

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AddApp open={open} onClose={() => { setOpen(false) }} isUpdate={editStatus} appsData={selectedData} isSubmitted={init} />
            <Stack direction={"row"}
                sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 0 15px #ccc' }}>
                <Typography variant='h6' sx={{ fontWeight: 600, color: 'secondary.contrastText' }}>Apps</Typography>
                <Button variant='contained' onClick={() => { setEditStatus(false); setOpen(true) }}>Add App</Button>
            </Stack>
            <StyledTable header={HEADER} data={appsData} actions={["Edit","Delete"]} isAction onActionClick={handleTableAction} />
        </Box>
    )
}
