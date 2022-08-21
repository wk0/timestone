import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useTokenURI } from "../../hooks/useContract";
import { BigNumber } from "ethers";
import { useEffect } from "react";
import MainLayout from '../../layouts/MainLayout';

interface NFTProps {
  tokenId: BigNumber;
}

const NFT = ({ tokenId }: NFTProps) => {

  const { tokenURI, gatewayURL } = useTokenURI(tokenId);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (gatewayURL) {
      fetch(gatewayURL)
        .then((res) => res.json())
        .then((data) => {
          const { name, description, image } = data;
          setName(name);
          setDescription(description);
          let _gatewayImage = image.replace(
            "ipfs://",
            "https://nftstorage.link/ipfs/"
          );
          console.log("image", image);
          console.log("_gatewayImage", _gatewayImage);
          setImage(_gatewayImage);
        });
    }
  }, [gatewayURL]);

  return (
    <div style={{ fontFamily: 'Courier Prime', fontSize: '13px' }}>
      <p><b>Name:</b> {name}</p>
      <p><b>Description:</b> {description}</p>
      <p><b>Gateway URL:</b> {gatewayURL}</p>
      <img src={image} style={{ border: '1px solid black', width: '100%' }}/>
    </div>
  );
};

function TimestoneItem() {

  const router = useRouter();
  const { query } = useRouter();

  const tokenIdStr = query.id as string;

  let tokenId = null;
  try {
    tokenId = BigNumber.from(tokenIdStr);
  } catch (e) {
    console.log(e);
  }
  // const { tokenURI, gatewayURL } = useTokenURI(BigNumber.from(tokenId));
  // const { data, error } = useSWR(
  //   () => query.id && `/api/item/${query.id}`,
  //   fetcher
  // );

  // if (error) return <div>{error.message}</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        pb: 0,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "1.5rem",
          px: {
            md: "125px !important",
            xs: 4,
          },
        }}
        style={{ paddingBottom: "80px" }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: '40px' }}>
            Timestone #{query.id}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'left', mt: 3 }}>
          {tokenId && <NFT tokenId={tokenId} />}
        </Box>
      </Container>
    </Box>
  );
}

TimestoneItem.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default TimestoneItem;
