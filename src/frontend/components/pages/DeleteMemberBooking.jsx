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

export const DeleteMemberBooking = () => {
    const navigate = useNavigate();
    const params = useParams(); 
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();
    const [memberActivityBookingId, setMemberActivityBookingId] = useState(`${params.member_activity_bookings_id}`)
    const [bookingDate, setBookingDate] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
  
    const [memberBookingList, setMemberBookingList] = useState([]);

  useEffect(() => {
    fetch(`/api/member_activity_bookings/with_details/${params.member_activity_bookings_id}`)
        .then(res => res.json())
        .then(res => {
            if (res.status == 200) {
                const member_bookings = res.member_bookings
                setMemberActivityBookingId(member_bookings.member_activity_bookings_id)
                setBookingDate((new Date(member_bookings.booking_date).toISOString().substring(0, 10)))
                setRoomNumber(member_bookings.room_number)
            } else {
                console.log("Request error")
            }
        })
        .catch(error => {
            console.log(error)
        })
}, [memberBookingList])
  

  const onDelete = (data) => {
    fetch("/api/member_activity_bookings/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((message) => {
        alert(message)
        navigate("/list_member_bookings")
      })
      .catch((error) => {
        alert("Failed to delete booking: " + error)
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
            Delete an existing member booking
          </Typography>
          <Grid item xs={12}>
                <TextField
                  fullwidth
                  InputLabelProps={{ shrink: true }}
                  name="member_activity_bookings_id"
                  required
                  id="member_activity_bookings_id"
                  label="Member Booking ID (Read Only)"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={memberActivityBookingId}
                  {...register("member_activity_bookings_id")}
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
          </Grid>
          <Typography component="h1" variant="h5" color ="red">

Are you sure you want to delete this booking?
</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            
          >
            Delete Member Booking
          </Button>
        </Box>
      </form>
    </Container>
  );
};