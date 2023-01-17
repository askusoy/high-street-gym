import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, Link, Routes, Route, useParams } from "react-router-dom";
import { ConfirmBooking } from "./ConfirmBooking";

export const ActivityList = ({userRole}) => {

  const [activityListData, setActivityListData] = useState([]);

  useEffect(() => {
    fetch("/api/activity_bookings/all_with_details")
      .then((res) => res.json())
      .then((response_data) => {
        setActivityListData(response_data.bookings);
      });
  }, []);

  return (
    <section>
      <Box sx={{m:5, letterSpacing: 0.1}}
      >
        <Container maxWidth="sm">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
          >
            Class List
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 5 }}>
        <Grid container spacing={5}>
          {activityListData.map((activityObject) => (
            <ActivityItem activity={activityObject} />
          ))}
        </Grid>
      </Container>
    </section>
  );
};

const ActivityItem = ({ activity, userRole }) => {
  const navigate = useNavigate();
  return (
    <main>
      <Grid>
        <Card
          sx={{
            minWidth: "250px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "5px 7px #6a1b9a",
            m: 4,
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={require("../../images/ml_classes.jpg")}
            alt="random image"
          />
          <CardContent>
            <Typography variant="caption" color="black">
              <Box
                sx={{
                  display: "grid",
                  gridTemplateRows: "repeat(5, 1fr)",
                }}
              >
                <span>Name: {activity.name}</span>
                <span>Duration: {activity.duration_minutes} minutes</span>
                <span>Level: {activity.level}</span>
                <span>Trainer Name: {activity.firstname} {activity.lastname}</span>
                <span>Room: {activity.room_number}</span>
                <span><b></b>Available Date: {activity.booking_date.substr(0, 10)}</span>
              </Box>
            </Typography>
          </CardContent>
          <CardActions>
          <Link to={`/confirm_booking/${activity.activity_bookings_id}`}>
                <Button
                  size="small"
                  sx={{
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Book class
                </Button>
            </Link>
            
           
          </CardActions>
        </Card>
        <Routes>
              <Route path="/:activity_bookings_id" element={<ConfirmBooking />} />
        </Routes>
      </Grid>
    </main>
  );
};
