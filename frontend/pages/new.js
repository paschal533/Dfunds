import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/contextProvider';
import { Input, Button, BeatLoader } from '@chakra-ui/react';
const { Conflux } = require("js-conflux-sdk");

const NewFundraiser = () => {
  const { currentAccount, Contract, handleNewFundraiser } = useContext(Context);
  const [ name, setFundraiserName ] = useState(null);
  const [ website, setFundraiserWebsite ] = useState(null);
  const [ description, setFundraiserDescription ] = useState(null);
  const [ image, setImage ] = useState(null);
  const [ address, setAddress ] = useState(null);
   
  const Validate = () => {
    if(name != null && website != null && description != null && image != null && address != null) {
      return false
    }else {
      return true
    }
  };

  /*useEffect(() => {
    async function call() {
      const cfx = await Conflux.create({ url: "https://test.confluxrpc.com", logger: console })
      const me = cfx.wallet.addPrivateKey("0xf507bf529f870fff107fee93220a7f0516d90914c3510d53ac08e8b723c64f0a");
      return await Contract?.test(3).sendTransaction({ from: me.address }).confirmed()
    }
    const res = call()
    console.log(res)
    
  })*/

  const handleSubmit = async () => {
    try { 
      const imageURL = image
      const url = website
      const beneficiary = address
      const cfx = await Conflux.create({ url: "https://test.confluxrpc.com", networkId: 1, logger: console })
      const me = cfx.wallet.addPrivateKey("0x9d2c1dc41f209792f8af782f1afcaa2bfc54dd2d67a40722143cd5b36224ffab");
      console.log('starting')

      let data = {
        name,
        url,
        imageURL,
        description,
        beneficiary
      }
 
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, ',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        console.log('Response received')
        if (res.status === 200) {
          console.log('Response succeeded!')
        }
      })

      /*const transaction = await Contract.createFundraiser(
        name,
        url,
        imageURL,
        description,
        beneficiary
      ).sendTransaction({from: me.address }).executed();
      console.log(transaction)
      const res = await Contract.fundraisers(10, 0).call();
      console.log(res)*/
      handleNewFundraiser();
      setAddress('');
      setFundraiserDescription('');
      setFundraiserWebsite('');
      setFundraiserName('');
      setImage('');
    } catch (error) {
      console.log(error)
      alert(error)
      /*setAddress('');
      setFundraiserDescription('');
      setFundraiserWebsite('');
      setFundraiserName('');
      setImage('');*/
    }
  }

  return (
    <div className="text-white">
      <div className="flex min-h-[85vh] md:min-h-[90vh] flex-col items-center justify-center">
        <div className="mb-6">
          <h1 className="text-lg font-semibold">New Fundraiser</h1>
        </div>
        <div className="md:w-[50%] w-[80%] space-y-4"> 
          <Input
            placeholder="Fundraiser Name"
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            onChange={(e) => setFundraiserName(e.target.value)}
            value={name}
            type="text"
            validation={{
              required: true
            }}
          />
          <br />
          <Input
            placeholder="Fundraiser Website"
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            value={website}
            onChange={(e) => setFundraiserWebsite(e.target.value)}
            type="text"
            validation={{
              required: true
            }}
          />
          <br />
          <Input
            placeholder="Fundraiser Image"
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            validation={{
              required: true
            }}
          />
          <br />
          <Input
            placeholder="Conflux Address"
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            validation={{
              required: true
            }}
          />
          <br />
          <Input
            placeholder="Description"
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            value={description}
            onChange={(e) => setFundraiserDescription(e.target.value)}
            type="text"
            validation={{
              required: true
            }}
          />
          <br />
          {currentAccount ? <Button
            isLoading={Validate()}
            spinner={"submit"}
            id="test-button-primary"
            colorScheme='teal' 
            size='md'
            onClick={handleSubmit}
            >Submit </Button> : 
          <Button
            isLoading={true}
            spinner={"submit"}
            id="test-button-primary"
            colorScheme='teal' 
            size='md'
            onClick={handleSubmit}
            >Submit</Button>}
        </div>
      </div>
    </div>
  )
}

export default NewFundraiser;