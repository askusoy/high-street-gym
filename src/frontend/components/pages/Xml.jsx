import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Xml = () => {
  const navigate = useNavigate();
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
            Download XMLs here
          </Typography>
        </Container>
      </Box>
      <Box align="center">
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
            // onClick={() => navigate("/")}
          >
            <a href="api/export/activities-list">
            XML 1 (Activity Bookings)
            </a>
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
            // onClick={() => navigate("/")}
          > <a href="api/export/blogposts-list">
         XML 2 (Blogposts)
    </a>
      </Button>
      </Box>
    </section>
  );
};