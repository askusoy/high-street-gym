import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Login = ({setUserRole, setUserId}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const onUsernameChange = (event) => setUsername(event.target.value); //event.target = document.getElementbyId("username")
  const onPasswordChange = (event) => setPassword(event.target.value);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (bodyData) => {
    // Send fetch with form data
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
    .then(response => response.json())
    .then(response => {
      if (response.status == 200) {
          
          alert("Login successful!")
          setUserRole(response.user_role)
          // setUserId(response.user_id)
          navigate("/")
      } else if (response.status == 400) {
          alert("Login failed!")
      } else {
          alert("Login error!")
      }
  })
  .catch(error => {
      alert("Failed to login user: " + error)
  })
  };

  return (
    <Grid container component="main" sx={{ height: "84vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in to Your Account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                m: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                type="text"
                required
                fullwidth
                name="username"
                label="Username"
                id="username"
                margin="normal"
                {...register("username", {
                  required: "Required" })}
                onChange={onUsernameChange}
              />
              {errors.username && <p>Username is invalid</p>}
              <TextField
                type="password"
                required
                fullwidth
                name="password"
                label="Password"
                margin="normal"
                id="password"
                {...register("password")}
                onChange={onPasswordChange}
              />
              {errors.password && <p>Password is invalid</p>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                  mt: 3,
                  mb: 2,
                }}
              >
                Log in
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};
