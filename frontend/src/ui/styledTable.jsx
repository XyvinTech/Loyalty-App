import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'
// import StyledTableActionCell from './tableAction'
import { useState } from 'react';
// import TableDescription from './tableDescription';


export default function StyledTable({ header = [], data = [], isAction = true, actions = ["Edit", "Delete"], onActionClick }) {

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
                <TableHead sx={{backgroundColor:'primary.lighter'}}>
                    <TableRow>
                        {
                            header.map((head, ind) => {
                                // if (head == "icon") {
                                //     return(<TableCell key={ind}/>)
                                // }
                                return(<TableCell key={ind} ><Typography variant='subtitle2' noWrap>{head}</Typography></TableCell>)
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
                                    // if (head == "icon") {
                                    //     return(<TableCell key={ind}><img src={`${row[`${head}`]}`} style={{objectFit:'contain',height:'40px',width:'40px'}}/></TableCell>)
                                    // }else if(head.toLowerCase() == "description"){
                                    //     return(<TableCell key={ind}><TableDescription text={row[`${head}`]}/></TableCell>)
                                    // }
                                    return(<TableCell key={ind}>{row[`${head}`]}</TableCell>)
                                })
                            }
                            {/* <TableCell sx={{ height: 5 }}>
                                <StyledTableActionCell actions={actions} onCliked={(e) => { onActionClick && onActionClick({ index: e.index, action: e.action, data: row }) }} />
                            </TableCell> */}
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
