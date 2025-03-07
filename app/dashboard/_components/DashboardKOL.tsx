import ModalSwap from '@/components/modal/modal-swap'
import ModalTransactionCustom from '@/components/modal/modal-transaction-custom'
import { useSwapAI } from '@/hooks/mutation/api/useSwapAI';
import { useKOLFollowed } from '@/hooks/query/api/useKOLFollowed';
import { useBalanceAI } from '@/hooks/query/useBalanceAI';
import React, { useState } from 'react'
import { useAccount } from 'wagmi';

export default function DashboardKOL() {
  const { address } = useAccount();
  const { kfData } = useKOLFollowed({ address: address as string });
  const [isModalTransactionOpen, setIsModalTransactionOpen] = useState<boolean>(false);
  const { mutation, result } = useSwapAI();

  const tweetsKOL = kfData && kfData.tweets;
  const sortTweets = tweetsKOL && tweetsKOL.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  const latestTweet = sortTweets && sortTweets[0];

  const { bNormalized } = useBalanceAI({ token: latestTweet?.token?.addressToken as HexAddress, decimals: latestTweet?.token?.decimals as number });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [amountFrom, setAmountFrom] = useState<string>("0");

  const handleConfirmStake = () => {
    setIsModalOpen(false);
  };

  const closeModalTransaction = () => setIsModalTransactionOpen(false);
  return (
    <div>
      <span>halo</span>
      <ModalSwap
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmStake}
        fromAmount={amountFrom}
        setFromAmount={setAmountFrom}
        toAmount={(parseFloat(amountFrom) * latestTweet?.token?.priceChange24H).toString()}
        fromToken={"SONIC"}
        toToken={latestTweet?.token?.name || ""}
        isLoading={mutation.isPending}
        maxFromAmount={bNormalized}
      />
      <ModalTransactionCustom
        isOpen={isModalTransactionOpen}
        setIsOpen={closeModalTransaction}
        status={mutation.status || ""}
        data={result?.txhash || ""}
        name='trade'
      />
    </div>
  )
}
