import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const EditActivityBooking = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [activityBookingId, setActivityBookingId] = useState(`${params.activity_bookings_id}`)
  const [bookingDate, setBookingDate] = useState("");
  const [trainerUserId, setTrainerUserId] = useState("");
  const [activityId, setActivityId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

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

  useEffect(() => {
    fetch(`/api/activity_bookings/${params.activity_bookings_id}`)
        .then(res => res.json())
        .then(res => {
            if (res.status == 200) {
                const booking = res.bookings
                setActivityBookingId(booking.activity_bookings_id)
                setBookingDate((new Date(booking.booking_date).toISOString().substring(0, 10)))
                setTrainerUserId(booking.trainer_user_id)
                setActivityId(booking.activity_id)
                setRoomNumber(booking.room_number)
            } else {
                console.log("Request error")
            }
        })
        .catch(error => {
            console.log(error)
        })
}, [activityList])


  const onSubmitUpdateBooking = (e) => {
    e.preventDefault();
    const booking = {
      activity_bookings_id: activityBookingId,
      booking_date: bookingDate,
      trainer_user_id: trainerUserId,
      activity_id: activityId,
      room_number: roomNumber,
    };

    fetch("/api/activity_bookings/update", {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(booking)
    })
      .then((res) => res.json())
      .then(res => {
        if (res.status == 200) {
        alert("Activity booking ID: * " + booking.activity_bookings_id + " * has been successfully updated!");
        navigate("/list_activity_bookings")
      } 
      // else if (res.status == 404) {
      //   alert("Not found")
      // } 
      else {
        alert("Not logged in")
        navigate("/login")
      }

    })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={onSubmitUpdateBooking}>
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
            Edit an existing activity booking
          </Typography>
          <Grid item xs={12}>
                <TextField
                  fullwidth
                  InputLabelProps={{ shrink: true }}
                  name="activity_bookings_id"
                  required
                  id="activity_bookings_id"
                  label="Activity Bookings ID (Read Only)"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={activityBookingId}
                />
              </Grid>
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
                 <option selected={trainer.user_id == trainerUserId} value={trainer.user_id}>{trainer.firstname}</option>
                // <option value={trainer.user_id}>{trainer.firstname}</option>
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
                <option selected={activity.activity_id == activityId} value={activity.activity_id}>{activity.name}</option>
                // <option value={activity.activity_id}>{activity.name}</option>
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
            Edit Activity Booking
          </Button>
        </Box>
      </form>
    </Container>
  );
};
