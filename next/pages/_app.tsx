import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from 'react';
import ThemeProvider from "../theme/ThemeProvider";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { createClient, configureChains, defaultChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import type { NextPage } from 'next';

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import '../styles/globals.css';

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
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
      <CacheProvider value={emotionCache}>
        <ThemeProvider>
          <ConnectKitProvider
            mode="light"
            theme="minimal"
            customTheme={{
              "--ck-connectbutton-background": "#28ED9E",
              "--ck-connectbutton-color": "#000",
              "--ck-font-family": "Courier Prime"
            }}
            options={{
              embedGoogleFonts: true,
            }}
          >
            {getLayout(<Component {...pageProps} />)}
          </ConnectKitProvider>
        </ThemeProvider>
      </CacheProvider>
    </WagmiConfig>
  );
}

export default MyApp;
