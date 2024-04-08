import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import StyledTab from '../ui/styledTab'
import Payments from '../components/transaction/payments'
import Orders from '../components/transaction/orders'

export default function Transaction() {
  const [tabValue, setTabValue] = useState(0)
  return (
    <Box sx={{p:2}}>
      <Stack sx={{ backgroundColor: 'white',p:1,borderRadius:'4px',boxShadow:'0 0 15px #ccc' }}>
        <StyledTab tabs={['Payments', 'Orders']} onChange={(v) => { setTabValue(v) }} />
        {tabValue == 0 ? <Payments/> : <Orders/>}
      </Stack>
    </Box>
  )
}
