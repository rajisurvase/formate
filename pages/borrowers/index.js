import BorrowersTable from '../../component/Borrowers/BorrowersTable'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from 'react';

const List = () => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  

  return (
    <>
        { !isSSR &&
         <Box m={1} >
           <Box my={1} textAlign={'right'} >
                <Link href="/borrowers/create" >
                   <Button variant='contained' sx={{borderRadius : '1.5rem', backgroundColor : "#7D8CC4", textTransform:"none"}} endIcon={<AddIcon  sx={{fontSize:'small'}} />} >Add Borrower  </Button>
                </Link>
              </Box>
             <BorrowersTable />
    </Box>  }
    </>
    
  )
}

export default List