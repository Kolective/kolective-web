import { gql } from "graphql-request";

export const queryTransfers = () => {
  return gql`{
    swaps(
      orderBy: "blockTimestamp", 
      orderDirection: "desc"
    ) {
      items {
        blockNumber
        blockTimestamp
        from
        id
        to
        transactionHash
        value
      }
    }
  }`
}

export const queryTransfersByUser = (address: string) => {
  return gql`{
    swaps(
      orderBy: "blockTimestamp", 
      orderDirection: "desc",
      where: {from: "${address}"}
    ) {
      items {
        blockNumber
        blockTimestamp
        from
        id
        to
        transactionHash
        value
      }
    }
  }`
}