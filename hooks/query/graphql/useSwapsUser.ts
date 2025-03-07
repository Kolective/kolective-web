import { querySwapsByUser } from "@/graphql/swap.query";
import { Swaps } from "@/types/graphql/swap.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useAccount } from "wagmi";

interface SwapResponse {
  swaps: {
    items: Swaps[];
  }
}

export const useSwapsUser = () => {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useQuery<SwapResponse>({
    queryKey: ['gql-swaps-user', address],
    queryFn: async () => {
      if (address) {
        return await request(
          process.env.NEXT_PUBLIC_API_GRAPHQL_URL || "",
          querySwapsByUser((address).toString())
        );
      }

      return { swaps: { items: [] } };
    },
    enabled: !!address,
    refetchInterval: 10000,
    staleTime: 10000
  })

  return {
    suData: data?.swaps.items || [],
    suLoading: isLoading,
    suError: error,
    suRefetch: refetch,
  }
}