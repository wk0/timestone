import { Box, Container, Typography, Grid, useTheme, useMediaQuery, Paper, InputBase } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';

// Custom themed from Material-Ui InputBase component 
const CustomizedInputBase = (props: any) => {

  const { placeholder, value, onChange, onKeyPress } = props;

  return (
    <Paper
      component="form"
      sx={{ p: '0px 16px', display: 'flex', alignItems: 'center', width: 600, height: 75, borderRadius: '16px', fontSize: '30px!important' }}
    >
      <InputBase
        sx={{ ml: 2, flex: 1, mt: '0px' }}
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

const InputBox = (props: any) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [urlInput, setUrlInput] = useState("");
  const handleUrlInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = ev.target.value.trim();
    setUrlInput(formatted);
  };
  const onKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      // TODO: trigger snapshot
      setIsSnapshotting(true);
      ev.stopPropagation();
      ev.preventDefault();
    }
  };

  const [isSnapshotting, setIsSnapshotting] = useState(false);
  const handleSnapshotTrigger = () => {

  };

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
        <Grid container justifyContent="center">
          <CustomizedInputBase value={urlInput} onChange={handleUrlInputChange} onKeyPress={onKeyPress} placeholder={"nytimes.com"} />
          <LoadingButton
            disabled={!urlInput}
            loading={isSnapshotting}
            variant="text"
            onClick={handleSnapshotTrigger}
            style={{ marginLeft: '1.1rem', borderRadius: '16px', paddingLeft: '8px', paddingRight: '8px', width: '75px' }}
          >
            <FilterTiltShiftIcon style={{ fontSize: '38px' }} />
          </LoadingButton>
        </Grid>
      </Container>
    </Box>
  );
};

export default InputBox;