import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const DeleteUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    defaultValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const [user, setUser] = useState("");
  const [userId, setUserId] = useState(`${params.user_id}`);
  const [firstName, setFirstName] = useState(""); // useState(`${details.firstname}`)
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");


    useEffect(() => {
      getUserDetails();
    }, [])

    const getUserDetails = async () => {
      let result = await fetch (`/api/users/${params.user_id}`)
      result = await result.json();
      console.log(result)
      setUserId(result.user_id)
      setFirstName(result.firstname)
      setLastName(result.lastname)
      setRole(result.role)
    }



  // Send the updated user data back to the API on form submit
  const onDelete = (user) => {
    fetch("/api/users/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((message) => {
        alert(message)
        navigate("/list_users")
      })
      .catch((error) => {
        alert("Failed to delete user: " + error)
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form
      onSubmit={handleSubmit(onDelete)}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 7,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Delete Existing User
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullwidth
                  InputLabelProps={{ shrink: true }}
                  name="user_id"
                  id="user_id"
                  label="User ID"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  {...register("user_id")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  name="firstname"
                  fullWidth
                  id="firstname"
                  label="First Name"
                  value={firstName}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("firstname", 
                  {onChange: (e) => {setFirstName(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  value={lastName}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("lastname", 
                  {onChange: (e) => {setLastName(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  name="role"
                  label="Role"
                  type="role"
                  id="role"
                  value={role}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("role",
                  {onChange: (e) => {setRole(e.target.value)}}
                  )}
                />
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5" color ="red">

                Are you sure you want to delete this user?
            </Typography>
            <Button
              style={{
                background: "purple",
              }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete User
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};