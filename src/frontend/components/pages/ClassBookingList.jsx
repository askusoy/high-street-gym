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
import { useNavigate } from "react-router-dom";
// REVAMP THIS, MAKE IT A JOINED TABLE FROM ACTIVITIES, AND ACTIVITY BOOKINGS 
// TO DISPLAY IN THE CARDS, AND HAVE MEMBERS BE ABLE TO CLICK A BOOK BUTTON
// THAT WILL SHOW IN THE MEMBER_ACTIVITY_BOOKINGS TABLE

// CAN THE BOOKING DATE BE A STRING? OR DOES IT HAVE TO BE DATETIME FORMAT
export const ActivityList = ({userRole}) => {

  const [activityListData, setActivityListData] = useState([]);

  useEffect(() => {
    fetch("/api/activities/all")
      .then((res) => res.json())
      .then((response_data) => {
        setActivityListData(response_data);
        console.log(response_data);
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
            List of Available Classes
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
                <span>Room number: {activity.room_number}</span>
                {/* add trainer name etc. in here */}
              </Box>
            </Typography>
          </CardContent>
          <CardActions>

                <Button
                  size="small"
                  sx={{
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                    {/* TO-DO: Set onClick booking function... 
                    create a booking that includes info from other tables.. 
                    JOIN activity_bookings and activities name etc */}
                  Book class
                </Button>
            
           
          </CardActions>
        </Card>
      </Grid>
    </main>
  );
};
