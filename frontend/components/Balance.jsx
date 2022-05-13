import { Divider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const { Conflux, Drip } = require('js-conflux-sdk');
import CustomContainer from "./CustomContainer"

export default function Balance({ user }) {
  const [balance, setBalance] = useState(0);
  const conflux = new Conflux({
    url: 'https://test.confluxrpc.com', // testnet provider
    logger: console, // for debug: this will log all the RPC request and response to console
    networkId: 1,  // note networkId is required to initiat
    // timeout: 300 * 1000, // request timeout in ms, default 300*1000 ms === 5 minute
  });


  useEffect(() => {
    const getAddressBalance = async () => {
      const address = user;
      const balance = await conflux.cfx.getBalance(address);
      //const balanceDrip = Drip(balance)
      setBalance(balanceDrip.toCFX());
    }
     getAddressBalance();
  })

  return(
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="bold">My CRC20 Tokens</Text>
      {balance && <Text>💰 {balance} <b>CFX</b></Text>}
      <Divider/>
    </CustomContainer>
  )
}