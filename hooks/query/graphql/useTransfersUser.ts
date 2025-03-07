import { queryTransfersByUser } from "@/graphql/transfer.query";
import { Transfers } from "@/types/graphql/transfer.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useAccount } from "wagmi";

interface TranferResponse {
  items: Transfers[];
}

export const useTransfersUser = () => {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useQuery<TranferResponse>({
    queryKey: ['gql-transfers-user', address],
    queryFn: async () => {
      if (address) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_URL || "", 
          queryTransfersByUser((address).toString())
        );
      }

      return { items: [] };
    },
    enabled: !!address,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    tuData: data,
    tuLoading: isLoading,
    tuError: error,
    tuRefetch: refetch,
  }
}