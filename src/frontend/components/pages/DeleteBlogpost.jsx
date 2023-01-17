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

export const DeleteBlogpost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [blogpostId, setBlogpostId] = useState(`${params.blogpost_id}`);
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
      setContent(result.content)
      setCategory(result.category)
    }

  const onDelete = (post) => {
    fetch("/api/blogposts/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((message) => {
        alert(message)
        navigate("/list_blogposts")
      })
      .catch((error) => {
        alert("Failed to delete post: " + error)
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
            Delete Existing Blogpost
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullwidth
                  InputLabelProps={{ shrink: true }}
                  name="blogpost_id"
                  id="blogpost_id"
                  label="Blogpost ID"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={blogpostId}
                  onChange={(e) => setBlogpostId(e.target.value)}
                  {...register("blogpost_id")}
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
                    sx: { height: 250 },
                    readOnly: true,
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
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("category",
                  {onChange: (e) => {setCategory(e.target.value)}}
                  )}
                />
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5" color ="red">

                Are you sure you want to delete this post?
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
              Delete post
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};