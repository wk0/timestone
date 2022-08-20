import { Box, Container, Typography, Grid, useTheme, useMediaQuery} from '@mui/material';
import './rotation.css';
import { useEffect, useState } from 'react';


const HeroContent = (props:any) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: (!isMobile) ? 6 : 12
      }}
      {...props}
    >
      <Container
        maxWidth="xl"
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
            <Grid container>
              {!isMobile && (
                <Box style={{ marginRight: '2.2rem', marginTop: '-7px', marginBottom: '1rem' }} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <img src="/placeholder_icon.svg" alt="timestone-logo" style={{ width: '96px', height: '96px', animation: 'rotation 60s infinite linear' }} />
                </Box>
              )}
              <Box>
                <Typography
                  align="left"
                  color="textPrimary"
                  variant="h3"
                >
                  snapshots of the open web
                </Typography>
                <Typography
                  align="left"
                  color="textSecondary"
                  variant="body1"
                  sx={{ pt: 1, pb: 0, fontFamily: 'Plus Jakarta Sans', fontSize: '1.3rem' }}
                >
                  mint provably real screenshots of any internet URL at a moment in time, as a tradeable NFT
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