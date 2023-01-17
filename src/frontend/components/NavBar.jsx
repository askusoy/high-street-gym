import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

export const NavBar = ({ userRole }) => {
  const [userId, setUserId] = useState("")
  useEffect(() => {
    fetch("/api/users/status")
      .then((res) => res.json())
      .then((response_data) => {
        console.log(response_data);
        setUserId(response_data.user_id)
      });
  }, []);

  const navigate = useNavigate();
  const [open, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              display: { md: "none" },
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            variant="temporary" 
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)} 
          >
            <Box>
              <Button
                  onClick={() => navigate("/")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Home
              </Button>
              {userRole == "member" ? (
            <>
              <Button
                  onClick={() => navigate("/blog")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Blog
              </Button>
              <Button
                  onClick={() => navigate("/class_list")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Classes
              </Button>
              <Button
                  onClick={() => navigate("/member_bookings_member_view/")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Your bookings
              </Button>
              <Button
                  onClick={() => navigate("/logout")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Logout
              </Button>
            </>
          ) : userRole == "trainer" ? (
            <>
              <Button
                  onClick={() => navigate("/blog")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Blog
              </Button>
              <Button
                  onClick={() => navigate("/list_activity_bookings")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Trainer<br></br>
                  Bookings
              </Button>              
              <Button
                  onClick={() => navigate("/list_member_bookings")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  List Member<br></br>
                  Bookings
              </Button>
              <Button
                  onClick={() => navigate("/logout")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Logout
              </Button>
            </>
          ) : userRole == "manager" ? (
            <>
              <Button
                  onClick={() => navigate("/list_blogposts")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  List blogposts
              </Button>
              <Button
                  onClick={() => navigate("/admin_class_list")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Class List<br></br>
                  (Admin View)
              </Button>
              <Button
                  onClick={() => navigate("/list_users")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  User List
              </Button>
              <Button
                  onClick={() => navigate("/xml")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  XML
              </Button>
              <Button
                  onClick={() => navigate("/list_member_bookings")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  List Member<br></br>
                  Bookings
              </Button>
              <Button
                  onClick={() => navigate("/logout")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Logout
              </Button>
            </>
          ):(
            <>
              <Button
                  onClick={() => navigate("/signup")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Signup
              </Button>
              <Button
                  onClick={() => navigate("/login")}
                  size="medium"
                  sx={{
                    display: { xs: "block" },
                    m: 3,
                    ":hover": {
                      bgcolor: "primary.main",
                      color: 'text.primary'
                    },
                  }}
                  >
                  Login
              </Button>
            </>
          )}
              {/* <ListItemButton>
                <ListItemText
                  sx={{ color: "primary.main" }}
                  primary="Documents"
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemText sx={{ color: "primary.main" }} primary="Other" />
              </ListItemButton> */}
            </Box>
          </Drawer>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            High Street Gym
          </Typography>
          {userRole == "member" ? (
            <>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/blog")}
              >
                Blog
              </Button>
              <Button
                sx={{
                  m: 2,
                  display: { xs: "none", md: "block" },
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/class_list")}
              >
                Class List
              </Button>
              <Button
                sx={{
                  m: 2,
                  display: { xs: "none", md: "block" },
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/member_bookings_member_view/")}
              >
                Your bookings
              </Button>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/logout")}
              >
                Logout
              </Button>
            </>
          ) : userRole == "trainer" ? (
            <>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/blog")}
              >
                Blog
              </Button>
              <Button
                sx={{
                  m: 2,
                  display: { xs: "none", md: "block" },
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/list_activity_bookings")}
              >
                Create Booking
              </Button>
              <Button
                sx={{
                  m: 2,
                  display: { xs: "none", md: "block" },
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/list_member_bookings")}
              >
                List Member Bookings
              </Button>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/logout")}
              >
                Logout
              </Button>
            </>
          ) : userRole == "manager" ? (
            <>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/list_blogposts")}
              >
                List Blogposts
              </Button>
              <Button
                sx={{
                  m: 2,
                  display: { xs: "none", md: "block" },
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/admin_class_list")}
              >
                Class List (Admin View)
              </Button>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/list_users")}
              >
                User List
              </Button>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/xml")}
              >
                XML
              </Button>
              <Button
                sx={{
                  m: 2,
                  display: { xs: "none", md: "block" },
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/list_member_bookings")}
              >
                List Member Bookings
              </Button>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/logout")}
              >
                Logout
              </Button>
            </>
            
          ): (
            <>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                className="signup"
                color="inherit"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                  m: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </>
          ) 
        }
        </Toolbar>
      </AppBar>
    </Box>
  );
};
