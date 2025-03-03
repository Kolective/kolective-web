import { normalize } from '@/lib/bignumber'
import { useAccount, useBalance as useBalanceWagmi } from 'wagmi'

export const useBalance = ({ token = "0x1", decimal = 18 }: { token: HexAddress, decimal: number }) => {
  const { address } = useAccount()

  const { data: result, isLoading: bLoading, error: bError, refetch: bRefetch } = useBalanceWagmi({
    address: address,
    token: token as HexAddress,
  })

  const bNormal = result?.value
  const bNormalized = result?.value ? Number(normalize(result.value.toString(), decimal)) : undefined

  return {
    bNormal,
    bNormalized,
    bLoading,
    bError,
    bRefetch
  }
}