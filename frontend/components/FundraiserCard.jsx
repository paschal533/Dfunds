import React, {useEffect, useContext, useState} from 'react';
import Link from 'next/link';
import { Context } from '../context/contextProvider';
import FundraiserContract from '../contracts/Fundraiser.json';
import Loader from "./Loader";
import { Card, Button } from 'web3uikit';
import { Conflux, Drip } from 'js-conflux-sdk';

const cc = require('cryptocompare');

const FundraiserCard = ({ fundraiser }) => {
  const cfx = new Conflux({
      url: "https://test.confluxrpc.com",
      networkId: 1
  });

  const ethAmount = (donationAmount / exchangeRate || 0).toFixed(4)

  const { modalOpen, setLoading } = useContext(Context);
  const [ contract, setContract] = useState(null)
  const [ accounts, setAccounts ] = useState(null)
  const [ fund, setFundraiser ] = useState(null)
  const [ fundName, setFundname ] = useState(null)
  const [ description, setDescription ] = useState(null)
  const [ totalDonations, setTotalDonations ] = useState(null)
  const [ imageURL, setImageURL ] = useState(null)
  const [ url, setURL ] = useState(null)
  const [ open, setOpen] = React.useState(false);
  const [ donationAmount, setDonationAmount] = useState(null)
  const [ exchangeRate, setExchangeRate ] = useState(null)
  const [ userDonations, setUserDonations ] = useState(null)
  const [ isOwner, setIsOwner ] = useState(false)
  const [ beneficiary, setNewBeneficiary ] = useState('');

  useEffect(() => {
    const init = async () => {
      if (fundraiser) {
        await getAfund(fundraiser)
        setOpen(false)
      }
    }
    init()
  }, [fundraiser]);

   // get a fundraiser details
   const getAfund = async (fund) => {
    try {
      const acct = cfx.wallet.addPrivateKey('0xf507bf529f870fff107fee93220a7f0516d90914c3510d53ac08e8b723c64f0a')
      const instance = await cfx.Contract({ abi: FundraiserContract.abi, address: fund })

      const name = await instance.name().call({ from: acct })
      const description = await instance.description().call({ from: acct })
      const totalDonations = await instance.totalDonations().call({ from: acct })
      const imageURL = await instance.imageURL().call({ from: acct })
      const url = await instance.url().call({ from: acct })

      setFundname(name)
      setDescription(description)
      setImageURL(imageURL)
      setURL(url)

      const userDonations = await instance.myDonations().call({ from: acct })
      const exchangeRate = await cc.price('CFX', ['USD'])
      setExchangeRate(exchangeRate.USD)
      const CFXToken = Drip.fromCFX(totalDonations).toString()
      const dollarDonationAmount = exchangeRate.USD * CFXToken
      setTotalDonations(dollarDonationAmount.toFixed(2).slice(0, 4))

      setUserDonations(userDonations)


      const isOwner = await instance.owner().call({ from: acct })
      console.log(isOwner)

      if (isOwner === currentAccount) {
        setIsOwner(true)
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  const cardDetails = () => {
    return (
      <>
      {!open ? 
        <div>
        <div className="text-[#030A1C] text-sm">{`${description?.slice(0, 150)}...`}</div>
        <div className="font-bold mb-2">Total Donations: ${totalDonations}</div>
        <Link className="donation-receipt-link" href={`/fundraiser/${fundraiser}`}>
          <Button
            id="test-button-primary"
            text="View more"
            theme="primary"
            type="button"
            className="p-4"
          />
        </Link>
      </div> : <Loader /> }
      </>
    )
  }

  return (
    <div>
      <div className="md:w-[250px] md:mt-0 md:mb-0 md:ml-3 mt-3 mb-3 ml-0 mr-0  w-[100%]">
        <Card
          description={cardDetails()}
          setIsSelected={function noRefCheck(){}}
          title={fundName}
          tooltipText={<span style={{width: 200}}>{description}</span>}
         >
         <div>
            <img
              src={imageURL}
              height="180px"
              alt="fundraiser"
              width="100%"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default FundraiserCard;