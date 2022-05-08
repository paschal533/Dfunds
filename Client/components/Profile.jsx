import { Text } from "@chakra-ui/react";
import CustomContainer from "./CustomContainer";

export default function Profile({ user }) {

  return(
    <CustomContainer>
      <Text><b>🙂 Wallet address:</b> {user}</Text>
    </CustomContainer>
  )
}