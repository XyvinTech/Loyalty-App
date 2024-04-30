import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledTable from '../../ui/styledTable'
import { tableHeaderReplace } from '../../utils/tableHeaderReplace'
import { getTransactions } from '../../services/transaction'

const HEADER = [
    'Transaction ID',
    'Customer detail',
    'Loyality Card',
    'Created on',
    'Amount',
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
                console.log(res.result);
                setTransactionData(tableHeaderReplace(res.result, ['_id', 'customer', 'loyality', 'createdAt', 'amount', 'status'], HEADER))
            }
        })
    }
    return (
        <StyledTable header={HEADER} data={transactionData} />
    )
}
