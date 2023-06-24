import { Box, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RecordsTable from '../../../component/records/RecordsTable';


const BorrowerRecords = () => {

  return (
    <Box m={1} >
     <RecordsTable />

   </Box>
  )
}

export default BorrowerRecords