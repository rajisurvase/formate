/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = yup.object({
    borrowerName: yup.string().required("Borrower Name is a required field"),
    lenderName: yup.string().required("Lender Name is a required field"),
    principalAmount: yup.number().required("Principal Amount is a required field"),
    roi: yup.string().required("Rate of Interest is a required field"),
    // interestAmount: yup.string().required("Interest Amount is a required field"),
    // totalAmount: yup.string().required("Total Amount is a required field"),
    // purchaseDate : yup.string().required("purchase Date is a required field"),
    // duePaymentDate : yup.string().required("Due Payment Date is a required field"),
    status: yup.string().required("Status is a required field")
}).required();
const create = () => {
    const [open, setOpen] = React.useState(false);


    const router = useRouter()
    const [value, setValue] = useState(dayjs(new Date()));
    const [purchaseDate, setPurchaseDate] = useState(dayjs(new Date()))
    const [getValue, setGetvalue] = useState(0)
    const [roi, setRoi] = useState(0)
    const [interestAmount, setInterestAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const onSubmit = data => {
        const input = {
            ...data,
            interestAmount,
            totalAmount,
            duePaymentDate: value,
            purchaseDate
        }
        const _value = JSON.parse(localStorage.getItem("records")) || []
        localStorage.setItem("records", JSON.stringify([ input, ..._value]))
        router.push('/records')
        reset()
        handleClick()
    };
    const handleAmount = (_s) => {
        setGetvalue(_s)
    }

    const handleResult = (_data) => {
        setRoi(_data)
    }

    useEffect(() => {
        if (purchaseDate && value) {
            const timeDiff = value.diff(purchaseDate)
            setInterestAmount(getValue * (1 + roi / 100 * Math.floor(timeDiff / (1000 * 3600 * 24))) - getValue)
            setTotalAmount(getValue * (1 + roi / 100 * Math.floor(timeDiff / (1000 * 3600 * 24))))
        }
    }, [value, purchaseDate, roi, getValue])

    return (
        <Box m={2}>
        <Card >
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <Card m={4} > */}
                <Grid p={3} container spacing={3} >
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField size='small' fullWidth
                            label="Borrower Name"
                            {...register("borrowerName")} />
                        <Typography color='red' >{errors?.borrowerName?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField
                            size='small' fullWidth
                            label="Lender Name"
                            {...register("lenderName")} />
                        <Typography color='red'>{errors?.lenderName?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}  >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker sx={{ width: "100%" }} slotProps={{ textField: { size: 'small' } }}
                                label="Purchase  Date"
                                maxDate={dayjs(new Date())}
                                value={purchaseDate}
                                onChange={(newValue) => setPurchaseDate(newValue)}
                            />
                        </LocalizationProvider>
                        <Typography color='red'>{errors?.purchaseDate?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField type='number'
                            size='small' fullWidth
                            label="Principal Amount"
                            {...register("principalAmount", {
                                onChange: (e) => {
                                    handleAmount(e.target.value)
                                }
                            })} />
                        <Typography color='red'>{errors?.principalAmount?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField type='number'
                            size='small' fullWidth
                            label="Rate of Interest (%)"
                            {...register("roi", {
                                onChange: (e) => {
                                    handleResult(e.target.value)
                                }
                            })} />
                        <Typography color='red'>{errors?.roi?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}  >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker sx={{ width: "100%" }} slotProps={{ textField: { size: 'small' } }}
                                label="Due PaymentDate Date"
                                minDate={dayjs(new Date())}
                                // {...register("duePaymentDate")}
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} >
                        <FormControl fullWidth size='small'>
                            <InputLabel >Status</InputLabel>
                            <Select label='Status' defaultValue={"pending"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                {...register("status")}
                            >
                                <MenuItem value={"pending"}>Pending</MenuItem>
                                <MenuItem value={"paid"}>Paid</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography color='red'>{errors?.status?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} >
                        <TextField
                            size='small' fullWidth
                            label="Total interest amount" aria-readonly
                            value={interestAmount}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} >
                        <TextField value={totalAmount}
                            size='small' fullWidth aria-readonly
                            label="Total amount"
                        />
                    </Grid>

                </Grid>
                <Grid p={3} container spacing={2} >
                    <Grid item xs={12} sm={6} md={8} textAlign={'center'}   >
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} textAlign={'center'} >
                        <Stack direction="row" spacing={2}>
                            <Button variant='outlined' fullWidth  >Cancel</Button>
                            <Button variant='contained' type="submit" fullWidth>Submit</Button>
                        </Stack>

                    </Grid>
                </Grid>
            </form>
        </Card>
        </Box>
    )
}

export default create