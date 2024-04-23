import { Box } from '@mui/material'
import React from 'react'
import StyledTable from '../../ui/styledTable'
import { transactionData } from '../../assets/json/payments'

const HEADER = [
    'Transaction ID',
    'Market',
    'Customer detail',
    'Loyality Card',
    'Created on',
    'Amount',
    'Status'
]

export default function Transactions() {
    return (
        <StyledTable header={HEADER} data={transactionData} />
    )
}
