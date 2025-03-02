import CardInfluencer from '@/components/card/card-influencer';
import React, { useState } from 'react'
import { dataKOL } from '@/data/data-kol';
import { Button } from '@heroui/button';

interface Collection {
  id: string;
  name: string;
  count?: number;
}

export default function StrategyComponent() {
  const [activeCollection, setActiveCollection] = useState<string>("ALL");
  const [activeTimeframe, setActiveTimeframe] = useState<string>("7D");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  const collections: Collection[] = [
    { id: "all", name: "ALL", count: dataKOL.length },
    { id: "trending", name: "TRENDING", count: dataKOL.filter(kol => kol.followers_count > 50000).length },
    { id: "new", name: "NEW", count: dataKOL.filter(kol => kol.last_active_timestamp > 1740300000).length },
    { id: "profitable", name: "PROFITABLE", count: dataKOL.filter(kol => kol.pnl_7d > 0).length }
  ];  

  const timeframes = ["1D", "7D", "30D", "ALL"];
  const filteredKOLs = dataKOL.filter(kol => {
    if (activeCollection === "ALL") return true;
    if (activeCollection === "TRENDING") return kol.followers_count > 50000;
    if (activeCollection === "NEW") return kol.last_active_timestamp > 1740300000;
    if (activeCollection === "PROFITABLE") return kol.pnl_7d > 0;
    return true;
  });

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    <main className="flex flex-col w-full px-4 md:px-6">
      <div className="md:hidden mt-4 mb-4">
        <Button 
          className="w-full bg-foreground/10 text-center py-2"
          onPress={toggleMobileFilters}
        >
          {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} md:block md:w-1/4 md:pr-4 mb-4 md:mb-0`}>
          <StatsPanel collections={collections} />
          <TimeframeSelector
            timeframes={timeframes}
            activeTimeframe={activeTimeframe}
            setActiveTimeframe={setActiveTimeframe}
          />
        </div>

        <div className="w-full md:w-3/4">
          <FilterBar
            collections={collections}
            activeCollection={activeCollection}
            setActiveCollection={setActiveCollection}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredKOLs.map((kol, idx) => (
              <CardInfluencer key={idx} idx={idx} kol={kol} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

interface FilterBarProps {
  collections: Collection[];
  activeCollection: string;
  setActiveCollection: (collection: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  collections,
  activeCollection,
  setActiveCollection
}) => {
  return (
    <div
      className="flex flex-wrap items-center rounded-lg p-2 overflow-x-auto"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
    >
      {collections.map(collection => (
        <Button
          key={collection.id}
          className={`text-xs px-2 sm:px-3 py-1 rounded-md mr-2 mb-2 whitespace-nowrap ${activeCollection === collection.name ? 'bg-foreground/10' : 'bg-transparent'}`}
          variant={activeCollection === collection.name ? 'ghost' : 'flat'}
          onPress={() => setActiveCollection(collection.name)}
        >
          {collection.name}
          {collection.count && <span className="ml-1 text-gray-400">({collection.count})</span>}
        </Button>
      ))}
    </div>
  );
};

export const StatsPanel = ({ 
  collections 
}: {
  collections: Collection[];
}) => {
  return (
    <div
      className="rounded-lg p-4 mb-4"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
    >
      <h3 className="text-sm text-gray-400 mb-4">DETAILS</h3>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {collections.slice(0, 3).map(collection => (
          <div key={collection.id} className="flex flex-col">
            <div className="text-xs sm:text-sm text-gray-400 mb-1 truncate">
              {collection.name}
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 ${
                collection.id === "all" ? "bg-blue-500" :
                collection.id === "trending" ? "bg-red-500" : 
                collection.id === "new" ? "bg-green-500" : "bg-yellow-500"
              }`}></div>
              <span className="text-xs sm:text-sm">{collection.count && collection.count.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TimeframeSelectorProps {
  timeframes: string[];
  activeTimeframe: string;
  setActiveTimeframe: (timeframe: string) => void;
}

export const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  timeframes,
  activeTimeframe,
  setActiveTimeframe
}) => {
  return (
    <div
      className="rounded-lg p-4 mb-4"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
    >
      <h3 className="text-sm text-gray-400 mb-4">TIMEFRAME</h3>
      <div className="flex flex-wrap">
        {timeframes.map(timeframe => (
          <button
            key={timeframe}
            className={`text-xs px-2 sm:px-3 py-1 rounded-md mr-2 mb-2 ${activeTimeframe === timeframe ? 'bg-blue-500/50' : 'bg-foreground/5'}`}
            onClick={() => setActiveTimeframe(timeframe)}
          >
            {timeframe}
          </button>
        ))}
      </div>
    </div>
  );
};