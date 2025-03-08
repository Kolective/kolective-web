"use client";

import React from "react";
import CreateWalletContent from "./CreateWalletContent";
import QuestionnaireContent from "./QuestionnaireContent";
import GeneratedContent from "./GeneratedContent";
import { useAddressAI } from "@/hooks/query/useAddressAI";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { subtitle } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { useRiskProfileAI } from "@/hooks/query/useRiskProfileAI";
import { useKOL } from "@/hooks/query/api/useKOL";
import Loading from "@/components/loader/loading";
import { useRecommendKOLAI } from "@/hooks/query/api/useRecommendKOLAI";

const StrategyComponent: React.FC = () => {
  const { kData, kLoading } = useKOL();
  const { addressAI, laAI } = useAddressAI();
  const { riskAI } = useRiskProfileAI();

  const filterKolByRisk = kData && riskAI && kData.filter((kol) => kol.riskRecommendation.includes(riskAI.toUpperCase()));

  const colorRisk = riskAI?.toUpperCase()?.includes("CONSERVATIVE")
    ? "text-green-500"
    : riskAI?.toUpperCase()?.includes("BALANCED")
      ? "text-yellow-500"
      : "text-red-500";

  const colorBorderRisk = riskAI?.toUpperCase()?.includes("CONSERVATIVE")
    ? "border-success"
    : riskAI?.toUpperCase()?.includes("BALANCED")
      ? "border-warning"
      : "border-danger";

  const { rData, rLoading } = useRecommendKOLAI({ riskAI: riskAI });

  const kolRecommendation = rData !== null && Array.isArray(filterKolByRisk) ? filterKolByRisk.find((kol) => kol.id === rData) : null;

  console.log("rData", rData);
  console.log("kolRecommendation", kolRecommendation);

  if (laAI || kLoading) return <Loading />;

  return (
    <TracingBeam className="px-6">
      <div className="mx-auto antialiased pt-4 relative flex flex-col gap-20">
        <div>
          <span className={cn(subtitle({ sizeText: "lxl" }), "font-bold text-start")}>Create Wallet AI</span>
          <CreateWalletContent addressAI={addressAI} />
        </div>
        <div>
          <span className={cn(subtitle({ sizeText: "lxl" }), "font-bold text-start")}>Fill Questionnaire</span>
          {addressAI ? <QuestionnaireContent /> : (
            <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
              Please create your AI wallet to start filling the questionnaire.
            </p>
          )}
        </div>
        <div>
          <span className={cn(subtitle({ sizeText: "lxl" }), "font-bold text-start")}>Generated Content</span>
          {addressAI && riskAI && filterKolByRisk ? (
            <div>
              <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
                You classified as <span className={`font-semibold ${colorRisk}`}>{filterKolByRisk[0]?.riskRecommendation}</span> risk. here&apos;s our recommended kol for you:
              </p>
              <div className="flex flex-col gap-5">
                {filterKolByRisk.map((kol, idx) => {
                  return (
                    <GeneratedContent key={idx} kfData={kol} kfLoading={kLoading} addressAI={addressAI} colorBorderRisk={colorBorderRisk} />
                  )
                })}
                <div className="flex my-5">
                  {kolRecommendation && <GeneratedContent kfData={kolRecommendation} kfLoading={rLoading} addressAI={addressAI} colorBorderRisk={colorBorderRisk} />}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
              Please create your AI wallet and fill questionnaire first to see generating content.
            </p>
          )}
        </div>
      </div>
    </TracingBeam>
  );
};

export default StrategyComponent;