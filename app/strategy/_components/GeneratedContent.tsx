"use client";

import { Card, CardBody, CardHeader } from '@heroui/card'
import { useAccount } from "wagmi";
import Loading from "@/components/loader/loading";
import { useKOLFollowed } from '@/hooks/query/api/useKOLFollowed';
import { Avatar } from '@heroui/avatar';
import { Image } from '@heroui/image';
import { Chip } from '@heroui/chip';
import { ButtonSoniclabsGlow } from '@/components/button/button-soniclabs';

export default function GeneratedContent() {
  const { address } = useAccount();
  const { kfData, kfLoading } = useKOLFollowed({ address: address as string });

  return (
    <div className="max-w-sm md:max-w-6xl">
      {(kfLoading) && <Loading />}
      <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
        You classified as <span className="font-semibold">{kfData && kfData.riskRecommendation}</span> risk. here&apos;s our recommended kol for you:
      </p>
      {kfData && (
        <Card className="p-6 bg-background/50 shadow-lg rounded-xl border-2 border-warning">
          <CardHeader className="flex flex-col gap-5 sm:flex-row justify-between items-center">
            <div className='flex flex-row gap-4 items-center'>
              <Avatar src={kfData.avatar} size="lg" className="border-2 border-primary" />
              <div>
                <h2 className="text-xl font-semibold">{kfData.name}</h2>
                <p className="text-gray-500 text-sm">@{kfData.username}</p>
              </div>
            </div>
            <ButtonSoniclabsGlow onClick={() => {}} text="Follow KOL"/>
          </CardHeader>
          <CardBody className="space-y-2">
            <p className="text-sm text-gray-300">👥 Followers Twitter: <span className="font-medium">{kfData.followersTwitter.toLocaleString()}</span></p>
            <p className="text-sm text-gray-300">🌟 Followers KOL: <span className="font-medium">{kfData.followersKOL.toLocaleString()}</span></p>
            <p className="text-sm text-gray-300">📈 Avg Profit per Day: <span className="font-medium">{kfData.avgProfitD}%</span></p>
            <div>
              <h3 className="mt-4 font-semibold text-lg">📝 Recent Tweet</h3>
              <div className="border rounded-lg p-4 mt-2 bg-muted">
                <p className="text-gray-300">{kfData.tweets[0].content}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Image src={kfData.tweets[0].token.logo} alt={kfData.tweets[0].token.name} width={24} height={24} className="rounded-full" />
                  <p className="font-medium">{kfData.tweets[0].token.symbol}</p>
                  <Chip color={kfData.tweets[0].signal === "BUY" ? "success" : "danger"}>
                    {kfData.tweets[0].signal}
                  </Chip>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
