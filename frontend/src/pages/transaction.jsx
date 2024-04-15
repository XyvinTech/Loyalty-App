import { Stack, Typography } from '@mui/material'
import React from 'react'
import Transactions from '../components/transaction/transactions'

export default function Transaction() {
  return (
    <Stack sx={{ p: 3 }} spacing={2}>
      <Stack direction={"row"}
        sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 0 15px #ccc' }}>
        <Typography variant='h6' sx={{ fontWeight: 600, color: 'secondary.contrastText' }}>Transactions</Typography>
      </Stack>
      <Transactions />
    </Stack>
  )
}
