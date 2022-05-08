import { Button, FormControl, Spinner, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
const { Conflux, Drip } = require('js-conflux-sdk');
import CustomContainer from "./CustomContainer";

export default function Send({ user }) {
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState('');
  const [sending, setSending] = useState(false);

  const conflux = new Conflux({
    url: "https://test.confluxrpc.com",
    networkId: 1
  });

  const handleChange = (value) => setAmount(value);
  
  const toast = useToast()
  
  const sendCFX = async (e) => {
    e.preventDefault()
    setSending(true)
    try { 
      const account = conflux.wallet.addPrivateKey("0xf507bf529f870fff107fee93220a7f0516d90914c3510d53ac08e8b723c64f0a");
      const hash = await conflux.cfx.sendTransaction({
        from: account.address,
        to: receiver,
        value: Drip.fromCFX(amount),
        gas: 2000000
      });
      toast({
        position: "top-left",
        title: 'CFX successfully sent.',
        description: 'Fresh CFX are showing up into the wallet.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      setReceiver('')
      setSending(false)
      console.log(hash)
    } catch (error) {
      console.log(error)
      setReceiver('')
      setSending(false)
    }
  }

  return (
    <CustomContainer>
      {sending ?
        <div className="flex h-[250px] flex-col items-center justify-center py-2"> 
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div> :
      <>
      <Text fontSize="xl" fontWeight="bold">Send CFX</Text>
      <form onSubmit={(e) => sendCFX(e)}>
        <FormControl mt="4">
          <FormLabel htmlFor="amount">
            Amount of CFX
          </FormLabel>
          <NumberInput step={0.1} onChange={handleChange}>
            <NumberInputField id="amount" value={amount} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel htmlFor="receiver">Send to</FormLabel>
          <Input onChange={e => setReceiver(e.target.value)} id="receiver" value={receiver} type="text" placeholder="Receiver Address" />
        </FormControl>
        <Button type="submit" mt="4" colorScheme="purple">Send</Button>
      </form>
      </>}
    </CustomContainer>
  )
}