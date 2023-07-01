import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TotalInterestAmount from '../../../util/TotalInterestAmount';
import dayjs from 'dayjs';
import moment from 'moment';
import { useRouter } from 'next/router';


export default function BorrowsRecordsTable({records}) {
  const router = useRouter()
  const [rows, setRows] = React.useState([])
  const [todayDate, setTodayDate] = React.useState(dayjs(new Date()));


  React.useEffect(()=>{
    setRows(records)
  }, [])


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{background:"#B2DFFF"}} >
          <TableRow>
            <TableCell>Borrower </TableCell>
            <TableCell align="right">Principle Amount</TableCell>
            <TableCell align="right">Interest Amount</TableCell>
            <TableCell align="right">ROI&nbsp;(%)</TableCell>
            <TableCell align="right">Purchase Date </TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const timeDiff = todayDate.diff(row?.purchaseDate)/(1000 * 60 * 60 * 24)
            return (
            <TableRow onClick={()=>router.push("/")}
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },  background:`${index%2===0? "" : "  #CEF3FF"}`, cursor: "pointer" }}
            >
              <TableCell component="th" scope="row">
                {row.borrowerName}
              </TableCell>
              <TableCell align="right">{Number(row?.principalAmount)?.toFixed(2)}</TableCell>
              <TableCell align="right">{row?.principalAmount && row?.roi && timeDiff && TotalInterestAmount(row?.principalAmount,row?.roi,timeDiff).toFixed(2)}</TableCell>
              <TableCell align="right">{row.roi}%</TableCell>
              <TableCell align="right">{moment(row?.purchaseDate).format('MMMM Do YYYY')}</TableCell>
              <TableCell align="right" sx={{color:`${row?.status==="pending"? 'red' : "green"}`}} >{row?.status==='pending'? 'Balance':'Paid'}</TableCell>
              <TableCell align="right">{row?.status==="paid"? row?.totalAmount?.toFixed(2) : (TotalInterestAmount(row?.principalAmount,row?.roi,timeDiff) + Number(row?.principalAmount)).toFixed(2)}</TableCell>
            </TableRow>
          )
          } )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
