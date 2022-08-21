import {
  Box,
  Container,
  Stepper,
  Typography,
  Dialog,
  Step,
  CircularProgress,
  StepLabel,
  Button,
  Autocomplete,
  TextField,
  Stack,
  Grid,
} from "@mui/material";
import { useState, useCallback, useEffect, useRef, createRef } from "react";
import { useAccount } from "wagmi";
import Cropper from "react-easy-crop";
import LegacyRef from "react-easy-crop";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CheckIcon from "@mui/icons-material/Check";
import getCroppedImg from "./CropImage";
import { ConnectKitButton } from "connectkit";
import { useMint } from "../../hooks/useContract";
import { useRouter } from "next/router";

const steps = [
  {
    label: "Capture Screenshot",
  },
  {
    label: "Connect Wallet",
  },
  {
    label: "Mint as NFT",
  },
];

const prepopulatedTags = [
  {
    tag: "twitter",
  },
  {
    tag: "headlines",
  },
  {
    tag: "memes",
  },
  {
    tag: "cringe",
  },
  {
    tag: "looksrare",
  },
];

function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

interface MintProps {
  urlInput: string;
  isSnapshotting: boolean;
  snapshotURI: string | null;
}

interface Snapshot {
  full_image_url: string;
  capture_time: number;
  capture_url: string;
}

const Mint = ({ urlInput, isSnapshotting, snapshotURI }: MintProps) => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const router = useRouter();

  const [cid, setCid] = useState<string | null>(null);
  const [triggeredMint, setTriggeredMint] = useState(false);

  const { write, tokenId } = useMint(address, cid);

  useEffect(() => {
    if (cid && address && !triggeredMint && write) {
      write();
      setTriggeredMint(true);
    }
  }, [cid, write, address, triggeredMint]);

  useEffect(() => {
    if (tokenId) {
      console.log("minted tokenId", tokenId);
      console.log("tokenId", tokenId.toString());
      router.push(`/timestone/${tokenId.toString()}`);
    }
  }, [tokenId]);

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === 0) {
      // Crop Image
      cropImage();

      // Advance Step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
      // Open Mint Status Dialog
      setDialogOpen(true);

      // Trigger Mint
      triggerMint();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // Handle Minting of NFT
  const triggerMint = () => {
    const formData = new FormData();

    console.log("croppedImgData", croppedImgData);
    const blob = dataURItoBlob(croppedImgData);

    formData.append("file", blob, "crop.png");
    formData.append("name", "Test Name");
    formData.append("description", "Test Description");

    // Trigger Contract Interaction
    fetch("/api/lock_in", {
      method: "POST", // or 'PUT'
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        const _cid = data.metadata.ipnft as string;
        setCid(_cid);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (stepId: number) => {
    switch (stepId) {
      case 0:
        return (
          <>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={3}
            >
              <Grid item sx={{ width: "1050px" }}>
                <Box
                  style={{ paddingLeft: "0", paddingRight: "0" }}
                  sx={{ paddingRight: 0, width: "100%", mt: 4, px: 36 }}
                >
                  {snapshot && (
                    <Box
                      style={{
                        outline: "1px solid #010101",
                        position: "relative",
                        width: "100%",
                        paddingTop: "56.25%",
                        opacity: isLoaded ? 1 : 0.4,
                      }}
                    >
                      <Cropper
                        //@ts-ignore
                        ref={divRef}
                        image={snapshot.full_image_url}
                        crop={crop}
                        zoom={zoom}
                        objectFit="horizontal-cover"
                        zoomWithScroll
                        aspect={1.7778}
                        onCropChange={setCrop}
                        maxZoom={2}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onMediaLoaded={onMediaLoaded}
                        crossOrigin="anonymous"
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item sx={{ minWidth: 600 }}>
                <Box style={{ width: "1020px" }}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={prepopulatedTags}
                    getOptionLabel={(tagData: any) => tagData.tag}
                    defaultValue={[{ tag: "twitter" }]}
                    filterSelectedOptions
                    renderInput={(params: any) => (
                      <TextField {...params} placeholder="Add Tags" />
                    )}
                  />
                  {/* <Autocomplete
                    multiple
                    id="tags-standard"
                    options={prepopulatedTags}
                    getOptionLabel={(tagData: any) => tagData.tag}
                    defaultValue={[{ tag: "twitter" }]}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder=" Add Tag"
                      />
                    )}
                  /> */}
                </Box>
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 3, mb: 6 }}
            >
              <Grid
                item
                sx={{ width: "100%", textAlign: "center", px: 36, my: 4 }}
              >
                <Typography sx={{ fontSize: "22px" }}>
                  Add this snapshot to your digital wallet collection.
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <ConnectKitButton />
                  </Box>
                  {address ? (
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          mt: 1,
                        }}
                      >
                        <CheckIcon
                          sx={{ fontSize: "14px", mr: "3px", color: "#4BB543" }}
                        />
                        Successfully connected!
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          mt: 1,
                        }}
                      >
                        <VerifiedUserIcon
                          sx={{ fontSize: "14px", mr: "3px", opacity: 0.78 }}
                        />
                        Secure Connection
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ my: 2 }}
            >
              <Grid
                item
                sx={{ width: "100%", textAlign: "center", px: 36, my: 3 }}
              >
                {/* <div
                  style={{
                    width: '100%',
                    paddingTop: '50%',
                    backgroundImage: `url('${snapshot?.full_image_url}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: `center -${cropStepOffsets?.pre}px`,
                  }}
                /> */}
                <img
                  src={croppedImgData || ""}
                  alt="preview"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item></Grid>
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  // Tracks current state of Crop Window
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  // Tracks current state of Crop Zoom
  const [zoom, setZoom] = useState(1);

  // Loading Indicator Status (standalone)
  const [isLoaded, setIsLoaded] = useState(false);

  // Crop Flow - State
  const [loadingState, setLoadingState] = useState([false, false, false]);

  const divRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 1,
    height: 2,
  });

  const [cropStepOffsets, setCropStepOffsets] = useState(null);

  // OnLoad Event
  const onMediaLoaded = (mediaSize: any) => {
    const zeroY = mediaSize.height / 2 + (mediaSize.width * 0.5625) / 2;
    console.log("ZEROY", mediaSize);
    setCrop({ x: 0, y: mediaSize.height / 2 });
    const { current } = divRef;
    console.log(current);
    const currentThing = current as any;
    //@ts-ignore
    setDimensions({
      width: currentThing?.containerRect?.width,
      height: currentThing?.containerRect?.height,
    });
    //@ts-ignore
    setImageDimensions({
      width: currentThing?.mediaSize?.width,
      height: currentThing?.mediaSize?.height,
      //actualWidth: currentThing?.mediaSize?.naturalWidth,
      //actualHeight: currentThing?.mediaSize?.naturalHeight,
    });
    setIsLoaded(true);
  };

  // Snapshot Object
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  // Cropped Image
  const [croppedImage, setCroppedImage] = useState(null);

  // On Crop Complete
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [croppedImgData, setCroppedImgData] = useState<any | null>(null);
  const cropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        snapshot?.full_image_url,
        croppedAreaPixels
      );
      setCroppedImgData(croppedImage as any);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  useEffect(() => {
    console.log(croppedImgData);
  }, [croppedImgData]);

  const onCropComplete = useCallback(
    (croppedArea: any, _croppedAreaPixels: any) => {
      setCroppedAreaPixels(_croppedAreaPixels);
    },
    []
  );

  useEffect(() => {
    // TODO: Combine this with InputBox to track all state (including snapshot button) together
    console.log("snapshotURI", snapshotURI);
    if (snapshotURI) {
      const snapshot = {
        full_image_url: snapshotURI,
        capture_time: Date.now(),
        capture_url: urlInput as string,
      };
      setSnapshot(snapshot as Snapshot);
    } else {
      const demoSnapshot = {
        full_image_url: "/renders-min.png",
        capture_time: Date.now(),
        capture_url: urlInput as string,
      };
      setSnapshot(demoSnapshot as Snapshot);
    }
  }, [snapshotURI, urlInput]);

  if (!urlInput && !isSnapshotting) {
    return null;
  }

  return (
    <>
      <div>
        <Box
          sx={{
            backgroundColor: "background.paper",
            pt: 4,
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              px: {
                md: "150px !important",
                xs: 4,
              },
            }}
          >
            {isSnapshotting ? (
              <Box sx={{ justifyContent: "center", minHeight: 500 }}>
                <Typography variant="subtitle1">
                  Capturing snapshot...
                </Typography>
              </Box>
            ) : (
              <Box sx={{ width: "100%" }}>
                <Box sx={{ mx: 12 }}>
                  <Stepper activeStep={activeStep} sx={{ mx: 24 }}>
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel optional={index === 2 ? <></> : null}>
                          {step.label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ width: "100%" }}>{getStepContent(activeStep)}</Box>
                  <Box sx={{ mb: 1, mt: 3, ml: 2, textAlign: "center" }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={activeStep === 1 && !address}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {activeStep === steps.length - 1
                          ? "Mint as NFT"
                          : "Continue"}
                      </Button>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </Box>
              </Box>
            )}
          </Container>
        </Box>
      </div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <Stack
          spacing={4}
          sx={{ width: "100%", my: 8 }}
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <img
              src="/timestone_icon.png"
              alt="timestone icon"
              style={{ maxHeight: "64px" }}
            />
          </Box>
          <Box>
            <CircularProgress />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontSize: "20px" }}>
              Your Timestone is minting...
            </Typography>
          </Box>
        </Stack>
      </Dialog>
    </>
  );
};

export default Mint;
