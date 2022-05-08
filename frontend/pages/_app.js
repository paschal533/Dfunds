import { MoralisProvider } from 'react-moralis';
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
    <>
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
      <MoralisProvider
        appId="5lP5MT7DSxe6Zvy6iIZ0zAintIg8nhEnhQNNQLBZ"
        serverUrl="https://ld8khqzzr6yl.usemoralis.com:2053/server"
      >
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
        </MoralisProvider>
    </ChakraProvider>
    </>)
}

export default MyApp
