import React, {useEffect} from "react";
import Head from 'next/head';
import { Banner, CardContainer, Steps } from '../components';
const FundraiserFactory = require('../contracts/FundraiserFactory.json').abi
const { Conflux } = require('js-conflux-sdk');

const Home = () => {
  const conflux = new Conflux({
    url: "https://test.confluxrpc.com",
    networkId: 1
  });

  useEffect(() => {
    const init = async() => { 
      try {
        const addrsy = "cfxtest:achc5dhgg87xsb5yhf0ez6bkj5me3gfd1eaff19pm3";
        const contract = conflux.Contract(
          FundraiserFactory,
          addrsy
        );
        console.log(contract);
      } catch(error) {
        //alert(error)
        console.error(error);
      }
  }
  init();
  }, []);

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Banner />
        <CardContainer />
        <br />
        <Steps />
      </div>
    </div>
  )
}

export default Home
