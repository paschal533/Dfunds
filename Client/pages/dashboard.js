import Head from 'next/head';
import { useContext } from 'react';
import { Context } from '../context/contextProvider';
import { Box, Button, Flex, TabList, Tabs, Text, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Profile, Balance, Transactions, NFTs, Send, ConnectWallet } from '../components';

export default function Home() {
  const { currentAccount } = useContext(Context);
  
  if(!currentAccount?.length > 0){
    return( 
      <>
        <Head>
          <title>Login | Dashboard</title>
        </Head>
        <Flex 
          direction="column" 
          justifyContent="center" 
          alignItems="center" 
          width="100vw" 
          height="100vh"
          overflowX="hidden"
          bgGradient="linear(to-br, teal.400, purple.700)"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">Dashboard</Text>
          <div className="flex ml-[50vw] md:ml-[87vw] justify-center items-center w-full">
            <ConnectWallet />
          </div>
        </Flex>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Flex  bgGradient="linear(to-br, teal.400, purple.700)" direction="column" width="100vw" height="100vh" overflowX="hidden">
        <Box flex="1" px="44" py="20">
          <Tabs size="lg" colorScheme="purple" align="center" variant="enclosed">
            <TabList>
              <Tab  _selected={{ color: "white"}} fontWeight="bold">Profile</Tab>
              <Tab _selected={{ color: "white"}} fontWeight="bold">Balance</Tab>
              <Tab _selected={{ color: "white"}} fontWeight="bold">Transactions</Tab>
              <Tab _selected={{ color: "white"}} fontWeight="bold">NFTs</Tab>
              <Tab _selected={{ color: "white"}} fontWeight="bold">Send ETH</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile user={currentAccount} />
              </TabPanel>
              <TabPanel>
                <Balance user={currentAccount} />
              </TabPanel>
              <TabPanel>
                <Transactions user={currentAccount} />
              </TabPanel>
              <TabPanel>
                <NFTs user={currentAccount} />
              </TabPanel>
              <TabPanel>
                <Send user={currentAccount} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  )
}
