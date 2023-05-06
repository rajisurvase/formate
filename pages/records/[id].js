
import React, { useEffect, useState } from 'react'
import EditComponent from '../../component/EditComponent'
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material';

const SingleRecord = () => {
    const router = useRouter()
    const [data, setData] = useState('')
    console.log("router", data)

    useEffect(()=>{
        setTimeout(()=>{
            const _value = JSON.parse(localStorage.getItem("records")) || []
            setData(_value?.find(item=>item?.id===router?.query?.id))
        },2000)
       
    },[router?.query?.id])
    
  return (
    <div>
    {data?  <EditComponent data={data} /> : 
    
    <Box sx={{textAlign:'center', alignItems:"center", pt:35}} ><CircularProgress color="secondary" />
    </Box>}
       
    </div>
  )
}

export default SingleRecord