import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledTable from '../../ui/styledTable'
import { tableHeaderReplace } from '../../utils/tableHeaderReplace'
import { getTransactions } from '../../services/transaction'

const HEADER = [
    'Transaction ID',
    'Customer detail',
    'Type',
    'Details',
    'Date',
    'Status'
]

export default function Transactions() {
    const [transactionData, setTransactionData] = useState([])

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        getTransactions().then((res) => {
            if (res.status) {
                console.log('trans',res.result);
                setTransactionData(tableHeaderReplace(res.result, ['transactionId', 'user', 'type', 'details', 'date', 'status'], HEADER))
            }
        })
    }
    return (
        <StyledTable header={HEADER} data={transactionData} />
    )
}
