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
import { v4 as uuid } from 'uuid';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = yup.object({
    borrower: yup.string().required("Borrower Name is a required field"),
    phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Invalid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(10, 'Phone number must not exceed 10 digits'),
    email:yup
    .string()
    .required('Email is required')
    .test('email', 'Invalid email address', function (value) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value);
    }),
}).required();
const create = () => {
    const [open, setOpen] = React.useState(false);
    const unique_id = uuid();

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

    const onSubmit =(data)=> {
        const input = {
            ...data,
            borrower_id : unique_id,
        }
        const _value = JSON.parse(localStorage.getItem("borrower")) || []
        localStorage.setItem("borrower", JSON.stringify([ input, ..._value]))
        router.push('/borrowers')
        reset()
    };

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
                            {...register("borrower")} />
                        <Typography color='red' >{errors?.borrower?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField type="text" {...register('phone')}
                            size='small' fullWidth
                            label="Phone"
                            {...register("phone")} />
                        <Typography color='red'>{errors?.phone?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField type='text' size='small' fullWidth
                            label="Borrower Email"
                            {...register("email")} />
                        <Typography color='red' >{errors?.email?.message}</Typography>
                    </Grid>
                </Grid>
                <Grid p={3} container spacing={2} >
                    <Grid item xs={12} sm={6} md={8} textAlign={'center'}   >
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} textAlign={'center'} >
                        <Stack direction="row" spacing={2}>
                            <Button variant='outlined' fullWidth onClick={()=>router.push('/borrowers')}  >Cancel</Button>
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