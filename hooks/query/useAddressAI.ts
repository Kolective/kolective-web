import apiAgent from "@/config/api-agent.config";
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

export const useAddressAI = () => {
  const { address } = useAccount();

  const { data, isLoading, refetch } = useQuery<{ address: string }>({
    queryKey: ["addressAI"],
    queryFn: async () => {
      const response = await apiAgent.post("action/get-wallet", { user_address: address })
      return response
    },
    retry: 5,
    retryDelay: 100000,
    refetchInterval: 5000,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000,
  })

  return {
    addressAI : data?.address as HexAddress,
    laAI: isLoading,
    raAI: refetch
  }
}