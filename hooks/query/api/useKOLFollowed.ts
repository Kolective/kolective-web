import { KOLResponse } from '@/types/api/kol.types';
import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api.config';

interface KOL {
  followedKOL: {
    id: number;
    kolId: number;
    kol: KOLResponse;
    userAddress: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const useKOLFollowed = ({
  address,
}: {
  address: string;
}) => {
  const { data, isLoading, refetch, error } = useQuery<KOL>({
    queryKey: ['kolFollowed', address],
    queryFn: async () => {
      return await api.get(`api/kol/followed/${address}`);
    },
  });

  console.log("data", data);

  const defaultKOLResponse: KOLResponse = {
    id: 0,
    name: '',
    username: '',
    avatar: '',
    followersTwitter: 0,
    followersKOL: 0,
    riskRecommendation: 'CONSERVATIVE',
    avgProfitD: 0,
    rankFollowersKOL: 0,
    rankAvgProfitD: 0,
    createdAt: '',
    updatedAt: '',
    tweets: []
  };

  const datas: KOLResponse = data?.followedKOL.kol || defaultKOLResponse;

  return {
    kfData: datas,
    kfLoading: isLoading,
    kfRefetch: refetch,
    kfError: error,
  }
};
