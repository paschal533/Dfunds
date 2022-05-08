import React, { useContext, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text
  } from '@chakra-ui/react';
import Web3 from 'web3';
import Fluent from "../assets/fluent.svg";
import {  FaWallet } from "react-icons/fa";
import { Context } from '../context/contextProvider';
import { Icon } from 'web3uikit';
import Image from 'next/image';
import { connectConfluxWallet } from "./interact.js";

function ConnectWallet() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setCurrentAccount, currentAccount } = useContext(Context);
  const [status, setStatus] = useState("");
  
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(15px) hue-rotate(20deg)'
    />
  )

  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  const connectWalletPressed = async () => {
    try {
      if (typeof window.conflux !== 'undefined') {
        const walletResponse = await connectConfluxWallet();
        setCurrentAccount(walletResponse?.address);
        onClose();
      }else{
        setStatus(
          <p className="mt-2">
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://fluentwallet.com/`}>
                You must install Conflux Portal, a virtual Conflux wallet, in your
                browser.
            </a>
          </p>
        )
      }
    } catch (error) {
      console.log(error)
      setStatus(walletResponse.status);
    }
  };

  //connent to metamask
  const ConnectToMetamask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          // Acccounts now exposed
          setCurrentAccount(accounts[0])
          onClose()
          return web3;
        } catch (error) {
          console.error(error);
          setStatus(
            <p className="mt-2">
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download.html`}>
                    You must install Conflux Portal, a virtual Conflux wallet, in your
                    browser.
                </a>
            </p>
          )
      }
    }else{
        setStatus(
          <p className="mt-2">
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Conflux Portal, a virtual Conflux wallet, in your
                browser.
            </a>
          </p>
        )
      }
  }
  return (
    <div className="w-full">
        <Button
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen()
          }}
          bg="#3198FE"
          color="white"
          fontWeight="semibold"
          rounded="lg"
          leftIcon={<FaWallet />}
          _hover={{}}
          _focus={{}}
          _active={{}}
        >
          {currentAccount?.length > 0 ? (
            "Connected: " +
             String(currentAccount).substring(0, 6) +
             "..." +
             String(currentAccount).substring(38)
            ) : (
              <span>Connect Wallet</span>
          )}
       </Button>
       <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader className="text-lg font-bold text-blue-500">Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div onClick={ConnectToMetamask} className="flex hover:bg-slate-200 rounded-xl cursor-pointer flex-col justify-center items-center border-2">
              <Icon
                fill="#000000"
                size={100}
                svg="metamask"
              />
              <Text className="text-lg font-bold text-blue-500 mb-2">MetaMask</Text>
            </div>
            <div onClick={connectWalletPressed} className="flex hover:bg-slate-200 rounded-xl cursor-pointer flex-col justify-center items-center border-2">
              <div className="mt-2"> 
                <Image
                  className=""
                  height={100}
                  width={100}
                  src={Fluent}
                />
              </div>
              <Text className="text-lg font-bold text-blue-500 mb-2">Fluent Wallet</Text>
            </div>
            {status && status}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ConnectWallet;