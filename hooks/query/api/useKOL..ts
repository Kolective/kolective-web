import { KOLResponse } from '@/types/api/kol.types';
import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api.config';

export const useKOL = () => {
  const { data, isLoading, refetch, error } = useQuery<KOLResponse[]>({
    queryKey: ['kol'],
    queryFn: async () => {
      return await api.get("api/kol/data");
    },
  });

  return {
    kData: data,
    kLoading: isLoading,
    kRefetch: refetch,
    kError: error,
  }
};
