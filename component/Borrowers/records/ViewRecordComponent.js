import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ViewRecordComponent = ({ records }) => {
  const router = useRouter()
  const [details, setDetails] = useState({})

  useEffect(() => {
    setDetails(records?.find(item => item.id === router?.query?.record_id))
  }, [records])


  return (
    <>
      {details?.id ?
        <>
          {/* <Typography variant='h6' >  Borrower Name : {details?.borrowerName} </Typography>
          <Typography variant='h6' > Due Date : {moment(details?.duePaymentDate).format("MMMM Do YYYY")} </Typography>
          <Typography variant='h6' > Records : {details?.id} </Typography>
          <Typography variant='h6' > Interest Amount : {details?.interestAmount} </Typography>
          <Typography variant='h6' > Principal Amount : {details?.principalAmount} </Typography>
          <Typography variant='h6' > Purchase Date : {moment(details?.purchaseDate).format("MMMM Do YYYY")} </Typography>
          <Typography variant='h6' > ROI : {details?.roi} </Typography>
          <Typography variant='h6' > Total Amount : {details?.totalAmount} </Typography> */}
          
          <Grid container spacing={2} >
            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' > Borrower Name :  </Typography>
                    <Typography  >{details?.borrowerName}  </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' >  Due Date :  </Typography>
                    <Typography  >  {moment(details?.duePaymentDate).format("MMMM Do YYYY")}  </Typography>
                </Box>
            </Grid>
          </Grid>

        </> :
        <>
          <Box display={"flex"} justifyContent={"center"} height={"50vh"}>
            <CircularProgress />
          </Box>
        </>}
    </>
  )
}

export default ViewRecordComponent