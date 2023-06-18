import Head from 'next/head'
import { Box, Button, Card, Divider, FormControl, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TotalInterestAmount from '../util/TotalInterestAmount';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const period = [
  {
    id: 1,
    name: "Year",
    value: 1
  },
  {
    id: 2,
    name: "Monthly",
    value: 12
  },
  {
    id: 3,
    name: "Weekly",
    value: 52
  },
  {
    id: 4,
    name: "Days",
    value: 365
  },

]

export default function Home() {

  const [formValue, setFormValue] = useState({
    amount: '',
    rate: '',
    duration: ''
  })
  const [checkDuration, setCheckDuration] = useState(1);
  const [labelName, setLabelName] = useState('')
  const [isSSR, setIsSSR] = useState(true);
  const [data, setData] = useState([])
  const [todayDate, setTodayDate] = useState(dayjs(new Date()));



  const handleChange = (event) => {
    setCheckDuration(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  useEffect(() => {
    setLabelName(period.find(s => s.value === checkDuration)?.name)
  }, [checkDuration])

  // const totalAmount = data?.reduce(
  //   (prevValue, currentValue) =>  prevValue + currentValue?.totalAmount,
  //   0
  // );

  const totalInterest = data?.reduce(
    (prevValue, currentValue) => currentValue?.status==='pending'? prevValue + TotalInterestAmount(currentValue?.principalAmount,currentValue?.roi,todayDate.diff(currentValue?.purchaseDate)/(1000 * 60 * 60 * 24)): prevValue,
    0
  );
  const totalPrincipal = data?.reduce(
    (prevValue, currentValue) => currentValue?.status==='pending'? prevValue + Number(currentValue?.principalAmount): prevValue,
    0
  );

  useEffect(() => {
    setIsSSR(false);
   const result = JSON.parse(localStorage?.getItem("records")) || []
    setData(result? result : [])
  }, []);

const TotalInterestEarned =()=>{
return formValue.amount * (1 + formValue.rate / 100 * formValue.duration / checkDuration) - formValue.amount
}
const Totalvalue =()=>{
 return formValue.amount * (1 + formValue.rate / 100 * formValue.duration / checkDuration)
}

  return (
    <div >
    { !isSSR && 
    <>
      <Head>
        <title>Simple Lender</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box textAlign={'end'} style={{ margin: "1rem" }} >
        <Link href="/records/Create" >
        <Button variant='contained' sx={{borderRadius : '1.5rem', backgroundColor : "#7D8CC4", textTransform:"none"}} endIcon={<AddIcon  sx={{fontSize:'small'}} />} >Add Borrower  </Button>
        </Link>
      </Box>

      <Grid container spacing={4} p={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box component={Card} display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
            <Divider
              orientation="vertical"
              color="#FDA228" sx={{ height: 100, width: '0.2rem' }}
            />
            <Box >
              <Typography>Total Amount </Typography>
              <Typography>₹ {totalInterest && totalPrincipal? Number(totalInterest + totalPrincipal).toFixed(2) : 0} </Typography>
            </Box>
            <Box pr={2}>
            <CurrencyRupeeIcon color="success" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Box component={Card} display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
            <Divider
              orientation="vertical"
              color="green" sx={{ height: 100, width: '0.2rem' }}
            />
            <Box >
              <Typography>Total Interest </Typography>
              <Typography>₹ {totalInterest? Number(totalInterest).toFixed(2) : 0} </Typography>
            </Box>
            <Box pr={2}>
            <KeyboardDoubleArrowUpOutlinedIcon color="success" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Box component={Card} display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
            <Divider
              orientation="vertical"
              color="danger" sx={{ height: 100, width: '0.2rem' }}
            />
            <Box >
              <Typography>Total Principal </Typography>
              <Typography>₹ {totalPrincipal? Number(totalPrincipal).toFixed(2) : 0} </Typography>
            </Box>
            <Box pr={2}>
            <RadioButtonCheckedOutlinedIcon color="primary" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Box component={Card} display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
            <Divider
              orientation="vertical"
              color="#FDA228" sx={{ height: 100, width: '0.2rem' }}
            />
            <Box >
              <Typography>Total Amount </Typography>
              <Typography>₹ {totalInterest? Number(totalInterest).toFixed(2) : 0} </Typography>
            </Box>
            <Box pr={2}>
            <KeyboardDoubleArrowUpOutlinedIcon color="success" />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Card style={{ margin: "1rem" }} >
        <Grid container >
          <Grid item xs={12} md={6} p={3} >
            <Grid container sx={{ alignItems: "center", py: 1 }}>
              <Grid item xs={5} >
                <Typography pr={2}>Principle Amount  </Typography>
              </Grid>
              <Grid item xs={2} >
                <Typography> : </Typography>
              </Grid>
              <Grid item xs={5} >
                <TextField fullWidth size='small' type='number' name="amount" value={formValue.amount} onChange={handleInputChange} variant="outlined" />
              </Grid>

            </Grid>
            <Grid container sx={{ alignItems: "center", py: 1 }}>
              <Grid item xs={5}><Typography pr={2}>Rate of Interest (%)  </Typography></Grid>
              <Grid item xs={2} ><Typography> : </Typography></Grid>
              <Grid item xs={5} >
                <TextField fullWidth size='small' type='number' value={formValue.rate} name="rate" onChange={handleInputChange} variant="outlined" />
              </Grid>
            </Grid>
            <Grid container sx={{ alignItems: "center", py: 1 }} >
              <Grid item xs={5} ><Typography pr={2}>Period Unit </Typography></Grid>
              <Grid item xs={2} ><Typography pr={2}> : </Typography></Grid>
              <Grid item xs={5} >
                <FormControl fullWidth size="small" minWidth={"40%"} >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={checkDuration}
                    onChange={handleChange}
                  >
                    {period?.map((item, index) => (
                      <MenuItem key={index} value={item?.value}>{item?.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl></Grid>
            </Grid>

            <Grid container sx={{ alignItems: "center", py: 1 }} >
              <Grid item xs={5} ><Typography pr={2}>Number of {labelName}  </Typography></Grid>
              <Grid item xs={2} ><Typography> : </Typography></Grid>
              <Grid item xs={5} ><TextField fullWidth size='small' type='number' value={formValue.duration} name="duration" onChange={handleInputChange} variant="outlined" /></Grid>
            </Grid>

          </Grid>
          <Grid item xs={12} md={6} p={3} >
            <div>
              <h4>Interest Earned ₹{TotalInterestEarned()?.toFixed(2)}
                 {/* {formValue.amount * (1 + formValue.rate / 100 * formValue.duration / checkDuration) - formValue.amount} */}</h4>
              <h4>Principal Amount ₹ {formValue.amount ? formValue.amount : 0} </h4>
              <h4>Total Value ₹ {Totalvalue()?.toFixed(2)}
                {/* {formValue.amount * (1 + formValue.rate / 100 * formValue.duration / checkDuration)} */}</h4>
            </div>
          </Grid>
        </Grid>

      </Card>
      </>
    }
    </div>
  )
}
