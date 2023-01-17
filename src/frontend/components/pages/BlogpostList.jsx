import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EditBlogpost } from "./EditBlogpost";
import { DeleteBlogpost } from "./DeleteBlogpost";

export const BlogpostList = () => {
  const navigate = useNavigate();
  const [blogpostData, setBlogpostListData] = useState([]);
    useEffect(() => {
      fetch("/api/blogposts/all")
        .then((res) => res.json())
        .then((response_data) => {
            setBlogpostListData(response_data);
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
            List of blogposts
          </Typography>
        </Container>
      </Box>
      {/* <Button
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
      </Button> */}
      <Container sx={{ py: 5 }}>
          {blogpostData.map((blogpostObject) => (
            <BlogpostItem blogpost={blogpostObject} />
          ))}
      </Container>
    </section>
  );
};

const BlogpostItem = ({ blogpost }) => {
  const navigate = useNavigate();
  const [blogpostId, setBlogpostId] = useState({blogpost_id: ""});
  // const target = (e) => setActivityId(e.target);
  
  let { blogpost_id } = useParams();
    return (
        <main>
          <Box 
          sx={{ mb: 1, display: "flex", flexDirection: "row" }}
          >
            <Card
          sx={{
            width: "55vw",
            height: "100%",
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
              <Typography sx={{ wordBreak: "break-word" }} variant="body2" color="black">
                <b>({blogpost.blogpost_id})</b>
                <div>
                      <span><b>{blogpost.content}</b> </span>
                </div>
                <div>
                      <span><i>Category: {blogpost.category}</i> </span>
                </div>
              </Typography>
            </Box>
            <Container sx={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <Link to={`/edit_blogpost/${blogpost.blogpost_id}`}>
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
                    >
                        Edit
                    </Button>
              </Link>
              <Link to={`/delete_blogpost/${blogpost.blogpost_id}`}>
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
              <Route path="/:blogpost_id" element={<EditBlogpost />} />
              <Route path="/:blogpost_id" element={<DeleteBlogpost />} />
            </Routes>
          </Box>
        </main>
    );
};

