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

export const EditUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    defaultValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // probably define something like params that allow access 
  // to everything other than user_id..
  // const details = ();

  // const [user, setUser] = useState("");
  const [userId, setUserId] = useState(`${params.user_id}`);
  const [firstName, setFirstName] = useState(""); // useState(`${details.firstname}`)
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  // OR make it so that when you submit an update, the data is from firstName? 


  // let user_id = new URLSearchParams(window.location.search).get("user_id");

  // if (user_id) {
  //   fetch(`/api/users/${user_id}`)
  //     .then((response) => response.json())
  //     .then((user) => {
  //       document.getElementById("user_id").value = user.user_id;
  //       document.getElementById("firstname").value = user.firstname;
  //       document.getElementById("lastname").value = user.lastname;
  //       document.getElementById("email").value = user.email;
  //       document.getElementById("phone").value = user.phone;
  //       document.getElementById("username").value = user.username;
  //       document.getElementById("password").value = user.password;
  //       document.getElementById("role").value = user.role;
  //       document.getElementById("health_conditions").value =
  //         user.health_conditions;
  //     });
  // }

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
      setEmail(result.email)
      setPhone(result.phone)
      setUsername(result.username)
      setPassword(result.password)
      setRole(result.role)
      setHealthConditions(result.health_conditions)
    }



  // Send the updated user data back to the API on form submit
  const onSubmit = () => {
    const user = {
      user_id: JSON.stringify(userId),
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: JSON.stringify(phone),
      username: username,
      password: password,
      role: role,
      health_conditions: healthConditions
    };

    fetch("/api/users/update", {
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
        alert("Failed to update user: " + error)
      });
  };

  // const onSubmit = (user) => {
  //   const formdata = new FormData(user.currentTarget);
  //   const editData = {
  //     user_id: formdata.get("user_id"),
  //     firstname: formdata.get("firstname"),
  //     lastname: formdata.get("lastname"),
  //     email: formdata.get("email"),
  //     phone: formdata.get("phone"),
  //     username: formdata.get("username"),
  //     password: formdata.get("password"),
  //     role: formdata.get("role"),
  //     health_conditions: formdata.get("health_conditions")
  //   }

  //   fetch("/api/users/update", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(editData),
  //   })
  //     .then((res) => res.json())
  //     .then((message) => {
  //       alert(message);
  //       navigate("/list_users");
  //     })
  //     .catch((error) => {
  //       alert("Failed to update user: " + error);
  //     });
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form
      onSubmit={handleSubmit(onSubmit)}
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
            Edit Existing User
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullwidth
                  InputLabelProps={{ shrink: true }}
                  name="user_id"
                  required
                  id="user_id"
                  // label="User ID (Read Only)"
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                  // commented out for test purposes
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  {...register("user_id")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <input type="text" id="firstname" value={firstName} {...register("firstname", 
                  {onChange: (e) => {setFirstName(e.target.value)}}
                  )}></input> */}
                <TextField
                  InputLabelProps={{ shrink: true }}
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  value={firstName}
                  {...register("firstname", 
                  {onChange: (e) => {setFirstName(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  value={lastName}
                  {...register("lastname", 
                  {onChange: (e) => {setLastName(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  {...register("email", 
                  {onChange: (e) => {setEmail(e.target.value)}},
                  {pattern: /[a-zA-Z0-9]*@[a-zA-Z]*\.com/,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  value={phone}
                  {...register("phone",
                  {onChange: (e) => {setPhone(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="username"
                  id="username"
                  value={username}
                  {...register("username",
                  {onChange: (e) => {setUsername(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  {...register("password",
                  {onChange: (e) => {setPassword(e.target.value)}},
                  {
                    pattern: /[a-zA-Z0-9]{1,24}/,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  name="role"
                  label="Role"
                  type="role"
                  id="role"
                  value={role}
                  {...register("role",
                  {onChange: (e) => {setRole(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  name="health_conditions"
                  label="Health Conditions"
                  type="health_conditions"
                  id="health_conditions"
                  value={healthConditions}
                  {...register("health_conditions",
                  {onChange: (e) => {setHealthConditions(e.target.value)}}
                  )}
                />
              </Grid>
            </Grid>
            <Button
              style={{
                background: "linear-gradient(to right, #ed8626, #25013b)",
              }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={onSubmit}
            >
              Edit User
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};
