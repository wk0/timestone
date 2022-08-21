import { Box, Container, Typography, Grid, useTheme, useMediaQuery, Paper, InputBase } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import Mint from '../Mint';

// Custom themed from Material-Ui InputBase component 
const CustomizedInputBase = (props: any) => {

  const { placeholder, value, onChange, onKeyPress } = props;

  return (
    <Paper
      component="form"
      sx={{ p: '0px 16px', display: 'flex', alignItems: 'center', width: 500, height: 75, borderRadius: 0, fontSize: '30px!important' }}
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

const InputBox = ({ prepopulate }: any) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [urlInput, setUrlInput] = useState("");
  const handleUrlInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = ev.target.value.trim();
    setUrlInput(formatted);
  };

  const [showMint, setShowMint] = useState(false);

  const [isSnapshotting, setIsSnapshotting] = useState(false);
  const triggerSnapshot = () => {
    setShowMint(true);
    setIsSnapshotting(true);
    setTimeout(() => {
      setIsSnapshotting(false);
    }, 2000);
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
        backgroundColor: 'background.paper',
        pt: 2
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
        <Grid container justifyContent="center">
          <CustomizedInputBase value={urlInput} onChange={handleUrlInputChange} onKeyPress={onKeyPress} placeholder={"nytimes.com"} />
          <LoadingButton
            disabled={!urlInput}
            loading={isSnapshotting}
            variant="text"
            onClick={triggerSnapshot}
            style={{ marginLeft: '1.1rem', borderRadius: 0, paddingLeft: '8px', paddingRight: '8px', width: '75px' }}
          >
            <FilterTiltShiftIcon style={{ fontSize: '38px' }} />
          </LoadingButton>
        </Grid>
      </Container>
      {showMint && (
        <Mint urlInput={urlInput} isSnapshotting={isSnapshotting} />
      )}
    </Box>
  );
};

export default InputBox;