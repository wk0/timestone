import { ReactNode } from 'react';
import { Box } from '@mui/material';
import MainNavbar from '../../components/MainNavbar';

interface MainLayoutProps {
  children?: ReactNode;
}

function MainLayout({ children }:MainLayoutProps) {
  return (
    <>
      <MainNavbar />
      <Box
        sx={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Box flexGrow={1}>{children}</Box>
        </Box>
      </Box>
    </>
  );
}
export default MainLayout;
