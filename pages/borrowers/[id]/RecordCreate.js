import { useEffect, useState } from "react";
import CreateBorrowersRecord from "../../../component/Borrowers/records/CreateBorrowersRecord";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";

const RecordCreate = () => {
  const router = useRouter();
  const [borrowers, setBorrowers] = useState([]);

  const fetchLocalStorageData = () => {
    const _value = JSON.parse(localStorage.getItem("borrower")) || [];
    setBorrowers(_value);
  };

  useEffect(() => {
    fetchLocalStorageData();
  }, []);

  return (
    <>
      {borrowers?.find((item) => item?.borrower_id === router.query.id) ? (
        <CreateBorrowersRecord
          borrower={borrowers?.find(
            (item) => item?.borrower_id === router.query.id
          )}
        />
      ) : (
        <>
          <Box display={"flex"} justifyContent={"center"} height={"50vh"}>
            <CircularProgress />
          </Box>
        </>
      )}
    </>
  );
};

export default RecordCreate;
