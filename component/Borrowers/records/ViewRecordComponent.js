import { Padding } from '@mui/icons-material'
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
        <Typography variant='h5'sx={{backgroundColor : 'aqua', padding: "1rem 2rem", borderRadius: "1rem" }} >Borrower Details</Typography>

          {/* <Typography variant='h6' >  Borrower Name : {details?.borrowerName} </Typography>
          <Typography variant='h6' > Due Date : {moment(details?.duePaymentDate).format("MMMM Do YYYY")} </Typography>
          <Typography variant='h6' > Records : {details?.id} </Typography>
          <Typography variant='h6' > Interest Amount : {details?.interestAmount} </Typography>
          <Typography variant='h6' > Principal Amount : {details?.principalAmount} </Typography>
          <Typography variant='h6' > Purchase Date : {moment(details?.purchaseDate).format("MMMM Do YYYY")} </Typography>
          <Typography variant='h6' > ROI : {details?.roi} </Typography>
          <Typography variant='h6' > Total Amount : {details?.totalAmount} </Typography> */}
          
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' > Borrower Name :  </Typography>
                    <Typography px={1} >{details?.borrowerName}  </Typography>
                </Box>
            </Grid>
           
            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' >  Due Date :  </Typography>
                    <Typography px={1} >  {moment(details?.duePaymentDate).format("MMMM Do YYYY")}  </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' >  Records :  </Typography>
                    <Typography px={1} >  {details?.id}  </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' >  Interest Amount :  </Typography>
                    <Typography px={1} >  {details?.interestAmount.toFixed(2)}  </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' >  Principal Amount :  </Typography>
                    <Typography px={1} >  {details?.principalAmount}  </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' >  Purchase Date :  </Typography>
                    <Typography px={1} >  {moment(details?.purchaseDate).format("MMMM Do YYYY")}  </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' >  ROI :  </Typography>
                    <Typography px={1} >  {details?.roi}  </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sx={12} md={6} lg={6} >
                <Box display={'flex'} >
                    <Typography fontWeight='bold' >  Total Amount :  </Typography>
                    <Typography px={1} >  {details?.totalAmount.toFixed(2)}  </Typography>
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