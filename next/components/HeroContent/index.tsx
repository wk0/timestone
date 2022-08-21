import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import "./rotation.module.css";
import { useEffect, useState } from "react";

const HeroContent = (props: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        pt: 4,
      }}
      {...props}
    >
      <Container
        maxWidth="lg"
        sx={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          px: {
            md: "130px !important",
            xs: 4,
          },
        }}
      >
        <Grid container>

        <Box style={{ paddingTop: "1.3rem", paddingBottom: "3rem" }}>
          <Grid container>
            {/* {!isMobile && (
              <Box style={{ marginRight: '2.2rem', marginTop: '-7px', marginBottom: '1rem' }} sx={{ display: { xs: 'none', md: 'block' } }}>
                <img src="/placeholder_icon.svg" alt="timestone-logo" style={{ width: '96px', height: '96px', animation: 'rotation 60s infinite linear' }} />
              </Box>
            )} */}
            <Box display="flex" sx={{ textAlign: "left" }}>
              <svg style={{ width: '450px', marginRight: '20px', marginRight: '20px', marginTop: '67px', marginBottom: '0px' }} width="288" height="288" viewBox="0 0 288 288" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="logo">
                <g id="circle" filter="url(#filter0_d_41_1611)">
                <circle cx="144" cy="141" r="128" fill="white"/>
                <circle cx="144" cy="141" r="102.5" stroke="#28ED9E" strokeWidth="51"/>
                </g>
                <g id="time-logo">
                <path id="Vector" d="M196.748 211.603C198.647 203.462 194.848 196.949 186.979 192.336V158.688C189.964 156.788 192.134 152.446 192.134 147.019C192.134 141.863 189.964 137.25 186.979 135.351V96.5463C192.406 93.5613 195.662 90.0337 196.476 85.9633C197.29 81.6215 195.391 77.2798 191.049 73.2094C191.32 72.6667 191.32 71.8526 191.32 71.3099C191.32 65.8827 186.979 61.541 181.551 61.541C178.838 61.541 176.396 62.6264 174.496 64.5259C169.612 62.8978 163.642 61.541 157.672 60.9982C157.943 59.9128 157.672 58.556 156.858 57.7419C154.144 55.2997 151.702 55.8424 151.702 55.8424C151.702 55.8424 155.23 52.0434 151.973 50.958C156.586 48.5157 159.843 43.9026 159.843 39.0182C159.843 31.1487 151.973 24.9075 144.104 24.9075C136.234 24.9075 129.993 31.1487 129.993 39.0182C129.993 43.9026 132.435 48.2444 136.234 50.6866C134.878 51.2293 133.521 53.9429 135.963 55.8424C135.963 55.8424 132.164 57.4706 131.893 61.2696C125.923 61.8123 120.224 62.6264 115.068 63.7118C112.898 61.2696 109.641 59.6415 105.842 59.6415C99.3296 59.6415 93.9024 64.5259 93.9024 70.4958C93.9024 71.3099 93.9024 72.124 94.1738 72.6667C91.1888 75.3803 89.5607 78.3652 90.1034 81.6216C90.3748 84.3351 92.2743 87.0487 95.5306 89.7623V138.336C93.0884 140.507 91.4602 144.577 91.4602 148.919C91.4602 153.532 93.0884 157.331 95.5306 159.502V197.763C91.7316 201.562 89.5607 206.175 90.1034 211.331C90.3748 215.13 92.2743 218.929 95.2592 222.457C94.9879 223.271 94.9879 223.814 94.9879 224.628C94.9879 229.512 98.7869 233.311 103.671 233.311C105.3 233.311 106.928 232.769 108.284 231.955C115.883 235.482 125.109 237.924 135.963 238.739C135.963 239.281 135.692 239.824 135.692 240.367C135.692 245.251 139.491 249.05 144.375 249.05C149.26 249.05 153.059 245.251 153.059 240.367C153.059 239.824 153.059 239.01 152.787 238.467C164.727 237.382 174.767 233.854 182.366 229.241C183.994 230.598 185.893 231.683 188.335 231.683C193.22 231.683 197.019 227.884 197.019 223C197.019 220.829 196.205 218.658 194.577 217.03C195.391 215.402 196.205 213.502 196.748 211.603ZM135.692 38.7468C135.692 34.1337 139.491 30.0633 144.375 30.0633C149.26 30.0633 153.873 33.8623 153.873 38.7468C153.873 43.6313 148.988 47.4303 144.375 47.4303C139.491 47.4303 135.692 43.6313 135.692 38.7468ZM104.214 138.336V125.853C116.697 139.964 140.848 147.29 124.295 159.773C113.712 167.914 107.47 178.225 104.214 187.452V159.502C106.656 157.331 108.284 153.26 108.284 148.919C108.556 144.306 106.656 140.507 104.214 138.336ZM182.637 202.376C181.823 203.733 180.737 205.09 179.381 206.447C172.597 213.502 159.029 220.829 144.104 221.1H142.747C121.31 221.1 107.742 212.417 105.571 208.075C104.485 206.175 104.485 199.12 107.199 190.708C109.913 181.753 115.883 170.899 126.737 162.487C131.35 158.959 133.521 155.431 133.521 151.361C133.521 144.848 127.008 139.964 119.682 134.537C114.254 130.466 108.013 125.853 104.485 120.426C102.586 117.441 101.229 114.185 101.229 110.657C101.229 103.602 101.772 98.4458 102.857 94.9181C103.4 95.1895 103.943 95.4609 104.485 95.7322C114.797 100.888 129.45 104.687 145.732 104.687C158.757 104.687 169.883 103.33 178.567 100.617C178.838 100.617 179.109 100.345 179.381 100.345C180.466 104.144 181.551 110.657 178.567 117.441C176.938 120.969 174.496 124.496 170.154 128.024C160.657 135.351 155.772 142.949 156.044 150.275C156.315 157.059 160.657 163.572 169.34 169.542C173.411 172.256 176.396 175.783 178.838 179.311C181.009 182.839 182.366 186.638 183.18 190.165C183.994 193.15 184.265 196.407 184.265 198.849C183.722 199.663 183.18 201.02 182.637 202.376ZM178.295 156.788V173.341C176.396 170.899 173.682 168.728 170.697 166.557C157.4 157.602 152.245 145.662 171.783 130.466C174.496 128.295 176.667 126.124 178.295 123.954V137.793C176.396 139.964 175.31 143.491 175.31 147.29C175.039 151.09 176.396 154.617 178.295 156.788Z" fill="black"/>
                <path id="Vector_2" d="M176.668 188.533C176.125 187.177 175.583 185.82 174.497 184.192C172.598 181.207 169.613 177.95 164.728 177.408C148.718 175.237 142.748 164.654 142.748 164.654C142.748 164.654 119.954 174.423 112.899 189.076C111.813 190.976 111.27 193.147 110.999 195.317C110.728 196.674 109.642 203.73 110.999 205.9C117.512 215.941 141.12 216.755 146.276 216.212C152.788 215.669 168.527 211.87 176.125 200.473C176.397 200.202 176.397 199.931 176.668 199.659C177.482 198.302 177.753 194.775 177.211 191.79C177.482 191.247 177.482 190.162 176.668 188.533Z" fill="black"/>
                <path id="Vector_3" d="M143.559 146.799C143.559 146.799 143.288 140.829 152.514 134.588C161.741 128.618 158.756 125.905 156.313 125.091C153.871 124.277 136.775 120.478 129.72 125.091C122.936 129.704 132.705 132.96 135.69 136.216C140.303 140.558 143.559 146.799 143.559 146.799Z" fill="black"/>
                </g>
                </g>
                <defs>
                <filter id="filter0_d_41_1611" x="0" y="0" width="288" height="288" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="3"/>
                <feGaussianBlur stdDeviation="8"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_41_1611"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_41_1611" result="shape"/>
                </filter>
                </defs>
              </svg>

              <Box style={{ marginLeft: '0 !important' }} sx={{ mx: 20, mt: 2 }}>
                <Typography style={{ fontSize: "180px", height: '220px', textTransform: 'uppercase',  fontFamily: 'Bebas Neue' }} 
                  align="left"
                  display="flex"
                  color="textPrimary"
                  sx={{ fontSize: "2.7rem" }}
                >
                  TimeStone
                </Typography>

                <Typography
                  align="left"
                  color="textPrimary"
                  variant="h1"
                  sx={{ fontSize: "2.7rem" }}
                >
                  Archive and Collect Web Pages on the Blockchain as NFTs.
                </Typography>
              </Box>
            </Box>
          </Grid>
            {/* <Box sx={{ textAlign: "center" }}>
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
                sx={{
                  pt: 1,
                  pb: 2,
                  fontFamily: "Cardo",
                  fontSize: "1.3rem",
                }}
              >
                Lorem ipsum dolor sit amet consectetur
              </Typography>
            </Box> */}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroContent;
