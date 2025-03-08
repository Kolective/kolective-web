"use client";

import React from "react";
import CreateWalletContent from "./CreateWalletContent";
import QuestionnaireContent from "./QuestionnaireContent";
import GeneratedContent from "./GeneratedContent";
// import { useAccount } from "wagmi";
// import { useAddressAI } from "@/hooks/query/useAddressAI";
// import Loading from "@/components/loader/loading";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { subtitle } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { useKOLFollowed } from "@/hooks/query/api/useKOLFollowed";
import { useAccount } from "wagmi";

const StrategyComponent: React.FC = () => {
  const { address } = useAccount();
  const { kfData, kfLoading } = useKOLFollowed({ address: address as string });
  // const { isConnected } = useAccount();
  // const { addressAI, laAI } = useAddressAI();
  const addressAI = "0x123";

  // if (laAI) {
  //   return <Loading className="z-[90]" />;
  // }

  return (
    <TracingBeam className="px-6">
      <div className="mx-auto antialiased pt-4 relative flex flex-col gap-20">
        <div>
          <span className={cn(subtitle({ sizeText: "lxl" }), "font-bold text-start")}>Create Wallet AI</span>
          <CreateWalletContent addressAI={addressAI} />
        </div>
        <div>
          <span className={cn(subtitle({ sizeText: "lxl" }), "font-bold text-start")}>Fill Questionnaire</span>
          <QuestionnaireContent />
        </div>
        <div>
          <span className={cn(subtitle({ sizeText: "lxl" }), "font-bold text-start")}>Generated Content</span>
          <GeneratedContent kfData={kfData} kfLoading={kfLoading} addressAI={addressAI}/>
        </div>
      </div>
    </TracingBeam>
  );
};

export default StrategyComponent;