import { useEffect, useState } from 'react';
import CreateBorrowersRecord from '../../../component/Borrowers/records/CreateBorrowersRecord';
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material';

const RecordCreate = () => {
    const router = useRouter()
 const [show, setShow] = useState(false)
 const [borrower, setBorrower] = useState('')
//   useEffect(()=>{
//     const _value = JSON.parse(localStorage.getItem("borrower")) || []
//     if(_value?.filter((item)=>item?.borrower_id === router?.query?.id)){
//       console.log("this is connected")
//     } else {
//       console.log("this is not  connected")
//     }
// },[])

useEffect(()=>{
    const _value = JSON.parse(localStorage.getItem("borrower")) || []
    if(_value?.find((item)=>item?.borrower_id === router.query.id)){
        setShow(true)
        setBorrower(_value?.find((item)=>item?.borrower_id === router.query.id))
    } else {
        setShow(false)
    }
},[])

  return (
    <>
    {show? <CreateBorrowersRecord /> : (<>
        <Box display={"flex"} justifyContent={'center'} height={'50vh'} >
        <CircularProgress />
        </Box>
    </>)  }   
    </>
    
  )
}

export default RecordCreate