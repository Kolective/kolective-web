import { querySwapsByUser } from "@/graphql/swap.query";
import { Swaps } from "@/types/graphql/swap.types";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

interface SwapResponse {
  swaps: {
    items: Swaps[];
  }
}

export const useSwapsUser = ({
  address
}: {
  address: HexAddress
}) => {
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

  console.log("data = ", data);

  return {
    suData: data?.swaps.items || [],
    suLoading: isLoading,
    suError: error,
    suRefetch: refetch,
  }
}