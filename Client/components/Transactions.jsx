import { Divider, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomContainer from "./CustomContainer";

export default function Transactions({ user }) {
  const [transactions, setTransactions] = useState()

  return (
    <CustomContainer>
      <Text fontSize="xl" mb="6" fontWeight="bold">My last 5 Transactions</Text>
      {transactions && transactions.map(transaction => {
        <div key={transaction.hash}>
          <Link href={`${BaseURL}${transaction.hash}`} isExternal>{transaction.hash}</Link>
          <Divider />
        </div>
      })}
    </CustomContainer>
  )
}