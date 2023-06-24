import { Box, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import BorrowsRecordsTable from '../../../component/Borrowers/records/BorrowsRecordsTable';


const BorrowerRecords = () => {

  return (
    <Box m={1} >
     <BorrowsRecordsTable />
   </Box>
  )
}

export default BorrowerRecords