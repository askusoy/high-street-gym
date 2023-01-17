import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const EditBlogpost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const [blogpostId, setBlogpostId] = useState(`${params.blogpost_id}`);
  const [memberUserId, setMemberUserId] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  
    useEffect(() => {
      getBlogpostDetails();
    }, [])

    const getBlogpostDetails = async () => {
      let result = await fetch (`/api/blogposts/${params.blogpost_id}`)
      result = await result.json();
      console.log(result)
      setBlogpostId(result.blogpost_id)
      setMemberUserId(result.member_user_id)
      setContent(result.content)
      setCategory(result.category)
    }

  const onUpdate = (bodyData) => {

    fetch("/api/blogposts/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((message) => {
        alert(message);
        navigate("/list_blogposts");
      })
      .catch((error) => {
        alert("Failed to edit post: " + error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={handleSubmit(onUpdate)}>
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
            Edit a class
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullwidth
                  InputLabelProps={{ shrink: true }}
                  name="blogpost_id"
                  id="blogpost_id"
                  label="Blogpost ID"
                  value={blogpostId}
                  onChange={(e) => setBlogpostId(e.target.value)}
                  {...register("blogpost_id")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullwidth
                  InputLabelProps={{ shrink: true }}
                  name="member_user_id"
                  id="member_user_id"
                  label="Post Creator ID"
                //   InputProps={{
                //     readOnly: true,
                //   }}
                  value={memberUserId}
                  {...register("member_user_id",
                  {onChange: (e) => {setMemberUserId(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  id="content"
                  label="Content"
                  name="content"
                  value={content}
                  InputProps={{
                    sx: { height: 250 }
                  }}
                  {...register("content", 
                  {onChange: (e) => {setContent(e.target.value)}}
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  name="category"
                  label="Category"
                  type="category"
                  id="category"
                  value={category}
                  {...register("category",
                  {onChange: (e) => {setCategory(e.target.value)}}
                  )}
                />
              </Grid>
            </Grid>
            <Button
              style={{
                background: "purple",
              }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit post
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
