import { Box, Container, Typography, Stepper, Step, StepContent, StepLabel, Button, Autocomplete, TextField, Grid } from '@mui/material';
import InputBox from '../components/InputBox';
import { useState } from 'react';

const steps = [
  {
    label: 'Capture Screenshot',
  },
  {
    label: 'Mint as NFT',
  },
];

const prepopulatedTags = [
  {
    tag: 'twitter'
  },
  {
    tag: 'news'
  },
  {
    tag: 'memes'
  }
]

const Mint = () => {

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
            <Grid justifyContent="center" spacing={3}>
              <Grid item>
                <InputBox prepopulate={"nytimes.com"} />
              </Grid>
              <Grid item>
                <Box sx={{ maxWidth: 400 }}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={prepopulatedTags}
                    getOptionLabel={(tagData: any) => tagData.tag}
                    defaultValue={[{ tag: 'twitter' }]}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Multiple values"
                        placeholder="Favorites"
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
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: 12,
      }}
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
        <Box>
          <Stepper activeStep={activeStep} orientation="vertical">
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
                <StepContent>
                  <Box sx={{ width: '100%' }}>
                    {getStepContent(index)}
                  </Box>
                  <Box sx={{ mb: 1, mt: 3, ml: 2, textAlign: 'left' }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Container>
    </Box>
  );
};

export default Mint;
