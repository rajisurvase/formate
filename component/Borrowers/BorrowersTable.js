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
import { Box, Button } from '@mui/material';
import { useState } from 'react';



export default function BorrowersTable() {
    const [rows, setRows] = useState([])

    React.useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("borrower"))
          setRows(data? data : [])
      },[])

  return (
    <TableContainer component={Paper} >
        <Box mt={1} >
          <Link href="/borrowers/create" >
            <Button variant='contained' sx={{borderRadius : '1.5rem', backgroundColor : "#7D8CC4", textTransform:"none"}} endIcon={<AddIcon  sx={{fontSize:'small'}} />} >Add Borrower  </Button>
            </Link>
         </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow  sx={{background:"#B2DFFF"}} >
            <TableCell align="center">Borrower</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Email </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.borrower_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background:`${index%2===0? "" : "  #CEF3FF"}` }}
            >
              <TableCell align="center" component="th" scope="row">
              <Link href={`/borrowers/${row?.borrower_id}`} >
                {row.borrower} </Link>
              </TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center" >{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}