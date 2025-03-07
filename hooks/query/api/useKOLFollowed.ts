import { KOLResponse } from '@/types/api/kol.types';
import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api.config';

interface KOL {
  followedKOLs: {
    createdAt: string;
    updatedAt: string;
    kol: KOLResponse[];
    kolId: string;
    userAddress: string;
  }[];
}

export const useKOLFollowed = ({
  address,
}: {
  address: string;
}) => {
  const { data, isLoading, refetch, error } = useQuery<KOL>({
    queryKey: ['kolFollowed', address],
    queryFn: async () => {
      return await api.get(`api/kol/followed/${address.toLowerCase()}`);
    },
  });

  const datas: KOLResponse[] = (Array.isArray(data?.followedKOLs[0]?.kol) ? data?.followedKOLs[0]?.kol : [data?.followedKOLs[0]?.kol]).filter(kol => kol !== undefined) as KOLResponse[];

  return {
    kfData: datas[0],
    kfLoading: isLoading,
    kfRefetch: refetch,
    kfError: error,
  }
};
