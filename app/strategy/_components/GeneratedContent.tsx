"use client";

import { Card, CardBody, CardHeader } from '@heroui/card'
import Loading from "@/components/loader/loading";
import { Avatar } from '@heroui/avatar';
import { Image } from '@heroui/image';
import { Chip } from '@heroui/chip';
import { ButtonSoniclabsGlow } from '@/components/button/button-soniclabs';
import { KOLResponse } from '@/types/api/kol.types';
import { useState } from 'react';
import ModalTransactionCustom from '@/components/modal/modal-transaction-custom';
import { useTransfer } from '@/hooks/mutation/useTransfer';
import { useBalance } from '@/hooks/query/useBalance';
import ModalTransfer from '@/components/modal/modal-transfer';
import { useToken } from '@/hooks/query/api/useToken';
import SkeletonWrapper from '@/components/loader/skeleton-wrapper';
import React from 'react';
import { cn } from '@/lib/utils';

export default function GeneratedContent({
  kfData,
  kfLoading,
  addressAI,
  colorBorderRisk
}: {
  kfData?: KOLResponse;
  kfLoading: boolean;
  addressAI: HexAddress;
  colorBorderRisk: string;
}) {
  const [isModalTransactionOpen, setIsModalTransactionOpen] = useState(false);
  const { mutation, txHash } = useTransfer();
  const { tData } = useToken();

  const findSonicToken = tData?.find((token) => token.symbol === "S");

  const tweetsKOL = kfData?.tweets || [];
  const sortTweets = tweetsKOL.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  const latestTweet = sortTweets[0];

  const { bNormalized } = useBalance({ token: latestTweet?.token?.addressToken as HexAddress, decimals: latestTweet?.token?.decimals });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountFrom, setAmountFrom] = useState('0');

  const handleTransfer = () => {
    mutation.mutate({
      addressToken: latestTweet?.token?.addressToken as HexAddress,
      toAddress: addressAI,
      value: amountFrom,
      decimals: latestTweet?.token?.decimals
    }, {
      onSuccess: () => {
        setIsModalTransactionOpen(true);
      }
    });
  }

  const closeModalTransaction = () => setIsModalTransactionOpen(false);

  return (
    <div className="max-w-full md:max-w-6xl">
      {(mutation.isPending) && <Loading />}
      {!kfLoading && kfData ? (
        <React.Fragment>
          <Card className={cn("p-6 bg-background/50 shadow-lg rounded-xl border-2", `${colorBorderRisk}`)}>
            <CardHeader className="flex flex-col gap-5 sm:flex-row justify-between items-center">
              <div className='flex flex-row gap-4 items-center'>
                <SkeletonWrapper isLoading={kfLoading} className="rounded-full min-w-12 min-h-12">
                  <Avatar src={kfData?.avatar || "/placeholder-person.jpg"} size="lg" className="border-2 border-primary min-w-12 min-h-12" />
                </SkeletonWrapper>
                <SkeletonWrapper isLoading={kfLoading}>
                  <div>
                    <h2 className="text-xl font-semibold">{kfData?.name}</h2>
                    <p className="text-gray-500 text-sm">@{kfData?.username}</p>
                  </div>
                </SkeletonWrapper>
              </div>
              <ButtonSoniclabsGlow onClick={() => setIsModalOpen(true)} text="Follow KOL & Start Auto Trade" />
            </CardHeader>
            <CardBody className="space-y-2">
              <SkeletonWrapper isLoading={kfLoading}>
                <p className="text-sm text-gray-300">👥 Followers Twitter: <span className="font-medium">{kfData?.followersTwitter.toLocaleString()}</span></p>
              </SkeletonWrapper>
              <SkeletonWrapper isLoading={kfLoading}>
                <p className="text-sm text-gray-300">🌟 Followers KOL: <span className="font-medium">{kfData?.followersKOL.toLocaleString()}</span></p>
              </SkeletonWrapper>
              <SkeletonWrapper isLoading={kfLoading}>
                <p className="text-sm text-gray-300">📈 Avg Profit per Day: <span className="font-medium">{kfData?.avgProfitD}%</span></p>
              </SkeletonWrapper>
              <div>
                <h3 className="mt-4 font-semibold text-lg">📝 Recent Tweet</h3>
                <div className="border rounded-lg p-4 mt-2 bg-muted">
                  <p className="text-gray-300">{kfData?.tweets[0].content}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Image src={kfData?.tweets[0].token.logo} alt={kfData?.tweets[0].token.name} width={24} height={24} className="rounded-full" />
                    <p className="font-medium">{kfData?.tweets[0].token.symbol}</p>
                    <Chip color={kfData?.tweets[0].signal === "BUY" ? "success" : "danger"}>
                      {kfData?.tweets[0].signal}
                    </Chip>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </React.Fragment>
      ) : (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          Complete the questionnaire to get the recommended KOL for you.
        </p>
      )}
      <ModalTransfer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTransfer={handleTransfer}
        token={findSonicToken?.symbol || ""}
        maxAmount={bNormalized}
        amount={amountFrom}
        recipient={addressAI}
        setAmount={setAmountFrom}
        setRecipient={() => { }}
        isLoading={mutation.isPending}
        logoToken={findSonicToken?.logo || ""}
      />

      <ModalTransactionCustom
        isOpen={isModalTransactionOpen}
        setIsOpen={closeModalTransaction}
        status={mutation.status || ""}
        data={txHash || ""}
        name="transfer"
      />
    </div>
  )
}
