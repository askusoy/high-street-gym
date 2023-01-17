import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DeleteMemberBooking } from "./DeleteMemberBooking";

export const MemberBookingsMemberView = () => {
  // const params = useParams();
  const navigate = useNavigate();

  // probably need to inner join ACTIVITIES, ACTIVITY BOOKINGS, AND MEMBER ACTIVITY BOOKINGS
    // fetch from status so it automatically sets something, in this case user id
    const [userId, setUserId] = useState("")
    useEffect(() => {
      fetch("/api/users/status")
        .then((res) => res.json())
        .then((response_data) => {
          console.log(response_data);
          setUserId(response_data.user_id)
        });
    }, []);

  const [memberActivityBookingsData, setMemberActivityBookingsData] = useState([]);
  useEffect(() => {
    console.log("Loading booking list")
      fetch(`/api/member_activity_bookings/user_view/${userId}`) //linking thing need to be member user id as well?? e.g., Link to ... `$member_user_id`? and fetch session?
        .then((res) => res.json())
        .then((res) => {
            setMemberActivityBookingsData(res.member_bookings);
        });
    }, [userId]);

  return (
    <section>
      <h1>IT"S WORKING!!</h1>
      <Box
        sx={{
          pt: 5,
          pb: 1,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            align="center"
            color="text.primary"
          >
            Your bookings list
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.primary"
          >
            Here is a list of your booked classes
          </Typography>
        </Container>
      </Box>
      <Button
            variant="contained"
            align="center"
            sx={{
              m: 2,
              ":hover": {
                bgcolor:"secondary.main",
              },
            }}
            
            color="primary"
            onClick={() => navigate("/class_list")}
          >
            Browse Available Classes
      </Button>
      <Container sx={{ py: 5 }}>
          {memberActivityBookingsData.map((memberActivityBookingsObject) => (
            <MemberActivityBookingsItems memberActivityBookings={memberActivityBookingsObject} />
          ))}
      </Container>
    </section>
  );
};

const MemberActivityBookingsItems = ({ memberActivityBookings }) => {
  const navigate = useNavigate();
    return (
        <main>
          {/* <p>Test here {memberActivityBookings.firstname}</p> */}
          <Box 
          sx={{ mb: 1, display: "flex", flexDirection: "row" }}
          >
            <Card
          sx={{
            width: {md: "50vw", xs: "100%"},
            height: "70%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            m: 0.4,
            p: 0.2,
            
          }}
        >
          <CardContent 
            sx={{
              
              display: { xs: 'block', md: 'grid', gridTemplateColumns: "repeat(3, 1fr)"}
            }}  
          >
            <Box
              sx={{
                
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Typography variant="body2" color="black">
                <div>
                      <span><b>Activity: </b> {memberActivityBookings.name} </span>
                </div>
                <div>
                      <span><b>Booking Date: </b>{memberActivityBookings.booking_date.substr(0, 10)} </span>
                </div>
                <div>
                      <span><b>Duration: </b>{memberActivityBookings.duration_minutes} minutes </span>
                </div>
                <div>
                      <span><b>Room: </b>{memberActivityBookings.room_number} </span>
                </div>
              </Typography>
            </Box>
            <Container sx={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <Link to={`/delete_member_booking/${memberActivityBookings.member_activity_bookings_id}`}>
                    <Button 
                        size="small"
                        sx={{
                          m: 2,
                          maxWidth:'100px',
                          maxHeight: '70px',
                        ":hover": {
                            bgcolor: "primary.main",
                            color: 'text.primary'
                        },
                        }}
                        >Delete</Button>
              </Link>
                </Container>
              </CardContent>
            </Card>
            <Routes>
              <Route path="/:member_activity_bookings_id" element={<DeleteMemberBooking />} />
            </Routes>
          </Box>
        </main>
    );
};

