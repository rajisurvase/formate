/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { v4 as uuid } from "uuid";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = yup
  .object({
    borrowerName: yup.string().required("Borrower Name is a required field"),
    principalAmount: yup
      .number()
      .required("Principal Amount is a required field")
      .typeError("Principal Amount is a required field"),
    roi: yup.string().required("Rate of Interest is a required field"),
    status: yup.string().required("Status is a required field"),
  })
  .required();
const CreateBorrowersRecord = ({ borrower }) => {
  const [open, setOpen] = React.useState(false);
  const unique_id = uuid();
  const router = useRouter();
  const [value, setValue] = useState(dayjs(new Date()));
  const [purchaseDate, setPurchaseDate] = useState(dayjs(new Date()));
  const [getValue, setGetvalue] = useState(0);
  const [roi, setRoi] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      borrowerName: borrower?.borrower,
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = (data) => {
    const input = {
      ...data,
      id: unique_id,
      interestAmount,
      totalAmount,
      duePaymentDate: value,
      purchaseDate,
    };
    const _value = JSON.parse(localStorage.getItem("borrower")) || []
    const updatedItem = _value.map((todo) => {
        return todo.id === borrower?.id ?  {...todo, records  : [...borrower?.records, input ] }: todo;
      });
    localStorage.setItem("borrower", JSON.stringify(updatedItem))
    router.push(`/borrowers/${router?.query?.id}`)
    reset()
  };
  const handleAmount = (_s) => {
    setGetvalue(_s);
  };

  const handleResult = (_data) => {
    setRoi(_data);
  };

  useEffect(() => {
    if (purchaseDate && value) {
      const timeDiff = value.diff(purchaseDate) / (1000 * 60 * 60 * 24);
      setInterestAmount(
        getValue * (1 + ((roi / 100) * Math.floor(timeDiff)) / 365) - getValue
      );
      setTotalAmount(
        getValue * (1 + ((roi / 100) * Math.floor(timeDiff)) / 365)
      );
    }
  }, [value, purchaseDate, roi, getValue]);

  return (
    <Box m={2}>
      <Card>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Card m={4} > */}
          <Grid p={3} container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                size="small"
                fullWidth
                label="Borrower Name"
                InputProps={{
                  readOnly: true,
                }}
                {...register("borrowerName")}
              />
              <Typography color="red">
                {errors?.borrowerName?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  slotProps={{ textField: { size: "small" } }}
                  label="Purchase  Date"
                  maxDate={dayjs(new Date())}
                  value={purchaseDate}
                  onChange={(newValue) => setPurchaseDate(newValue)}
                />
              </LocalizationProvider>
              <Typography color="red">
                {errors?.purchaseDate?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="number"
                size="small"
                fullWidth
                label="Principal Amount"
                {...register("principalAmount", {
                  onChange: (e) => {
                    handleAmount(e.target.value);
                  },
                })}
              />
              <Typography color="red">
                {errors?.principalAmount?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="number"
                size="small"
                fullWidth
                label="Rate Of Interest In Year (%)"
                {...register("roi", {
                  onChange: (e) => {
                    handleResult(e.target.value);
                  },
                })}
              />
              <Typography color="red">{errors?.roi?.message}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  defaultValue={"pending"}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register("status")}
                >
                  <MenuItem value={"pending"}>Balance</MenuItem>
                  <MenuItem value={"paid"}>Paid</MenuItem>
                </Select>
              </FormControl>
              <Typography color="red">{errors?.status?.message}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                size="small"
                fullWidth
                label="Total interest amount"
                aria-readonly
                value={interestAmount?.toFixed(2)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                value={totalAmount?.toFixed(2)}
                size="small"
                fullWidth
                aria-readonly
                label="Total amount"
              />
            </Grid>
          </Grid>
          <Grid p={3} container spacing={2}>
            <Grid item xs={12} sm={6} md={8} textAlign={"center"}></Grid>
            <Grid item xs={12} sm={6} md={4} textAlign={"center"}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => router.push(`/borrowers/${router?.query?.id}`)}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit" fullWidth>
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default CreateBorrowersRecord;
