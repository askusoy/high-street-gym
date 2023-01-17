import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EditActivityBooking } from "./EditActivityBooking";
import { DeleteActivityBooking } from "./DeleteActivityBooking";

export const ListActivityBookings = () => {
    
  const navigate = useNavigate();
  const [activityBookingsData, setActivityBookingsData] = useState([]);
  useEffect(() => {
      fetch("/api/activity_bookings/all_with_details")
        .then((res) => res.json())
        .then((res) => {
            setActivityBookingsData(res.bookings);
        });
    }, []);

  return (
    <section>
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
            Activity Bookings List (Admin View)
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
            onClick={() => navigate("/create_activity_booking")}
          >
            Create New Booking For Class
      </Button>
      <Container sx={{ py: 5 }}>
          {activityBookingsData.map((activityBookingsObject) => (
            <ActivityBookingsItems activityBookings={activityBookingsObject} />
          ))}
      </Container>
    </section>
  );
};

const ActivityBookingsItems = ({ activityBookings }) => {
  const navigate = useNavigate();
  const [activityBookingsId, setActivityBookingsId] = useState({activity_bookings_id: ""});

  let { activity_bookings_id } = useParams();
    return (
        <main>
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
                <b>({activityBookings.activity_bookings_id})</b>
                <div>
                      <span><b>Activity: </b> {activityBookings.name} </span>
                </div>
                <div>
                      <span><b>Booking Date: </b>{activityBookings.booking_date.substr(0, 10)} </span>
                </div>
                <div>
                      <span><b>Personal Trainer: </b><br></br>{activityBookings.firstname} {activityBookings.lastname}</span>
                </div>
                <div>
                      <span><b>Room: </b>{activityBookings.room_number} </span>
                </div>
              </Typography>
            </Box>
            <Container sx={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <Link to={`/edit_activity_booking/${activityBookings.activity_bookings_id}`}>
                    <Button
                        size="small"
                        sx={{
                          m: 2,
                          maxWidth:'50px',
                          maxHeight: '50px',
                        ":hover": {
                            bgcolor: "primary.main",
                            color: 'text.primary'
                        },
                        }}
                    >
                        Edit
                    </Button>
              </Link>
              <Link to={`/delete_activity_booking/${activityBookings.activity_bookings_id}`}>
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
              <Route path="/:activity_bookings_id" element={<EditActivityBooking />} />
              <Route path="/:activity_bookings_id" element={<DeleteActivityBooking />} />
            </Routes>
          </Box>
        </main>
    );
};

