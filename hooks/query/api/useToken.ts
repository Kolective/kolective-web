import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api.config';
import { TokenResponse } from '@/types/api/token.types';

export const useToken = () => {
  const { data, isLoading, refetch, error } = useQuery<TokenResponse[]>({
    queryKey: ['kol'],
    queryFn: async () => {
      return await api.get("api/token/data");
    },
  });

  return {
    tData: data,
    tLoading: isLoading,
    tRefetch: refetch,
    tError: error,
  }
};
