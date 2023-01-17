import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export const DeleteActivityBooking = () => {
    const navigate = useNavigate();
    const params = useParams(); 
    const {
      register,
      defaultValue,
      formState: { errors },
      handleSubmit,
    } = useForm();
    const [activityBookingId, setActivityBookingId] = useState(`${params.activity_bookings_id}`)
    const [bookingDate, setBookingDate] = useState("");
    const [trainerName, setTrainerName] = useState("");
    const [activityName, setActivityName] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
  
    const [activityList, setActivityList] = useState([]);
    const [trainerList, setTrainerList] = useState([]);

// can i use this for booking confirmation page as well
  useEffect(() => {
    fetch(`/api/activity_bookings/with_details/${params.activity_bookings_id}`)
        .then(res => res.json())
        .then(res => {
            if (res.status == 200) {
                const booking = res.bookings
                setActivityBookingId(booking.activity_bookings_id)
                setBookingDate((new Date(booking.booking_date).toISOString().substring(0, 10)))
                setTrainerName(booking.firstname)
                setActivityName(booking.name)
                setRoomNumber(booking.room_number)
            } else {
                console.log("Request error")
            }
        })
        .catch(error => {
            console.log(error)
        })
}, [activityList])
  

  const onDelete = (data) => {
    fetch("/api/activity_bookings/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((message) => {
        alert(message)
        navigate("/list_activity_bookings")
      })
      .catch((error) => {
        alert("Failed to delete activity: " + error)
        console.log(error)
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit(onDelete)}>
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
            Delete an existing activity booking
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
                  {...register("activity_bookings_id")}
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
              InputProps={{
                readOnly: true,
              }}
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
            <TextField
              name="trainer_name"
              label="Trainer Name"
              id="trainer_name"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={trainerName}
              InputProps={{
                readOnly: true,
              }}
              onChange={(e) => setTrainerName(e.target.value)}
            />
            {/* <label>Personal Trainer: </label>
            <select
              value={trainerUserId}
              onChange={(e) => setTrainerUserId(e.target.value)}
            >
              {trainerList.map((trainer) => (
                 <option selected={trainer.user_id == trainerUserId} value={trainer.user_id}>{trainer.firstname}</option>
                // <option value={trainer.user_id}>{trainer.firstname}</option>
              ))}
            </select> */}
          </Grid>
          <Grid
            sx={{
              mt: 3,
              p: 2,
            }}
          >
                        <TextField
              name="activity_id"
              label="Activity Name"
              id="activity_id"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={activityName}
              InputProps={{
                readOnly: true,
              }}
              onChange={(e) => setActivityName(e.target.value)}
            />
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
              InputProps={{
                readOnly: true,
              }}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
            {/* <label>Room Number:  </label>
            <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} /> */}
          </Grid>
          <Typography component="h1" variant="h5" color ="red">

Are you sure you want to delete this activity?
</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            
          >
            Delete Activity Booking
          </Button>
        </Box>
      </form>
    </Container>
  );
};