import {
  Box,
  Container,
  Stepper,
  Typography,
  Step,
  CircularProgress,
  StepLabel,
  Button,
  Autocomplete,
  TextField,
  Grid,
} from "@mui/material";
import { useState, useCallback, useEffect, useRef, createRef } from 'react';
import Cropper from 'react-easy-crop';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const steps = [
  {
    label: 'Capture Screenshot',
  },
  {
    label: 'Connect Wallet',
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
    tag: "news",
  },
  {
    tag: "memes",
  },
];

interface MintProps {
  urlInput: string;
  isSnapshotting: boolean;
}

interface Snapshot {
  full_image_url: string;
  capture_time: number,
  capture_url: string;
}

const Mint = ({ urlInput, isSnapshotting }: MintProps) => {

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === 2) {
      // Open Mint Status Dialog 
      // Open Contract Interaction
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={3}>
              <Grid item sx={{ width: '100%' }}>
                <Box sx={{ paddingRight: 0, width: '100%', mt: 4, px: 36 }}>
                  {snapshot && (
                    <Box style={{ outline: '3px solid #2ECC71', position: 'relative', width: '100%', paddingTop: '56.25%', opacity: (isLoaded) ? 1 : 0.4 }}>
                      <Cropper
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
                <Box>
                  <Autocomplete
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
                  />
                </Box>
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 3, mb: 6 }}>
              <Grid item sx={{ width: '100%', textAlign: 'center', px: 36, my: 3 }}>
                <Typography sx={{ fontSize: '18px' }}>
                  Let’s help you archive this snapshot to your digital wallet collection.
                </Typography>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: 'center' }}>
                  <Button variant="contained">
                    Connect Wallet
                  </Button>
                  <Typography variant="subtitle1" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    mt: 1
                  }}>
                    <VerifiedUserIcon sx={{ fontSize: '14px', mr: '3px' }} />
                    Read-only wallet connection
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
              <Grid item sx={{ width: '100%', textAlign: 'center', px: 36, my: 3 }}>
                <div
                  style={{
                    width: '100%',
                    paddingTop: '50%',
                    backgroundImage: `url('${snapshot?.full_image_url}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: `center -${cropStepOffsets?.pre}px`,
                    outline: '3px solid #2ECC71',
                  }}
                />
              </Grid>
              <Grid item>

              </Grid>
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

  const cropRef = useRef(null);

  const divRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 });
  const [imageDimensions, setImageDimensions] = useState({ width: 1, height: 2 });

  const [cropStepOffsets, setCropStepOffsets] = useState(null);

  // OnLoad Event
  const onMediaLoaded = (mediaSize: any) => {
    const zeroY = (mediaSize.height / 2) + ((mediaSize.width * 0.5625) / 2);
    console.log("ZEROY", mediaSize);
    setCrop({ x: 0, y: (mediaSize.height / 2) });
    const { current } = divRef;
    console.log(current);
    setDimensions({ width: current?.containerRect?.width, height: current?.containerRect?.height });
    setImageDimensions({ width: current?.mediaSize?.width, height: current?.mediaSize?.height, actualWidth: current?.mediaSize?.naturalWidth, actualHeight: current?.mediaSize?.naturalHeight });
    setIsLoaded(true);
  };

  // Snapshot Object 
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  // Cropped Image 
  const [croppedImage, setCroppedImage] = useState(null);

  // On Crop Complete
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea: any, _croppedAreaPixels: any) => {
    setCroppedAreaPixels(_croppedAreaPixels);
  }, []);

  useEffect(() => {

    // TODO: Combine this with InputBox to track all state (including snapshot button) together

    // TODO: Update with call to puppeteer instance 
    const demoSnapshot = {
      full_image_url: '/renders-min.png',
      capture_time: Date.now(),
      capture_url: urlInput as string,
    };

    setSnapshot(demoSnapshot as Snapshot);

  }, []);

  if (!urlInput && !isSnapshotting) {
    return null;
  }

  return (
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
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            px: {
              md: '150px !important',
              xs: 4
            }
          }}
        >
          {isSnapshotting ? (
            <Box sx={{ justifyContent: 'center', minHeight: 500 }}>
              <Typography variant="subtitle1">Capturing snapshot...</Typography>
            </Box>
          ) : (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ mx: 12 }}>
                <Stepper activeStep={activeStep} sx={{ mx: 24 }}>
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={
                          index === 2 ? (
                            <>
                            </>
                          ) : null
                        }
                      >
                        {step.label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ width: '100%' }}>
                  {getStepContent(activeStep)}
                </Box>
                <Box sx={{ mb: 1, mt: 3, ml: 2, textAlign: 'center' }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Mint as NFT' : 'Continue'}
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
  );
};

export default Mint;