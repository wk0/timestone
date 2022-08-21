import { useEffect, useState } from 'react';
import {  useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { BigNumber} from 'ethers'
import { ethers } from 'ethers';

import Contract from "../public/TimestoneFree.json"
const contractAddress = "";

export const useTokenURI = (tokenId: BigNumber) => {
  const [tokenURI, setTokenURI] = useState<string | null>(null);
  const [gatewayURL, setGatewayURL] = useState<string | null>(null);

  useContractRead({ 
    addressOrName: contractAddress,
    contractInterface: Contract.abi,
    functionName: 'tokenURI',
    args: tokenId,
    onSuccess(data) {
      const rawURI = data.toString();  
      setTokenURI(rawURI);
      const _gatewayURL = rawURI.replace('ipfs://', 'https://nftstorage.link/ipfs/')
      setGatewayURL(_gatewayURL);
    },
  })
  return { tokenURI, gatewayURL };
}


const abiCoder = new ethers.utils.AbiCoder();

export const useMint = (mintToAddress: string, cid: string) => {
  const [mintError, setMintError ] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<BigNumber | null>(null);

  const { config, error } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: Contract.abi,
    functionName: "mintTo",
    args: [mintToAddress, cid]
    // overrides: {
    //   value: ethers.utils.parseEther('0.01'),
    // }
  })

  const { write } = useContractWrite({...config, onSettled(data, error) {
    if (error) { 
      setMintError(error.message)
    }
    if (data) {
      data.wait().then(receipt => {
        const tokenIdStr = abiCoder.decode(["uint256"], receipt.logs[0].topics[3]).toString()
        setTokenId(BigNumber.from(tokenIdStr));
      })
    }
  }})

  return { error, mintError, write, tokenId };
}