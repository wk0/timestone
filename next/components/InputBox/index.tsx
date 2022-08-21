import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
  InputBase,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect, useState } from "react";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import Mint from "../Mint";

// Custom themed from Material-Ui InputBase component
const CustomizedInputBase = (props: any) => {
  const { placeholder, value, onChange, onKeyPress } = props;

  return (
    <Paper
      component="form"
      sx={{
        p: "0px 16px",
        display: "flex",
        alignItems: "center",
        width: "95%",
        maxWidth: 800,
        height: 75,
        borderRadius: 0,
        fontSize: "30px!important",
      }}
    >
      <InputBase
        sx={{ ml: 2, flex: 1, mt: "0px" }}
        placeholder={placeholder}
        inputProps={{ style: { fontSize: 25 } }}
        value={value}
        onChange={onChange}
        autoFocus
        onKeyPress={onKeyPress}
      />
    </Paper>
  );
};

const InputBox = ({ prepopulate }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [urlInput, setUrlInput] = useState("");
  const handleUrlInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = ev.target.value.trim();
    setUrlInput(formatted);
  };

  const [showMint, setShowMint] = useState(false);

  const [isSnapshotting, setIsSnapshotting] = useState(false);
  const [snapshotURI, setSnapshotURI] = useState<string | null>(null);

  const triggerSnapshot = () => {
    setShowMint(true);
    setIsSnapshotting(true);

    fetch("/api/snapshot", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        const snapshotImage = data.snapshot;
        setSnapshotURI(snapshotImage);
        setIsSnapshotting(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsSnapshotting(false);
      });
  };

  const onKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      triggerSnapshot();
      ev.stopPropagation();
      ev.preventDefault();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        pt: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          px: {
            md: "50px !important",
            xs: 4,
          },
        }}
      >
        <Grid container justifyContent="center">
          <CustomizedInputBase
            value={urlInput}
            onChange={handleUrlInputChange}
            onKeyPress={onKeyPress}
            placeholder={"nytimes.com"}
          />
          <LoadingButton
            disabled={!urlInput}
            loading={isSnapshotting}
            variant="contained"
            onClick={triggerSnapshot}
            sx={{
              marginLeft: "1.1rem",
              borderRadius: 0,
              width: "200px",
              fontSize: "30px",
              fontWeight: "500",
              color: "#101012",
              backgroundColor: "#28ED9E",
              "&:hover": {
                outline: "1px solid black",
                backgroundColor: "#28ED9E",
              },
            }}
          >
            Start
            {/* <FilterTiltShiftIcon style={{ fontSize: '0' }} /> */}
          </LoadingButton>
        </Grid>
        <Box
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Typography
            style={{ fontSize: "22px", color: "#101012", marginTop: "20px" }}
            color="textSecondary"
            variant="body1"
            sx={{
              fontFamily: "Cardo",
              fontSize: "1.3rem",
              opacity: !urlInput ? 1 : 0,
            }}
          >
            (Enter the URL of the website to capture)
          </Typography>
        </Box>
      </Container>
      {showMint && (
        <Mint
          urlInput={urlInput}
          isSnapshotting={isSnapshotting}
          snapshotURI={snapshotURI}
        />
      )}
    </Box>
  );
};

export default InputBox;
