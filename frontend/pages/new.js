import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/contextProvider';
import { Input, Button } from 'web3uikit';
const { Conflux } = require("js-conflux-sdk");

const NewFundraiser = () => {
  const { currentAccount, Contract, handleNewFundraiser } = useContext(Context);
  const [ name, setFundraiserName ] = useState(null);
  const [ website, setFundraiserWebsite ] = useState(null);
  const [ description, setFundraiserDescription ] = useState(null);
  const [ image, setImage ] = useState(null);
  const [ address, setAddress ] = useState(null);

  console.log(Contract);
  console.log(currentAccount)
   
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
      const me = cfx.wallet.addPrivateKey("0xf507bf529f870fff107fee93220a7f0516d90914c3510d53ac08e8b723c64f0a");
      console.log('starting')
      const transaction = await Contract.createFundraiser(
        name,
        url,
        imageURL,
        description,
        beneficiary
      ).sendTransaction({from: me.toString() }).executed();
      console.log(transaction)
      const res = await Contract.fundraisers(10, 0).call();
      console.log(res)
      /*const transaction = await Contract.methods.createFundraiser(
        name,
        url,
        imageURL,
        description,
        beneficiary
      ).send({ from: currentAccount })
      console.log(t run ransaction)*/
      handleNewFundraiser();
      setAddress('');
      setFundraiserDescription('');
      setFundraiserWebsite('');
      setFundraiserName('');
      setImage('');
    } catch (error) {
      console.log(error)
      alert(error)
      /*handleNewFundraiser('');
      setAddress('');
      setFundraiserDescription('');
      setFundraiserWebsite('');
      setFundraiserName('');
      setImage('');
    }*/
   }
  }

  return (
    <div className="text-white">
      <div className="flex min-h-[85vh] md:min-h-[90vh] flex-col items-center justify-center">
        <div className="mb-6">
          <h1 className="text-lg font-semibold">New Fundraiser</h1>
        </div>
        <Input
          label="Name"
          name="Fundraiser Name"
          onChange={(e) => setFundraiserName(e.target.value)}
          value={name}
          type="text"
          validation={{
            required: true
          }}
        />
        <br />
        <Input
          label="Website"
          name="Fundraiser Website"
          value={website}
          onChange={(e) => setFundraiserWebsite(e.target.value)}
          type="text"
          validation={{
            required: true
          }}
        />
        <br />
        <Input
          label="Image URL"
          name="Fundraiser Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          validation={{
            required: true
          }}
        />
        <br />
        <Input
          label="Conflux Address"
          name="conflux Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          validation={{
            required: true
          }}
        />
        <br />
        <Input
          label="Description"
          name="Fundraiser Description"
          value={description}
          onChange={(e) => setFundraiserDescription(e.target.value)}
          type="text"
          validation={{
            required: true
          }}
        />
      <br />
        {!currentAccount.length > 0 ? <Button
          disabled={Validate()}
          id="test-button-primary"
          onClick={handleSubmit}
          text="Submit form"
          theme="primary"
          type="button"
        /> : 
        <Button
          disabled={true}
          id="test-button-primary"
          onClick={handleSubmit}
          text="Submit form"
          theme="primary"
          type="button"
        /> }
      </div>
    </div>
  )
}

export default NewFundraiser;