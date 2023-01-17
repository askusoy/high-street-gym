import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CreateBlogpostHookForm } from "./CreateBlogpost";

export const Blog = () => {
  const navigate = useNavigate();

  const [blogPostData, setBlogPostData] = useState([]);
  useEffect(() => {
    fetch("/api/blogposts/all")
      .then((res) => res.json())
      .then((response_data) => {
        setBlogPostData(response_data.reverse());
        console.log(response_data);
      });
  }, []);

  // display data as BlogItems
  return (
    <section>
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            High Street Blog
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            paragraph
          >
            Inspiring posts from inspirational people
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
            onClick={() => navigate("/create_blogpost")}
          >
            Create Post
      </Button>
      {blogPostData.map((blogObject) => (
        <BlogItem blog={blogObject} />
      ))}
    </section>
  );
};

const BlogItem = ({ blog }) => {
  const handleDelete = () => { 
    let blogpost_id = new URLSearchParams // how do i target JUST that one blogpost?
    let blogpost = {blogpost_id: blogpost_id}
    fetch("/api/blogposts/delete", {
      method: "POST",
      headers: {
          'Content-Type': "application/json"
      },
      body: JSON.stringify(blogpost) // got cyclic object error
    })
    .then(response => response.json())
    .then(response => {
        alert(response)
    })
    .catch(error => {
        alert("failed to delete post - " + error)
    })
  }
  
  return (
    <main>
      <Box 
        sx={{ mb: 1, display: "flex", flexDirection: "row-reverse" }}
        >
        <Card
          sx={{
            width: "75%",
            height: "80%",
            display: "flex",
            flexDirection: "row",
            boxShadow: "5px 10px #6a1b9a",
            m: 1,
          }}
        >
          <CardContent
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(3, 1fr)",
            }}
          >
            <Typography variant="caption" color="purple">
              <span>{blog.category}</span>
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }} variant="subtitle1" color="black">
              <Box>
                <span>{blog.content}</span>
              </Box>
            </Typography>
            {/* <CardActions>
              <Button
                    size="small"
                    maxWidth="30px"
                    sx={{
                      ":hover": {
                        bgcolor: "primary.main",
                        color: 'text.primary'
                      },
                    }}
                    onClick={handleDelete}
                    >
                    Delete
              </Button>
            </CardActions> */}
          </CardContent>
        </Card>
      </Box>
      <Routes>
        <Route path="/create_blogpost" element={<CreateBlogpostHookForm />} />
      </Routes>
    </main>
  );
};
