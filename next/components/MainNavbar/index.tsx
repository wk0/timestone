import { useRef, useState, useEffect } from "react";
import { ConnectButton } from "../ConnectButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectKitButton } from "connectkit";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Top level Pages (Navigation)
const navigationSections = [
  {
    title: "Explore",
    path: "/explore",
  },
  {
    title: "Mint",
    path: "/mint",
  },
];

function MainNavbar() {
  // Navigation hook
  // const navigate = useNavigate();
  const router = useRouter();

  // Router Location
  const routerPath = router.pathname;
  const isPartialMatch = (_p: any) => {
    // Check if route is a partial match on path
    console.log("_p", _p);
    console.log("routerPath", routerPath);

    const trimmedRoute = _p.split("/")[1];
    console.log("trimmedRoute", trimmedRoute);
    if (routerPath.includes(trimmedRoute)) {
      console.log(true);
      return true;
    }
    console.log(false);
    return false;
    // return _p
    //   ? !!matchPath(
    //       {
    //         path: _p,
    //       },
    //       routerPath
    //     )
    //   : false;
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar elevation={0} style={{ border: '0' }}>
      <Toolbar sx={{ minHeight: 48, padding: "1rem" }}>
        {/* <Link href="/"> */}
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
          
          {/* <Typography variant="h2" sx={{ color: 'black', fontSize: '24px', fontFamily: 'Bebas Neue' }}>TIMESTONE</Typography> */}

        {/* </Link> */}
        {/* <Typography sx={{ ml: 4 }}>
          Made with ❤️ at ETHMexico (🇲🇽)
        </Typography> */}
        <Box sx={{ flexGrow: 1 }} />
        {navigationSections &&
          navigationSections.map((navigationSection) => (
            <Box key={navigationSection.title}>
              {!isMobile && (
                <Box style={{ paddingRight: "2.3rem" }}>
                  <Link
                    href={navigationSection.path}
                    className="navigation-link"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        textDecoration: "none",
                        textTransform: "none",
                        color: "#000",
                        "&:hover": {
                          color: "grey",
                        },
                        ...(isPartialMatch(navigationSection.path) && {
                          color: "white",
                          paddingBottom: "4px",
                          borderBottom: "1px solid grey",
                        }),
                      }}
                      style={{
                        fontSize: "1.1rem",
                        transition: "all 0.1s ease-in-out",
                      }}
                    >
                      {navigationSection.title}
                    </Typography>
                  </Link>
                </Box>
              )}
            </Box>
          ))}
        <Box>
          <ConnectKitButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainNavbar;
