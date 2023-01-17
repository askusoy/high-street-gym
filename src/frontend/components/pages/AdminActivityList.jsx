// BACKUP JUST IN CASE IN-PAGE DELETE DOES NOT WORK
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EditActivity } from "./EditActivity";
import { DeleteActivity } from "./DeleteActivity";

export const AdminActivityList = () => {
  const navigate = useNavigate();
  const [adminClassListData, setAdminClassListData] = useState([]);
    useEffect(() => {
      fetch("/api/activities/all")
        .then((res) => res.json())
        .then((res) => {
            setAdminClassListData(res.activities);
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
            Class List (Admin View)
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
            onClick={() => navigate("/create_class")}
          >
            Create New Class
      </Button>
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
          {adminClassListData.map((adminClassListObject) => (
            <AdminClassListItem adminClassList={adminClassListObject} />
          ))}
      </Container>
    </section>
  );
};

const AdminClassListItem = ({ adminClassList }) => {
  const navigate = useNavigate();
  const [activityId, setActivityId] = useState({activity_id: ""});
  // const target = (e) => setActivityId(e.target);
  
  let { activity_id } = useParams();
    return (
        <main>
          <Box 
          sx={{ mb: 1, display: "flex", flexDirection: "row" }}
          >
            <Card
          sx={{
            width: "55vw",
            height: "70%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            m: 0.4,
            p: 0.2
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
                <b>({adminClassList.activity_id})</b>
                <div>
                      <span><b>{adminClassList.name}</b> </span>
                </div>
                <div>
                      <span><i>Duration: {adminClassList.duration_minutes}</i> </span>
                </div>
                <div>
                      <span>Level: {adminClassList.level} </span>
                </div>
              </Typography>
            </Box>
            <Container sx={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <Link to={`/edit_class/${adminClassList.activity_id}`}>
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
                        // onClick={() => navigate("/edit_class")}
                    >
                        Edit
                    </Button>
              </Link>
              <Link to={`/delete_class/${adminClassList.activity_id}`}>
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
              <Route path="/:activity_id" element={<EditActivity />} />
              <Route path="/:activity_id" element={<DeleteActivity />} />
            </Routes>
          </Box>
        </main>
    );
};

