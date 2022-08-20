import type { NextPage } from "next";
import Head from "next/head";

import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Button,
  Autocomplete,
  TextField,
  Grid,
} from "@mui/material";
import { useState } from "react";

const steps = [
  {
    label: 'Capture URL',
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

const Mint: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
            <Grid container alignItems="center" justifyContent="center" spacing={3}>
              <Grid item>
                <img src="/demo_snapshot.png" alt="demo" style={{ maxHeight: '400px' }} />
              </Grid>
              <Grid item sx={{ minWidth: 600 }}>
                <Box sx={{ maxWidth: 400 }}>
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
                        label="Tags"
                        placeholder="#twitter"
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </>
        );
      default:
        return null;
    }
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
            backgroundColor: "background.paper",
            pt: 12,
          }}
        >
          <Container
            maxWidth="lg"
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
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} sx={{ mx: 12 }}>
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
                      {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
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
          </Container>
        </Box>
      </main>
    </div>
  );
};

export default Mint;