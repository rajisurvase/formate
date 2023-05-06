import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RecordsTable from '../../component/records/RecordsTable'

const index = () => {
  const [isSSR, setIsSSR] = useState(true);

useEffect(() => {
	setIsSSR(false);
}, []);
  return (
    <Box m={1} >
    { !isSSR && 
        <RecordsTable  />
    }
    </Box>
  )
}

export default index