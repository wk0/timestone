import { Box, Grid, Typography } from "@mui/material";
import GridCard from "../GridCard";

const ExploreGrid = (props: any) => {
  const { timestones } = props;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100%",
          width: "100%",
          marginTop: "1.5rem",
        }}
      >
        <Grid container spacing={3}>
          {timestones &&
            timestones.map((stone: any, idx: number) => (
              <GridCard key={idx} stone={stone} />
            ))}
          {(!timestones || timestones.length <= 0) && (
            <Grid item lg={3} md={4} xs={12}>
              <Typography variant="body1">Nothing here yet!</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ExploreGrid;
