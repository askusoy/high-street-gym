import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const CreateBlogpost = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [bodyData, setBodyData] = useState("");

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

  const onSubmit = (bodyData) => {
    fetch("/api/blogposts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((message) => {
        alert(message);
        navigate("/blog");
      })
      .catch((error) => {
        alert("Failed to create blogpost: " + error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
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
            Create Blogpost
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="category"
                  name="category"
                  required
                  fullWidth
                  id="category"
                  label="Post Category"
                  autoFocus
                  {...register("category")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="member_user_id"
                  label="Member ID"
                  name="member_user_id"
                  autoComplete="member_user_id"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={userId}
                  {...register("member_user_id",
                  {onChange: (e) => {setUserId(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{ sx: { height: 250 } }}
                  multiline
                  // maxRows={7}
                  required
                  fullWidth
                  name="content"
                  label="Insert text here..."
                  type="content"
                  id="content"
                  {...register("content")}
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
            >
              Create Post
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};
