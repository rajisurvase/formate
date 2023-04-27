import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from 'next/navigation';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, Link, OutlinedInput, TextField, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const SignInComponent = (props) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    if (!res.error) {
      console.log(res)
      router.push("/")
    }

  };

  return (
    <Box py={9}>
      <Grid container  >
        <Grid item sm={1} xs={0}></Grid>
        <Grid item sm={10} xs={12} p={2} sx={{ background: "#CEF3FF", height: "80vh", borderRadius:"2rem" }} >
        <form onSubmit={handleSubmit}>
          <Box textAlign={'center'} py={8} >
            <Typography variant="h6" >LOGO</Typography>
            <Typography variant="h6" py={2} >Enter your credentials to access your account</Typography>
            <Grid container  >
              <Grid item md={4} sx={2} xs={0} ></Grid>
              <Grid item md={4} xs={12} sm={8}>
                <Box py={1.5} >
                  <TextField fullWidth  type="email"
                  size="small" id="outlined-basic" 
                  placeholder="User ID" variant="outlined"
                  value={userInfo.email}
                  onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                 }
                   />
                </Box>
                <Box py={1.5}>
                  <FormControl size="small" fullWidth variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="password"
                      value={userInfo.password}
                      onChange={({ target }) =>
                        setUserInfo({ ...userInfo, password: target.value })
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton size="small"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>
                <Box py={1.5}  >
                  <Button type="submit" fullWidth sx={{ backgroundColor : "#7D8CC4"}} variant="contained" >Sign In</Button>
                </Box>

                <Box py={1.5}  >
                <Link href="/auth/signup" >
                <Typography>Sign up</Typography>
                </Link>
                </Box>

              </Grid>
              <Grid item md={4} sx={2} xs={0}></Grid>
            </Grid>
          </Box>
        </form>
        </Grid>
        <Grid item sm={1} xs={0}></Grid>
      </Grid>
    </Box>
  );
};

export default SignInComponent;
