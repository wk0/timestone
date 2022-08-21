import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useTokenURI } from "../../hooks/useContract";
import { BigNumber } from "ethers";
import { useEffect } from "react";

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
    <div>
      <p>Name: {name}</p>
      <p>Description: {description}</p>
      <p>gatewayURL: {gatewayURL}</p>
      <img src={image} />
    </div>
  );
};

export default function TimestoneItem() {
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
    <div>
      <Head>
        <title>Timestone</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Box>
            Timestone {query.id} Page
            {tokenId && <NFT tokenId={tokenId} />}
          </Box>
        </div>
      </main>
    </div>
  );
}
