import { useEffect, useState } from 'react';
import {  useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { BigNumber} from 'ethers'
import { ethers } from 'ethers';

import Contract from "../public/Timestone.json"

const contractAddress = "0x6D6B2f5D449c3dE37F3D2E939beec47A6aF6Ae0D";

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

export const useMint = (mintToAddress: string | undefined, cid: string | null) => {
  const [mintError, setMintError ] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<BigNumber | null>(null);

  console.log(mintToAddress, cid);

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: Contract.abi,
    functionName: "mintTo",
    chainId: 80001,
    args: [mintToAddress, cid],
    overrides: {
      value: ethers.utils.parseEther('0.0001'),
    }
  })

  const { write } = useContractWrite({...config, onSettled(data, error) {
    if (error) { 
      setMintError(error.message)
    }
    if (data) {
      console.log('data', data)
      data.wait().then(receipt => {
        console.log('receipt', receipt)
        const tokenIdStr = abiCoder.decode(["uint256"], receipt.logs[1].topics[3]).toString()
        setTokenId(BigNumber.from(tokenIdStr));
      })
    }
  }})

  //console.log('prepare error', prepareError);
  //console.log('mintError', mintError);

  return { prepareError, mintError, write, tokenId };
}