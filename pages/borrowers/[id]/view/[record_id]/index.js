import { Box, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import ViewRecordComponent from '../../../../../component/Borrowers/records/ViewRecordComponent';

const RocordsDetails = () => {
  const router = useRouter();
  const [borrowers, setBorrowers] = useState([]);

  const fetchLocalStorageData = () => {
    const _value = JSON.parse(localStorage.getItem("borrower")) || [];
    setBorrowers(_value);
  };

  useEffect(() => {
    fetchLocalStorageData();
  }, []);

  console.log("borrowers", borrowers)

  return (
    <>
      {borrowers?.find((item) => item?.borrower_id === router.query.id) ? (
        <Box m={1} >
             <Box my={1} textAlign={'right'} >
                <Link href={`/borrowers/${router?.query?.id}/view/${router?.query?.record_id}/TransitionCreate`}>
                  <Button variant='contained' sx={{borderRadius : '1.5rem', backgroundColor : "#7D8CC4", textTransform:"none"}} endIcon={<AddIcon  sx={{fontSize:'small'}} />} >Add Transition  </Button>
                </Link>
             </Box>
        <ViewRecordComponent
           records={borrowers?.find((item) => item?.borrower_id === router.query.id)?.records}
        />
        </Box>
      ) : (
        <>
          <Box display={"flex"} justifyContent={"center"} height={"50vh"}>
            <CircularProgress />
          </Box>
        </>
      )}
    </>
   
  )
}

export default RocordsDetails