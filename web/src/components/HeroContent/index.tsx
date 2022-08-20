import { Box, Container, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import './rotation.css';
import { useEffect, useState } from 'react';


const HeroContent = (props: any) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: 12,
      }}
      {...props}
    >
      <Container
        maxWidth="lg"
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          px: {
            md: '130px !important',
            xs: 4
          }
        }}
      >
        <Grid container>
          <Box
            style={{ paddingTop: '1.3rem', paddingBottom: '3rem' }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
                sx={{ pt: 1, pb: 2, fontFamily: 'Plus Jakarta Sans', fontSize: '1.3rem' }}
              >
                Lorem ipsum dolor sit amet consectetur
              </Typography>
            </Box>
            <Grid container>
              {/* {!isMobile && (
                <Box style={{ marginRight: '2.2rem', marginTop: '-7px', marginBottom: '1rem' }} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <img src="/placeholder_icon.svg" alt="timestone-logo" style={{ width: '96px', height: '96px', animation: 'rotation 60s infinite linear' }} />
                </Box>
              )} */}
              <Box>
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h1"
                  sx={{ fontSize: '3.7rem' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing 
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroContent;