import { Tabs, Tab } from "@heroui/tabs";
import { Brain, MousePointerClick, UserRound, Wallet } from "lucide-react";
import DashboardMainWallet from "./DashboardMainWallet";
import DashboardAIWallet from "./DashboardAIWallet";
import DashboardOverview from "./DashboardOverview";

export default function DashboardComponent() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="warning" variant="bordered">
        <Tab
          key="kol"
          title={
            <div className="flex items-center space-x-2">
              <UserRound />
              <span>Overview</span>
            </div>
          }
        >
          <DashboardOverview />
        </Tab>
        <Tab
          key="positions"
          title={
            <div className="flex items-center space-x-2">
              <MousePointerClick />
              <span>Positions</span>
            </div>
          }
        >
          <DashboardMainWallet />
        </Tab>
        <Tab
          key="main"
          title={
            <div className="flex items-center space-x-2">
              <Wallet />
              <span>Main Wallet</span>
            </div>
          }
        >
          <DashboardMainWallet />
        </Tab>
        <Tab
          key="ai"
          title={
            <div className="flex items-center space-x-2">
              <Brain />
              <span>AI Wallet</span>
            </div>
          }
        >
          <DashboardAIWallet />
        </Tab>
      </Tabs>
    </div>
  );
}