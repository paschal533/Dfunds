import React, { useEffect, useState, useContext } from 'react';
import { Spinner, Button, useToast } from '@chakra-ui/react';
import { NFTTile} from '../components';
import { Context } from '../context/contextProvider';
import { useWeb3 } from '@3rdweb/hooks';
//import { useRouter } from 'next/router';
//import Footer from './Components/Footer';
import Link from 'next/link';
import Head from 'next/head';

export default function Profile() {
  const { currentAccount } = useContext(Context);
  const [loading, setLoading] = useState(true);
  {/*const [nfts, setNFTs] = useState([]);
  const toast = useToast();
  useEffect(() => {
    getMyNFT(currentAccount);
  }, [, currentAccount]);

  const getMyNFT = async (currentAccount) => {
    if (currentAccount === undefined || currentAccount === null) {
      toast({
        title: 'Connect wallet',
        description: 'Connect wallet and switch to Rinkeby network',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
      setLoading(false);
      return;
    }
    const listing = await fetch(`/api/user/${currentAccount}`, {
      method: 'GET',
    });
    const data = await listing.json();
    if (data.error === true) {
      toast({
        title: 'Error',
        description: 'Error occured while fetching NFT',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
      setLoading(false);
      return;
    }
    setNFTs(data);
    setLoading(false);
  };*/}

  return (
    <div className="w-full">
      <Head>
        <title>My NFT Collection</title>
      </Head>
        <div className=" flex flex-col w-full min-h-screen  mt-28 sm:mt-0">
          <div className="w-full p-5 space-y-3 -translate-y-28 sm:-translate-y-0">
              <div className="w-full flex flex-col items-center justify-between mt-12">
                <p className="text-white text-3xl text-center w-full mb-10">
                  No NFT's found in your wallet
                </p>
                <Link passHref href="/wrong_side">
                  <Button
                    as="a"
                    backgroundColor="#3198FE"
                    border="1px solid #915bff"
                    _hover={{
                      backgroundColor: '#000',
                      border: '1px solid #915bff',
                      color: 'white',
                    }}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    w={{ base: 'full', sm: 'auto' }}
                    mb={{ base: 2, sm: 0 }}
                    size="lg"
                    cursor="pointer"
                  >
                    Play game using default NFT
                  </Button>
                </Link>
              </div>
          </div>
        </div>
    </div>
  );
}
