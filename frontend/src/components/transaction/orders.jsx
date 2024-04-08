import { Box } from '@mui/material'
import React from 'react'
import StyledTable from '../../ui/styledTable'
import { paymentData } from '../../assets/json/payments'
import { ordersData } from '../../assets/json/orders'

const HEADER = [
    'Order Id',
    'Amount',
    'Attempts',
    'Receipt',
    'Created At',
    'Status'
]

export default function Orders() {
  return (
    <Box sx={{p:2}}>
        <StyledTable header={HEADER} data={ordersData} />
    </Box>
  )
}
