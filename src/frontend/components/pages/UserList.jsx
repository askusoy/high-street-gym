import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EditUser } from "./EditUser";
import { DeleteUser } from "./DeleteUser";

export const UserList = () => {
    const [userListData, setUserListData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      fetch("/api/users/all")
        .then((res) => res.json())
        .then((response_data) => {
          setUserListData(response_data);
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
            User List
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
            onClick={() => navigate("/create_user")}
          >
            Create New User
      </Button>
      <Container sx={{ py: 5 }}>
          {userListData.map((userObject) => (
            <UserItem user={userObject} />
          ))}
      </Container>
    </section>
  );
};

const UserItem = ({ user }) => {
  let { user_id } = useParams();
  const navigate = useNavigate();
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
                <div>
                      <span><b>({user.user_id}) {user.firstname} {user.lastname}</b> </span>
                </div>
                <div>
                      <span><i>User Name: {user.username}</i> </span>
                </div>
                <div>
                      <span>Role: {user.role} </span>
                </div>
              </Typography>
            </Box>
            <Container sx={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <Link to={`/edit_user/${user.user_id}`}>
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
                        // onClick={() => navigate("/edit_user?user_id=:user_id")}
                    >
                        Edit
                    </Button>
                </Link>
                <Link to={`/delete_user/${user.user_id}`}>
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
                        // onDelete = {onDelete}
                        >Delete</Button>
                </Link>
                </Container>
              </CardContent>
            </Card>
            <Routes>
              <Route path="/:user_id" element={<EditUser />} />
              <Route path="/:user_id" element={<DeleteUser />} />
            </Routes>
          </Box>
        </main>
    );
};