import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link'
import { Alert, Box, Button, Pagination } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';



export default function TransitionTable({data}) {
    // const [rows, setRows] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const {query} = useRouter()
    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handlePageChange = (event, page) => {
      setCurrentPage(page);
    };

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow  sx={{background:"#B2DFFF"}} >
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Withdrawals </TableCell>
            <TableCell align="center">Deposits </TableCell>           
            <TableCell align="center">Balance </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data?.length>0 && data.slice(indexOfFirstItem, indexOfLastItem).map((row, index) => (
            <TableRow
              key={row.borrower_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background:`${index%2===0? "" : "  #CEF3FF"}` }}
            >
              <TableCell align="center" component="th" scope="row">
                {moment(row.purchaseDate)?.format('DD-MM-YYYY')} 
              </TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center" >{row.withDrawals}</TableCell>
              <TableCell align="center" >{row.deposits}</TableCell>
              <TableCell align="center" >{row.balance.toFixed(2)}</TableCell>
            </TableRow>
          ))}
         <TableRow> {data?.length <=0 && <Alert severity="warning" width='100%' >No Data Found!</Alert>} </TableRow>

        </TableBody>
      </Table>
      <Box display={'flex'} justifyContent={'center'} >
      {data?.length > 0 &&   <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      /> }
      </Box>
    </TableContainer>
  );
}