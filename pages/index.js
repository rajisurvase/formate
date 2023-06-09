import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import TotalInterestAmount from "../util/TotalInterestAmount";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BorrowersTable from "../component/Borrowers/BorrowersTable";

export default function Home() {
  const [isSSR, setIsSSR] = useState(true);
  const [data, setData] = useState([]);
  const [todayDate, setTodayDate] = useState(dayjs(new Date()));

  const totalInterest = data?.reduce(
    (prevValue, currentValue) =>
      currentValue?.status === "pending"
        ? prevValue +
          TotalInterestAmount(
            currentValue?.principalAmount,
            currentValue?.roi,
            todayDate.diff(currentValue?.purchaseDate) / (1000 * 60 * 60 * 24)
          )
        : prevValue,
    0
  );
  const totalPrincipal = data?.reduce(
    (prevValue, currentValue) =>
      currentValue?.status === "pending"
        ? prevValue + Number(currentValue?.principalAmount)
        : prevValue,
    0
  );

  useEffect(() => {
    setIsSSR(false);
    const result = JSON.parse(localStorage?.getItem("records")) || [];
    setData(result ? result : []);
  }, []);

  return (
    <div>
      {!isSSR && (
        <>
          <Head>
            <title>Simple Lender</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {/* <Box textAlign={"end"} style={{ margin: "1rem" }}>
            <Link href="/records/Create">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "1.5rem",
                  backgroundColor: "#7D8CC4",
                  textTransform: "none",
                }}
                endIcon={<AddIcon sx={{ fontSize: "small" }} />}
              >
                Add Borrower{" "}
              </Button>
            </Link>
          </Box> */}

          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                component={Card}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Divider
                  orientation="vertical"
                  color="#FDA228"
                  sx={{ height: 100, width: "0.2rem" }}
                />
                <Box>
                  <Typography>Total Amount </Typography>
                  <Typography>
                    ₹{" "}
                    {totalInterest && totalPrincipal
                      ? Number(totalInterest + totalPrincipal).toFixed(2)
                      : 0}{" "}
                  </Typography>
                </Box>
                <Box pr={2}>
                  <CurrencyRupeeIcon color="success" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                component={Card}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Divider
                  orientation="vertical"
                  color="green"
                  sx={{ height: 100, width: "0.2rem" }}
                />
                <Box>
                  <Typography>Total Interest </Typography>
                  <Typography>
                    ₹ {totalInterest ? Number(totalInterest).toFixed(2) : 0}{" "}
                  </Typography>
                </Box>
                <Box pr={2}>
                  <KeyboardDoubleArrowUpOutlinedIcon color="success" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                component={Card}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Divider
                  orientation="vertical"
                  color="danger"
                  sx={{ height: 100, width: "0.2rem" }}
                />
                <Box>
                  <Typography>Total Principal </Typography>
                  <Typography>
                    ₹ {totalPrincipal ? Number(totalPrincipal).toFixed(2) : 0}{" "}
                  </Typography>
                </Box>
                <Box pr={2}>
                  <RadioButtonCheckedOutlinedIcon color="primary" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                component={Card}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Divider
                  orientation="vertical"
                  color="#FDA228"
                  sx={{ height: 100, width: "0.2rem" }}
                />
                <Box>
                  <Typography>Total Amount </Typography>
                  <Typography>
                    ₹ {totalInterest ? Number(totalInterest).toFixed(2) : 0}{" "}
                  </Typography>
                </Box>
                <Box pr={2}>
                  <KeyboardDoubleArrowUpOutlinedIcon color="success" />
                </Box>
              </Box>
            </Grid>
          </Grid>


          <Card style={{ margin: "1rem" }} >
              <Box my={1} textAlign={'right'} >
                <Link href="/borrowers/create" >
                   <Button variant='contained' sx={{borderRadius : '1.5rem', backgroundColor : "#7D8CC4", textTransform:"none"}} endIcon={<AddIcon  sx={{fontSize:'small'}} />} >Add Borrower  </Button>
                </Link>
              </Box>
            <BorrowersTable />
         </Card>

        </>
      )}
    </div>
  );
}
