import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const Logout = ({setUserRole}) => {
  const navigate = useNavigate()
  const onClick = () => { 
      fetch("/api/users/logout", 
      {
          method: "POST",
          headers: {
              'Content-Type': "application/json"
          },
      })
      .then(response => response.json())
      .then(responseJSON => {
          alert(responseJSON)
          setUserRole("guest")
          navigate("/")
      })
      .catch(error => {
          alert("Failed to logout user: " + error)
      })
  }

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
            Are you sure you want to log out?
          </Typography>
            <Box
              sx={{
                m: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                  mt: 3,
                  mb: 2,
                }}
                onClick={onClick}
              >
                Log out
              </Button>
            </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
