import { KOL } from '@/types/api/kol.types';
import { Image } from '@heroui/image';
import React from 'react';
import { LinkSoniclabs } from '../link/link-soniclabs';
import { motion } from 'framer-motion';
import { VerifiedXIcon } from '../icons';

interface CardKOLProps {
  idx: number;
  kol: KOL;
}

export default function CardKOL({ idx, kol }: CardKOLProps) {
  const getPnlColor = (pnl: number) => {
    if (pnl > 0) return "text-green-500";
    if (pnl < 0) return "text-red-500";
    return "text-gray-400";
  };

  const formatPnl = (pnl: number) => {
    const sign = pnl > 0 ? "+" : "";
    return `${sign}${(pnl * 100).toFixed(2)}%`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <motion.div
      className="rounded-lg overflow-hidden border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * idx }}
    >
      <div className="p-3 flex items-center space-x-3 border-b border-foreground/5">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-foreground/10">
          {kol.avatar ? (
            <Image
              src={kol.avatar}
              alt={kol.name || "KOL Profile"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg">
              {(kol.name || "KOL").charAt(0)}
            </div>
          )}
          {kol.twitter_bind && (
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-3 h-3 border border-background"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate flex flex-row gap-1 items-center">{kol.name || kol.twitter_name || "Unknown KOL"} <VerifiedXIcon className='min-w-5 min-h-5 h-5 w-5' fill='#1D9BF0'/></div>
          <div className="text-xs text-gray-400 flex items-center space-x-1">
            <span>@{kol.twitter_username || "unknown"}</span>
          </div>
          <div className="text-xs text-gray-400 flex items-center pt-1">
            <span>{formatNumber(kol.followers_count || 0)} followers</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 p-3 gap-3">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="text-xs text-gray-400">Portfolio Value</div>
            <div className="text-sm font-medium">{formatCurrency(kol.total_value || 0)}</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-gray-400">Win Rate</div>
            <div className="text-sm font-medium">
              {((kol.winrate || 0) * 100).toFixed(0)}%
              <span className="text-xs text-gray-500 ml-1">({kol.profit_num || 0}/{kol.token_num || 0})</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <div className="text-xs text-gray-400">PnL (7D)</div>
            <div className={`text-sm font-medium ${getPnlColor(kol.pnl_7d || 0)}`}>
              {formatPnl(kol.pnl_7d || 0)}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-gray-400">Trades (7D)</div>
            <div className="text-sm font-medium flex items-center">
              <span className="text-green-500 mr-2">B: {kol.buy_7d || 0}</span>
              <span className="text-red-500">S: {kol.sell_7d || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-foreground/5 flex justify-between items-center">
        <div className="flex space-x-2">
          {kol.tags && kol.tags.length > 0 && (
            <div className="px-2 py-0.5 bg-foreground/10 rounded-full text-xs">
              {kol.tags[0]}
            </div>
          )}
          {kol.tag_rank && kol.tag_rank.kol && (
            <div className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs">
              Rank #{kol.tag_rank.kol}
            </div>
          )}
        </div>
      </div>

      <div className='flex items-center w-full justify-center py-2 border-t border-foreground/5'>
        <LinkSoniclabs
          text='View Strategy'
          classNameText='text-sm font-medium'
          href={`/strategy/${kol.twitter_username}`}
        />
      </div>
    </motion.div>
  );
}