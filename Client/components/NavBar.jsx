import {
  Flex,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Logo from '../assets/vault3_logo.svg';
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Context } from '../context/contextProvider';
import Link from "next/link";
import {  FaWallet } from "react-icons/fa";
import ConnectWallet from "./ConnectWallet";

export default function Navigation({ color = "white" }) {
  const { setCurrentAccount, currentAccount } = useContext(Context);
  const [topOfPage, setTopOfPage] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [status, setStatus] = useState("");


  /*useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setCurrentAccount(address)
    setStatus(status);

    addWalletListener();
  }, []);*/

  function addWalletListener() {
    if (window.conflux) {
      window.conflux.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Conflux Portal using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Conflux Portal, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const NavBarItem = ({ title, classprops }) => (
      <Link href={`/${title.toLowerCase()}`}>
        <li onClick={() => setToggleMenu(false)} className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
      </Link>
    );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        setTopOfPage(false);
      } else {
        setTopOfPage(true);
      }
    });
  }, []);

  return (
    <Box
      position="fixed"
      zIndex={999}
      top="0"
      left="0"
      w="full"
      display="flex"
      transitionDuration="300ms"
      bg={
        topOfPage
          ? "transparent"
          : color === "blue-glassmorphism"
          ? "rgba(255, 255, 255, 0.43);"
          : "rgba(4, 12, 30, 0.53)"
      }
      backdropFilter={!topOfPage ? "blur(7px)" : ""}
      borderBottom={!topOfPage ? "1px" : "1px"}
      borderColor={
        !topOfPage
          ? color === "white"
            ? "blackAlpha.100"
            : "whiteAlpha.200"
          : "transparent"
      }
      justifyContent="center"
    >
      <Flex
        justify="space-between"
        w="full"
        alignItems="center"
        p="4"
      >
        <Link href="/" passHref>
          <Flex alignItems="center" className="text-white" experimental_spaceX="3" cursor="pointer">
            <Image height={50} width={50} src={Logo} alt="dfunds" />
            <Flex
              fontSize="2xl"
              color={color == "white" ? "blackAlpha.900" : "white"}
              alignItems="center"
              className="text-white"
            >
              <Text fontFamily="heading" className="text-white" fontWeight="extrabold">
                DFund{" "}
              </Text>
              <Text ml="0.5" className="text-white" fontFamily="body" fontWeight="medium" mb="1">
                s
              </Text>
            </Flex>
          </Flex>
        </Link>
          <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {["New", "Create", "Games", "Dashboard"].map((item, index) => (
              <NavBarItem key={item + index} title={item} />
          ))}
          <li>
            {/*<Button
              onClick={connectWalletPressed}
              bg="#3198FE"
              color="white"
              fontWeight="semibold"
              rounded="lg"
              leftIcon={<FaWallet />}
              _hover={{}}
              _focus={{}}
              _active={{}}
            >
              {currentAccount.length > 0 ? (
                "Connected: " +
                  String(currentAccount).substring(0, 6) +
                  "..." +
                  String(currentAccount).substring(38)
                ) : (
                  <span>Connect Wallet</span>
              )}
            </Button>*/}
            <ConnectWallet />
          </li>
          </ul>
         <div className="flex relative md:hidden">
          {!toggleMenu && (
          <FiMenu fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
          )}
          {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
          )}
          {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] list-height h-[100%] shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
              {["New", "Create", "Games", "Dashboard"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
              )}
              <li>
                <Button
                  onClick={connectWalletPressed}
                  bg="#3198FE"
                  color="white"
                  fontWeight="semibold"
                  rounded="lg"
                  leftIcon={<FaWallet />}
                  _hover={{}}
                  _focus={{}}
                  _active={{}}
                >
                  {currentAccount.length > 0 ? (
                    String(currentAccount).substring(0, 6) +
                    "..." +
                    String(currentAccount).substring(38)
                  ) : (
                    <span>Connect Wallet</span>
                  )}
                </Button>
              </li>
          </ul>
          )}
      </div>
      </Flex>
    </Box>
  );
}