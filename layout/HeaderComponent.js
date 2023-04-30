import { Avatar, Box, Button, FilledInput, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { signIn, signOut, useSession } from 'next-auth/react';
// import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from "next/link";
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText"
import { useRouter } from 'next/router';

const sideLabel = [
  {
    id: 1,
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: '/'
  },
  {
    id: 2,
    name: "Records",
    icon: <GroupAddIcon />,
    link: "/records"
  }
]
const HeaderComponent = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const [result, setResult] = React.useState(false);
  const [data, setData] = useState(router?.query?.find)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(data){
      router.push(`/records?find=${data}`)
    }
  };

  useEffect(()=>{
  setData(router?.query?.find)
  },[router?.query?.find])

  return (
    <Box py={1} px={1} >
      <Grid container alignItems={'center'} >
        <Grid item lg={5} md={5} sm={5} xs={12} display={'flex'} alignItems={'center'} > 
        <Box display={{ xs: 'block', lg: 'none' }}>
        <IconButton
          onClick={() => setResult(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={result}
          onClick={() => setResult(false)}
        >
          <Box
            sx={{ width: 250, backgroundColor: "#CEF3FF", height: "100vh" }}
            onClick={() => setResult(false)}
            onKeyDown={() => setResult(false)}
          >
            <List>
              <Box>
                <Typography textAlign={'center'} py={3}>Logo</Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} justifyContent='space-between' >
                <div>
                  {sideLabel?.map((item, index) => (
                    <div key={index}>
                    <Link href={item?.link}  >
                    <ListItem key={item?.id} disablePadding>
                      <ListItemButton>
                        <ListItemIcon >
                          {item?.icon}
                        </ListItemIcon>
                        <ListItemText primary={item?.name} />
                      </ListItemButton>
                    </ListItem>
                    </Link>
                    </div>
                  ))}
                </div>
                <div>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => session ? signOut() : signIn()} >
                      <ListItemIcon color='white'>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary={session ? "logout" : "SignIn"} />
                    </ListItemButton>
                  </ListItem>
                </div>
              </Box>
            </List>

          </Box>
        </Drawer>
      </Box>
         <Typography variant='h6' pl={2}> Total Borrower</Typography> </Grid>
         

        <Grid item lg={5} md={7} sm={7} xs={12}>
          <Paper
            component="form" onSubmit={handleSubmit}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase value={data} onChange={(e)=>setData(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Google Maps"
              // inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type='submit'  sx={{ p: '10px' }} >
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