import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateActivityBooking = () => {
  const navigate = useNavigate();

  const [bookingDate, setBookingDate] = useState("2022-1-1");
  const [trainerUserId, setTrainerUserId] = useState(1);
  const [activityId, setActivityId] = useState(1);
  const [roomNumber, setRoomNumber] = useState("1");

  const [activityList, setActivityList] = useState([]);
  const [trainerList, setTrainerList] = useState([]);

  useEffect(() => {
    fetch("/api/activities/all")
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          setActivityList(res.activities);
        } else {
          console.log("Error loading activities for select box");
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/users/trainers")
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          setTrainerList(res.trainer_details);
        } else {
          console.log("Error loading trainers for select box");
        }
      });
  }, []);

  const onSubmitCreateBooking = (e) => {
    e.preventDefault();
    const booking = {
      booking_date: bookingDate,
      trainer_user_id: trainerUserId,
      activity_id: activityId,
      room_number: roomNumber
    };

    fetch("/api/activity_bookings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        navigate("/list_activity_bookings")
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={onSubmitCreateBooking}>
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
            Create a new activity booking
          </Typography>

          <Grid
            sx={{
              mt: 3,
              p: 2,
            }}
          >
            <TextField
              name="booking_date"
              label="Booking Date:  (YYYY-MM-DD)"
              id="booking_date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </Grid>
          {/* <label>Booking Date: (YYYY-MM-DD) </label>
            <input type="text" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} /> */}
          <Grid
            sx={{
              mt: 3,
              p: 2,
            }}
          >
            <label>Personal Trainer: </label>
            <select
              value={trainerUserId}
              onChange={(e) => setTrainerUserId(e.target.value)}
            >
              {trainerList.map((trainer) => (
                <option value={trainer.user_id}>{trainer.firstname}</option>
              ))}
            </select>
          </Grid>
          <Grid
            sx={{
              mt: 3,
              p: 2,
            }}
          >
            <label>Activity: </label>
            <select
              value={activityId}
              onChange={(e) => setActivityId(e.target.value)}
            >
              {activityList.map((activity) => (
                <option value={activity.activity_id}>{activity.name}</option>
              ))}
            </select>
          </Grid>
          <Grid
            sx={{
              mt: 3,
              p: 2,
            }}
          >
            <TextField
              name="room_number"
              label="Room Number"
              id="room_number"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
            {/* <label>Room Number:  </label>
            <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} /> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create New Booking
          </Button>
        </Box>
      </form>
    </Container>
  );
};
