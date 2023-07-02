import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Card, Grid, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const schema = yup
  .object({
    description: yup.string().required("Description is Required !"),
    withDrawals: yup.string().required("WithDrawals Amount is Required !"),
    deposits: yup.string().required("Deposits Amount is Required !"),
    balance: yup.string().required("Balance Amount is Required !"),
  })
  .required();

const CreateTransitionComponent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = (data) => {
    console.log("data", data, selectedDate);
  };

  return (
    <Box m={2}>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container p={3} spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Due Date"
                  value={selectedDate}
                  sx={{ width: "100%" }}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="WithDrawals Amount"
                {...register("withDrawals")}
                error={!!errors.withDrawals}
                helperText={errors.withDrawals?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Deposits Amount"
                {...register("deposits")}
                error={!!errors.deposits}
                helperText={errors.deposits?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Balance"
                {...register("balance")}
                error={!!errors.balance}
                helperText={errors.balance?.message}
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
                  // onClick={() => router.push(`/borrowers/${router?.query?.id}`)}
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

export default CreateTransitionComponent;
