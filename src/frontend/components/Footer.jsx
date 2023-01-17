import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

function Copyright() {
  return (
    <Typography variant="caption" color="text.primary">
      {'Copyright © '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export const StickyFooter = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundcolor: 'primary',
        maxHeight: '10',
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 1,
          mt: 'auto',
          backgroundcolor: 'primary',
          position: 'fixed',
          width: '100%',
          zIndex: 1,
          bottom: 0
        }}
        style={{background: "linear-gradient(to right, #ed8626, #25013b)"}}
      >
        <CssBaseline />
        <Container maxWidth="sm" sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 2fr)"
            }}>
          <Typography variant="body1">
            Follow us on social media!
          </Typography>
          <Grid container 
            alignContent='space-between'
            direction="row"
            justifyContent="flex-end"
            alignItems="center">
            <GitHubIcon/>
            <FacebookIcon/>
            <TwitterIcon/>
          </Grid>      
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}