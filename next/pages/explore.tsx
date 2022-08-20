import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Chip,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExploreGrid from "../components/ExploreGrid";

const timestones = [
  {
    image_url: "/demo_snapshot.png",
    capture_url: "https://nytimes.com",
  },
  {
    image_url: "/demo_snapshot.png",
    capture_url: "https://google.com",
  },
  {
    image_url: "/demo_snapshot.png",
    capture_url: "https://twitter.com",
  },
];
const Explore: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState("latest");

  const handleDelete = () => {
    // TODO: handle search term delete
  };

  return (
    <div>
      <Head>
        <title>Timestone</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box
          sx={{
            pt: isMobile ? 4 : 16,
            pb: 0,
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              alignItems: "flex-start",
              display: "flex",
              flexDirection: "column",
              marginTop: isMobile ? "1.5rem" : 0,
              px: {
                md: "125px !important",
                xs: 4,
              },
            }}
            style={{ paddingBottom: "80px" }}
          >
            {/* <Grid container justifyContent="center">
            <QuickStats4 totalItems={originalTimestones?.length} totalArtists={timestones[0]?.total_artists + 1} isLive={isLive} />
          </Grid> */}
            <Grid
              container
              justifyContent="space-between"
              sx={{ mt: isMobile ? 2 : 0 }}
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="h5"
                  style={{ lineHeight: "48px", fontSize: "28px" }}
                >
                  Recent Mints
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justifyContent="flex-start"
                  spacing={3}
                  alignItems="center"
                >
                  {searchTerm && searchTerm.length > 0 && (
                    <Grid item>
                      <Chip
                        label={searchTerm}
                        variant="outlined"
                        onDelete={handleDelete}
                        style={{ marginTop: "10px" }}
                      />
                    </Grid>
                  )}
                  {isMobile && (
                    <Grid item style={{ maxWidth: "200px" }}>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          height: 44,
                          pr: 2,
                          pt: 1,
                        }}
                      >
                        <Box
                          sx={{
                            flexGrow: 1,
                          }}
                        >
                          <Button variant="outlined" size="medium">
                            <SearchIcon
                              color="action"
                              fontSize="medium"
                              style={{ color: "#2ECC71", marginRight: "6px" }}
                            />
                            Search
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                  <Grid item>
                    <Tabs value={value} aria-label="styled tabs example">
                      <Tab label="All" value="all" />
                      <Tab label="Most Recent" value="latest" />
                      <Tab label="Toplist" value="toplist" />
                    </Tabs>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid container justifyContent="flex-end" sx={{ my: 2 }}>
            <FormControlLabel control={<Switch defaultChecked />} label="Show Explicit" />
          </Grid> */}
            <Box sx={{ width: "100%", mt: 6 }}>
              <ExploreGrid timestones={timestones} />
            </Box>
          </Container>
        </Box>
      </main>
    </div>
  );
};

export default Explore;
