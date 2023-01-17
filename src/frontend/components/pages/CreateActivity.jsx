import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateActivity = () => {
  const navigate = useNavigate()
  // const [level, setLevel] = useState("");

  // const handleChange = (event) => {
  //   setLevel(event.target.value);
  // };
  const {register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [bodyData, setBodyData] = useState("");

  const onSubmit = (bodyData) => {
    fetch("/api/activities/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((message) => {
        alert(message)
        navigate("/admin_class_list")
      })
      .catch((error) => {
        alert("Failed to create class: " + error)
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 7,
          }}
        >
          <Typography component="h1" variant="h5">
            Create a new class
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Activity Name"
                  autoFocus
                  {...register("name")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="duration_minutes"
                  label="Duration (minutes)"
                  name="duration_minutes"
                  {...register("duration_minutes")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="level"
                  label="Difficulty level"
                  name="level"
                  {...register("level")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Class
            </Button>
          </Box>
        </Box>
        </form>
    </Container>
  );
};
