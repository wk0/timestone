import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import "./rotation.module.css";
import { useEffect, useState } from "react";

const HeroContent = (props: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        pt: 4,
      }}
      {...props}
    >
      <Container
        maxWidth="lg"
        sx={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          px: {
            md: "130px !important",
            xs: 4,
          },
        }}
      >
        <Grid container>
          <Box style={{ paddingTop: "1.3rem", paddingBottom: "3rem" }}>
            <Box sx={{ textAlign: "center" }}>
              <img src="/timestone_bold_logo.png" alt="timestone logo" style={{ maxHeight: 120 }} />
            </Box>
            <Grid container>
              {/* {!isMobile && (
                <Box style={{ marginRight: '2.2rem', marginTop: '-7px', marginBottom: '1rem' }} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <img src="/placeholder_icon.svg" alt="timestone-logo" style={{ width: '96px', height: '96px', animation: 'rotation 60s infinite linear' }} />
                </Box>
              )} */}
              <Box sx={{ mx: 20, mt: 2 }}>
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h1"
                  sx={{ fontSize: "2.7rem" }}
                >
                  Archive and Collect Web Pages on the Blockchain as NFTs.
                </Typography>
              </Box>
            </Grid>
            {/* <Box sx={{ textAlign: "center" }}>
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
                sx={{
                  pt: 1,
                  pb: 2,
                  fontFamily: "Cardo",
                  fontSize: "1.3rem",
                }}
              >
                Lorem ipsum dolor sit amet consectetur
              </Typography>
            </Box> */}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroContent;
