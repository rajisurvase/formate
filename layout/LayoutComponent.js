import React from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import SidebarComponent from './SidebarComponent';
import HeaderComponent from './HeaderComponent';
import { useSession } from 'next-auth/react';
import SignInComponent from '../pages/auth/SignInComponent';

const LayoutComponent = ({children}) => {
  const { data: session } = useSession();

  return (
    <Box>
    {/* {session && ( */}
      <Grid container >
            <Grid item lg={1.5}  ><SidebarComponent /> </Grid>
            <Grid item lg={10.5} xs={12} >
                <Grid container >
                    <Grid item xs={12}><HeaderComponent /></Grid>
                    <Grid item xs={12}  >{children}</Grid>
                </Grid>
            </Grid>
        </Grid>
    {/* )}  */}
    {/* {!session && (
      <SignInComponent />
    )} */}
    </Box>
  )
}

export default LayoutComponent