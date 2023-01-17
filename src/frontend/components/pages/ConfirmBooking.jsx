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

export const ConfirmBooking = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    defaultValue,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [activityBookingId, setActivityBookingId] = useState(`${params.activity_bookings_id}`);
  const [bookingDate, setBookingDate] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [activityName, setActivityName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [activityList, setActivityList] = useState([]);
  const [trainerList, setTrainerList] = useState([]);

  // can i use this for booking confirmation page as well
  useEffect(() => {
    fetch(`/api/activity_bookings/with_details/${params.activity_bookings_id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          const booking = res.bookings;
          setActivityBookingId(booking.activity_bookings_id);
          setBookingDate(
            new Date(booking.booking_date).toISOString().substring(0, 10)
          );
          setTrainerName(booking.firstname);
          setActivityName(booking.name);
          setRoomNumber(booking.room_number);
        } else {
          console.log("Request error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activityList]);

  
  useEffect(() => {
    fetch("/api/users/status")
      .then((res) => res.json())
      .then((response_data) => {
        setUserId(response_data.user_id);
      });
  }, []);

  const makeBooking = () => {
    const member_booking = {
        activity_bookings_id: JSON.stringify(activityBookingId),
        member_user_id: JSON.stringify(userId)
      };

    fetch("/api/member_activity_bookings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member_booking),
    })
      .then((res) => res.json())
      .then((message) => {
        alert(message);
        navigate("/class_list");
      })
      .catch((error) => {
        alert("Failed to book activity: " + error);
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit(makeBooking)}>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 7,
          }}
        >
          <Typography component="h1" variant="h5">
            Confirm your booking
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: 3,
            }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                fullwidth
                InputLabelProps={{ shrink: true }}
                name="activity_bookings_id"
                required
                id="activity_bookings_id"
                label="Activity Bookings ID"
                InputProps={{
                  readOnly: true,
                }}
                value={activityBookingId}
                {...register("activity_bookings_id")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                id="member_user_id"
                label="Confirm your User ID"
                name="member_user_id"
                autoComplete="member_user_id"
                value={userId}
                InputProps={{
                  readOnly: true,
                }}
                {...register("member_user_id", {
                  onChange: (e) => {
                    setUserId(e.target.value);
                  },
                })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                mt: 1,
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
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                mt: 1,
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
            </Grid>
          </Grid>
          <Grid
            sx={{
              mt: 1,
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
              mt: 1,
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
          </Grid>
          <Typography component="h1" variant="h5" color="orange">
            Are you sure you want to book this activity?
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Book Now!
          </Button>
        </Box>
      </form>
    </Container>
  );
};
