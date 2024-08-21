import { Avatar, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'
// import StyledTableActionCell from './tableAction'
import { useState } from 'react';
import TabelStatus from './tabelStatus';
import StyledTableActionCell from './tableAction';
import StyledLogo from './StyledLogo';
// import TableDescription from './tableDescription';


export default function StyledTable({ header = [], data = [], isAction = false, actions = ["Edit", "Delete"], onActionClick }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} size='small' hover>
                <TableHead sx={{ backgroundColor: '#f1c9ce' }}>
                    <TableRow>
                        {
                            header.map((head, ind) => {
                                // if (head == "icon") {
                                //     return(<TableCell key={ind}/>)
                                // }
                                return (<TableCell key={ind} ><Typography variant='subtitle2' sx={{ fontWeight: 600 }} noWrap>{head}</Typography></TableCell>)
                            })
                        }
                        {isAction && <TableCell />}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map((row, ind) => (
                        <TableRow
                            key={ind}
                            sx={{ height: 5 }}
                        >
                            {
                                header.map((head, ind) => {
                                    if (["amount", "worth"].includes(head.toLowerCase())) {
                                        return (<TableCell key={ind}>
                                            <Stack direction={'row'} spacing={1} sx={{ alignItems: 'center' }}>
                                                <Typography variant='subtitle2'>{row[`${head}`]} </Typography>
                                                <Typography variant='subtitle2' sx={{ fontSize: '10px', color: 'primary.textContrast' }}>OMR</Typography>
                                            </Stack>
                                        </TableCell>)
                                    } else if (head.toLowerCase() === "status") {
                                        return (<TableCell width={'10%'} key={ind} align='center' ><TabelStatus title={row[`${head}`]} /></TableCell>)
                                    } else if (head.toLowerCase() === "logo" || head.toLowerCase() === "image") {
                                        return (<TableCell width={'10%'} key={ind} align='center' ><StyledLogo avatarSize={40} key={ind} avatarUrl={row[`${head}`]} bgColor={"#fff"} /></TableCell>)
                                    }
                                    return (<TableCell key={ind} >{row[`${head}`]}</TableCell>)
                                })
                            }
                            {isAction &&
                                <TableCell sx={{ height: 5 }}>
                                    <StyledTableActionCell actions={actions} onCliked={(e) => { onActionClick && onActionClick({ index: e.index, action: e.action, data: row }) }} />
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <tr style={{ height: 34 * emptyRows }}>
                            <td colSpan={header.length} aria-hidden />
                        </tr>
                    )}
                </TableBody>
                <TableFooter sx={{ height: 50 }}>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
                        colSpan={header.length}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                            select: {
                                'aria-label': 'rows per page',
                            },
                            actions: {
                                showFirstButton: true,
                                showLastButton: true,
                            },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>

        </TableContainer>
    )
}
