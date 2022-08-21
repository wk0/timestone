import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import ThemeProvider from "../theme/ThemeProvider";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import type { NextPage } from "next";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import "../styles/globals.css";

const { chains, provider, webSocketProvider } = configureChains(
  [
    // chain.mainnet,
    // chain.foundry,
    chain.polygonMumbai,
    // chain.polygon
  ],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_KEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Timestone NFT',
  chains
});

// Set up client
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

// Setup Emotion Cache for Material-UI
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
  pageProps: any;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: '#28ED9E',
          accentColorForeground: 'white',
          borderRadius: 'none',
          fontStack: 'rounded',
          overlayBlur: 'small',
        })}
        chains={chains}
      >
        <CacheProvider value={emotionCache}>
          <ThemeProvider>
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
