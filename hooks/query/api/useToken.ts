import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api.config';
import { TokenResponse } from '@/types/api/token.types';

interface Token {
  tokens: TokenResponse[];
}

export const useToken = () => {
  const { data, isLoading, refetch, error } = useQuery<Token>({
    queryKey: ['kol'],
    queryFn: async () => {
      return await api.get("api/token/data");
    },
  });

  const datas = data?.tokens || [];

  return {
    tData: datas,
    tLoading: isLoading,
    tRefetch: refetch,
    tError: error,
  }
};
