import { Avatar, Box, Button, FilledInput, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React from 'react'

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { signIn, useSession } from 'next-auth/react';

const HeaderComponent = () => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box py={1} px={1} >
      <Grid container alignItems={'center'} >
        <Grid item lg={5} md={5} sm={5} xs={12} > <Typography variant='h6' > Total Borrower</Typography> </Grid>
        <Grid item lg={5} md={7} sm={7} xs={12}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item lg={2} display={{ xs: 'none', lg: 'block' }} alignItems={'center'}>
          {session ?
            <Box display="flex" justifyContent={'end'}  >
              <Box pr={2}>
                <Avatar alt="Piraji survase" src="https://image.shutterstock.com/mosaic_250/301519563/1139558762/stock-photo-image-of-hesitant-unshaven-european-male-with-thick-beard-holds-chin-purses-lips-with-clueless-1139558762.jpg" />
              </Box>
              <div>
                <Typography fontSize={13}>{session?.user?.name}</Typography>
                <Typography fontSize={13}>Super Admin</Typography>
              </div>
            </Box>
            :
            <Box textAlign={'center'} >
              <Button variant='outlined' onClick={() => signIn()} >SignIn</Button>
            </Box>
          }

        </Grid>
      </Grid>

    </Box>
  )
}

export default HeaderComponent