import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {  Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from "next/link";
import LogoutIcon from '@mui/icons-material/Logout';
import { signIn, signOut, useSession } from "next-auth/react";

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

const SidebarComponent = () => {
  const { data: session } = useSession();
  console.log("session", session)
  return (
    <>
      <Box sx={{ backgroundColor: '#CEF3FF' }} display={{ xs: 'none', lg: 'block', height: "100vh" }}>
        <Box>
          <Typography textAlign={'center'} py={3} >Logo</Typography>
        </Box>
        <Box  >
          {sideLabel?.map((item, index) => (
            <div key={index}>
              <Link href={item?.link}  >
                <ListItem disablePadding>
                  <ListItemButton >
                    <ListItemIcon >
                      {item?.icon}
                    </ListItemIcon>
                    <ListItemText primary={item?.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </div>
          ))}
          <ListItem disablePadding>

            <ListItemButton onClick={() => session ? signOut() : signIn()} >
              <ListItemIcon color='white'>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={session ? "logout" : "SignIn"} />
            </ListItemButton>
          </ListItem>
        </Box>

      </Box>
    </>
  )
}

export default SidebarComponent