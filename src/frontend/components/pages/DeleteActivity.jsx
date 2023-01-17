import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const DeleteActivity = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    defaultValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [activityId, setActivityId] = useState(`${params.activity_id}`);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");


    // useEffect(() => {
    //     getActivityDetails();
    // }, [])

    // const getActivityDetails = async () => {
    //     let result = await fetch (`/api/activities/${params.activity_id}`)
    //     result = await result.json();
    //     setActivityId(result.activity_id)
    //     setName(result.name)
    //     setDuration(result.duration_minutes)
    //     setLevel(result.level)
    //   }

    useEffect(() => {
      fetch(`/api/activities/${params.activity_id}`)
          .then(res => res.json())
          .then(res => {
              if (res.status == 200) {
                  const activity = res.activity
                  setActivityId(activity.activity_id)
                  setName(activity.name)
                  setDuration(activity.duration_minutes)
                  setLevel(activity.level)
              } else {
                  console.log("Error loading activity for booking item")
              }
          })
  }, [])
  
  const onDelete = (data) => {
    fetch("/api/activities/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((message) => {
        alert(message)
        navigate("/admin_class_list")
      })
      .catch((error) => {
        alert("Failed to delete activity: " + error)
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form
      onSubmit={handleSubmit(onDelete)}
      >
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
            Delete Existing Class
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullwidth
                  InputLabelProps={{ shrink: true }}
                  name="activity_id"
                  id="activity_id"
                  label="Activity ID"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={activityId}
                  onChange={(e) => setActivityId(e.target.value)}
                  {...register("activity_id")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  name="name"
                  fullWidth
                  id="name"
                  label="Activity Name"
                  value={name}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("name", 
                  {onChange: (e) => {setName(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  id="duration_minutes"
                  label="Duration (minutes)"
                  name="duration_minutes"
                  value={duration}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("duration_minutes", 
                  {onChange: (e) => {setDuration(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  name="level"
                  label="Level"
                  type="level"
                  id="level"
                  value={level}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("level",
                  {onChange: (e) => {setLevel(e.target.value)}}
                  )}
                />
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5" color ="red">

                Are you sure you want to delete this activity?
            </Typography>
            <Button
              style={{
                background: "purple",
              }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete Activity
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};