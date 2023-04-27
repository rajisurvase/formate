import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Typography } from "@mui/material";
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
  const [result, setResult] = React.useState(false);
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
                    <ListItem key={item?.id} disablePadding>
                      <ListItemButton>
                        <ListItemIcon >
                          {item?.icon}
                        </ListItemIcon>
                        <ListItemText primary={item?.name} />
                      </ListItemButton>
                    </ListItem>
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
    </>
  )
}

export default SidebarComponent