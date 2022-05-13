import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ConnectWallet, Loader } from '../../components';
import { Context } from '../../context/contextProvider';
import { Button } from 'web3uikit';

const Fundraiser = ({ address }) => {
  const { 
    description, 
    fundName, 
    url, 
    renderDonationsList, 
    donationAmount, 
    imageURL, 
    submitFunds, 
    setDonationAmount, 
    getFundraiserDetails, 
    ethAmount, 
    modalLoading,
    Owner,
    withdrawalFunds,
    setNewBeneficiary,
    setBeneficiary,
    beneficiary,
    currentAccount
   } = useContext(Context);

   //console.log(address)

  useEffect(() => {
    const init = () => {
      try {
        getFundraiserDetails(address)
      } catch (error){
        alert(error)
      }
    }
    init()
  }, [])
   
  return (
    <div className="text-white">
       <div className="">
          {!modalLoading ? 
          <div className="flex flex-col mt-4 items-center justify-center">
            <h1 className="text-2xl font-extrabold">{fundName}</h1>
            <div className="diplayFlex p-4 justify-between">
              <img
                src={imageURL}
                className="h-[400px] w-[350px] rounded-lg"
                alt="fundraiser"
                width="100%"
              />
              <div className="ml-4 mt-6 md:mt-2 justify-center items-center flex flex-col">
                <p className="mt-1">{description}
                <a href={url} target="_blank" >
                  <p className=" text-blue-500">Learn More...</p>
                </a></p>
                <h2 className="mt-2 font-bold justify-center items-center">Make A Donation</h2>
                <div className="flex mt-6">
                $ <input
                    className="donation-input text-black rounded-lg ml-2 mr-2 mt-[-5px] p-2"
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="donation amount in USD"
                  />
                  <p>CFX Amount: {ethAmount}</p>
                </div>
                <div className="md:mt-4 mt-0"/>
                {currentAccount ? <Button
                  id="test-button-primary"
                  onClick={() => submitFunds()}
                  disabled={!donationAmount ? true : false}
                  text="Donate"
                  theme="primary"
                  type="button"
                /> : <Button
                id="test-button-primary"
                onClick={() => submitFunds()}
                disabled={true}
                text="Donate"
                theme="primary"
                type="button"
              /> }
                <div className="flex flex-col justify-center items-center">
                  <h1 className="mt-4 font-bold text-xl">My donations</h1>
                    {renderDonationsList() ? renderDonationsList() : <p>You have not made donations yet</p>}
                </div>
              </div>
            </div>
            {Owner && 
            <> 
             <div className="w-[100%] flex mb-4 h-[1px] bg-white" />
              <div className="flex flex-col justify-center items-center">
                <h2 className="mb-4 text-lg font-bold">Withdraw your funds</h2>
                <button
                  type="button"
                  onClick={() => withdrawalFunds()}
                  className="flex flex-row justify-center items-center mr-2 bg-red-500 p-3 rounded-lg cursor-pointer hover:bg-red-600"
                  >
                    <p className="text-white text-base font-semibold">
                      Withdraw
                    </p>
                  </button>
                <div className="flex flex-col justify-center mb-5 items-center">
                <h2 className="mt-2 font-bold justify-center items-center">Change Beneficiary</h2>
                  <div className="flex mt-6">
                   <input
                      className="donation-input text-black rounded-lg mr-1 mt-[5px] p-2"
                      onChange={(e) => setNewBeneficiary(e.target.value)}
                      placeholder="Enter new beneficiary address"
                    />
                  <Button
                    id="test-button-primary"
                    onClick={() => setBeneficiary()}
                    disabled={!beneficiary ? true : false}
                    text="Change Beneficiary"
                    theme="primary"
                    type="button"
                  />
                </div>
                </div>
              </div>
            </>}
          </div>
           :<div className="h-[70vh]"> <Loader /></div>}
      </div>
    </div>
  )
}

export default Fundraiser;
// Fetch data at build time
export async function getStaticProps({ params }) {
  return {
    props: {
      address: params.address,
    },
  };
}

export async function getStaticPaths({ params }) {
  //const posts = await getFundraiserDetails(address);
  return {
    paths: [
      {  params: { address: "0x86af22b34984dccac7fc4e7640d8bd935721db2a" } },
      {  params: { address: "0x8362847cd84bc6981085de8fe1c6016ae8c552a2" } },
    ],
    fallback: false //'blocking',
  };
}