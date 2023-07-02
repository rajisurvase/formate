import { Box, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ViewRecordComponent = ({ records }) => {
  const router = useRouter()
  const [details, setDetails] = useState({})

  useEffect(() => {
    setDetails(records?.find(item => item.id === router?.query?.record_id))
  }, [records])

  console.log("details", details)

  return (
    <>
      {details?.id ?
        <>
          <Typography variant='h6' > Borrower Name : {details?.borrowerName} </Typography>
          <Typography variant='h6' > Due Date : {details?.duePaymentDate} </Typography>
          <Typography variant='h6' > Records : {details?.id} </Typography>
          <Typography variant='h6' > Interest Amount : {details?.interestAmount} </Typography>
          <Typography variant='h6' > Principal Amount : {details?.principalAmount} </Typography>
          <Typography variant='h6' > Purchase Date : {details?.purchaseDate} </Typography>
          <Typography variant='h6' > ROI : {details?.roi} </Typography>
          <Typography variant='h6' > Total Amount : {details?.totalAmount} </Typography>

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