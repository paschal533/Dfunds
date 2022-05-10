import { Box, Image, Text } from "@chakra-ui/react";
//import CustomContainer from "./CustomContainer";

export default function NFTs({ user }) {

  return (
    <CustomContainer>
      <Text fontSize="xl" fontWeight="bold">My NFTs</Text>
      {/*data && data.result.map(nft => (
        <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md" key={nft.token_url}>
          {nft.image && <Image src={nft.image} />}
          <p>{nft.token_url}</p>
        </Box>
      ))*/}
    </CustomContainer>
  )
}