import { gql } from "graphql-request";

export const querySwaps = () => {
  return gql`{
    swaps(
      orderBy: "blockTimestamp", 
      orderDirection: "desc"
    ) {
      items {
        id
        sender
        tokenIn
        tokenOut
        transactionHash
        amountOut
        amountIn
        blockNumber
        blockTimestamp
      }
    }
  }`
}

export const querySwapsByUser = (address: string) => {
  return gql`{
    swaps(
      orderBy: "blockTimestamp", 
      orderDirection: "desc",
      where: {sender: "${address}"}
    ) {
      items {
        id
        sender
        tokenIn
        tokenOut
        transactionHash
        amountOut
        amountIn
        blockNumber
        blockTimestamp
      }
    }
  }`
}