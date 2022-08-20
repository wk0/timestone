import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation, matchPath } from 'react-router-dom';
import { ConnectButton } from '../ConnectButton';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

// Top level Pages (Navigation)
const navigationSections = [
  {
    title: 'Explore',
    path: '/explore',
  },
  {
    title: 'Mint',
    path: '/mint',
  }
];

function MainNavbar() {

  // Navigation hook
  const navigate = useNavigate();

  // Router Location
  const routerLocation = useLocation();
  const isPartialMatch = (_p:any) => {
    // Check if route is a partial match on path
    return (_p) ? !!matchPath({
      path: _p
    }, routerLocation.pathname) : false;
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      elevation={0}
    >
      <Toolbar sx={{ minHeight: 48, padding: '1rem' }} >
        <RouterLink to="/">
          {/* {!isMobile ? (
            <img
              alt="timestone_logo"
              src="/logo/text_logo.png"
              style={{
                height: '18px',
                marginLeft: '0.2rem',
                marginTop: '3px'
              }}
            />
          ) : (
            <img
              alt="logo"
              src="/logo/icon_logo.png"
              style={{
                height: '30px',
                marginLeft: '0.4rem',
                marginTop: '7px'
              }}
            />
          )} */}
          <Typography variant="h2">TIMESTONE LOGO</Typography>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        {navigationSections && navigationSections.map((navigationSection) => (
          <Box key={navigationSection.title}>
            {!isMobile && (
              <Box style={{ paddingRight: '2.3rem' }}>
                <RouterLink to={navigationSection.path} className="navigation-link">
                  <Typography
                    variant="h5"
                    sx={{
                      textDecoration: 'none',
                      textTransform: 'none',
                      color: '#000',
                      '&:hover': {
                        color: 'grey'
                      },
                      ...(isPartialMatch(navigationSection.path) && {
                        color: 'white',
                        paddingBottom: '4px',
                        borderBottom: '1px solid grey',
                      })
                    }}
                    style={{
                      fontSize: '1rem',
                      transition: 'all 0.1s ease-in-out'
                    }}
                  >
                    {navigationSection.title}
                  </Typography>
                </RouterLink>
              </Box>
            )}
          </Box>
        ))}
        <Box>
          <ConnectButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainNavbar;
