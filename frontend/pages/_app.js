import React from 'react';
import { NotificationProvider } from 'web3uikit';
import { ContextProvider } from '../context/contextProvider';
import { NextSeo } from "next-seo";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '../styles/globals.css';
import { Navbar, Footer } from '../components';

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      heading: 'Inter',
      colors: {
        brand: {
          blue: "#3198FE",
          cyan: "#00FFF0",
          black: "#101010"
        },
      },
    },
  });

  return (
    <div>
    <NextSeo
      title="DFunds | A Decenterized fund raiser app"
      description="Raiser funds, create and mint nfts, and also play a game to win an nfts with Dfunds"
      defaultTitle="DFunds | A Decenterized fund raiser app"
      canonical="https://vault3.live"
      openGraph={{
        url: "http://localhost300",
        title: "DFunds | A Decenterized fund raiser app",
        description:
          "Raiser funds, create and mint nfts, and also play a game to win an nfts with Dfunds",
        images: [
            {
              url: "/assets/embed.png",
              width: 1280,
              height: 720,
              alt: "DFunds | A Decenterized fund raiser app",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "web3, funds, decentralized, hackathon, data, nfts, game, cloud, moralis, metamask, files, chainIDE, blockchain, on-chain funds, on-chain fundraiser, on-chain, chain, conflux",
          },
        ]}
    />
    <ChakraProvider theme={theme}>
      <NotificationProvider>
        <ContextProvider>
          <Navbar />
          <br />
          <br />
          <br />
          <Component {...pageProps} />
          <Footer />
        </ContextProvider>
      </NotificationProvider>
    </ChakraProvider>
    </div>)
}

export default MyApp