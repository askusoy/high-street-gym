import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const EditActivity = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState([]);
  // const { register, handleSubmit, setValue, reset } = useForm(
  //   // {
  //   // defaultValues: {
  //   //   name: '',
  //   //   duration_minutes: '',
  //   //   level: '',
  //   //   room_number: ''
  //   // }}
  //   );

  const [activityId, setActivityId] = useState(`${params.activity_id}`);
  const [name, setName] = useState("Sports");
  const [duration, setDuration] = useState("60");
  const [level, setLevel] = useState("easy");
    // Activity list items
    // const [activityList, setActivityList] = useState([])
    // useEffect(() => {
    //     fetch("/api/activities/all")
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.status == 200) {
    //                 setActivityList(res.activities)
    //             } else {
    //                 console.log("Error loading activities for select box")
    //             }
    //         })
    // }, [])

    // This one doesn't work but should be correct I guess
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
                  console.log("Error loading activity")
              }
          })
  }, [])

// This one works, commented out to see if other works better
  // useEffect(() => {
  //   getActivityDetails();
  // }, [])

  // const getActivityDetails = async () => {
  //   let result = await fetch (`/api/activities/${params.activity_id}`)
  //   result = await result.json();
  //   setActivityId(result.activity_id)
  //   setName(result.name)
  //   setDuration(result.duration_minutes)
  //   setLevel(result.level)
  // }

  const onSubmitUpdateActivity = (e) => {
    e.preventDefault();
    const activity = {
      activity_id: JSON.stringify(activityId),
      name: name,
      duration_minutes: JSON.stringify(duration),
      level: level
    };

    fetch("/api/activities/update", {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(activity)
    })
      .then((res) => res.json())
      .then(res => {
        if (res.status == 200) {
        alert("Activity ID: * " + activity.activity_id + " * has been successfully updated!");
        navigate("/admin_class_list")
      } 
      // else if (res.status == 404) {
      //   alert("Not found")
      // } 
      else {
        alert("Not logged in")
        // navigate("/login")
      }

    })
      .catch((error) => {
        alert(error);
      });
  };
  // const onUpdate = (bodyData) => {
    
  //   fetch("/api/activities/update", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(bodyData),
  //   })
  //     .then((response) => response.json())
  //     .then((message) => {
  //       alert(message);
  //       navigate("/admin_class_list");
  //     })
  //     .catch((error) => {
  //       alert("Failed to edit class: " + error);
  //     });
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={onSubmitUpdateActivity}>
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
            Edit a class
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullwidth
                  InputLabelProps={{ shrink: true }}
                  name="activity_id"
                  required
                  id="activity_id"
                  label="Activity ID (Read Only)"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={activityId}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Activity Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // {...register("name",
                  // {onChange: (e) => {setName(e.target.value)}}
                  // )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  id="duration_minutes"
                  label="Duration (minutes)"
                  name="duration_minutes"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  // {...register("duration_minutes",
                  // {onChange: (e) => {setDuration(e.target.value)}}
                  // )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  id="level"
                  label="Difficulty level"
                  name="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  // {...register("level",
                  // {onChange: (e) => {setLevel(e.target.value)}}
                  // )}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={onSubmit}
            >
              Edit Class
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
