import { Box } from '@mui/material'
import React from 'react'
import StyledTable from '../../ui/styledTable'
import { paymentData } from '../../assets/json/payments'

const HEADER = [
    'Payment ID',
    'Bank RRN',
    'Customer detail',
    'Created on',
    'Amount',
    'Status'
]

export default function Payments() {
  return (
    <Box sx={{p:2}}>
        <StyledTable header={HEADER} data={paymentData} />
    </Box>
  )
}
