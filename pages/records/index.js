import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import RecordsTable from '../../component/records/RecordsTable'

const Index = () => {
  const [isSSR, setIsSSR] = useState(true);

useEffect(() => {
	setIsSSR(false);
}, []);
  return (
    <>
    { !isSSR && 
    <Box m={1} >
        <RecordsTable  />
    </Box>
  }
    </>
  )
}

export default Index