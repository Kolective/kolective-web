"use client"

import { ButtonSoniclabs, ButtonSoniclabsGlow } from '@/components/button/button-soniclabs'
import { subtitle } from '@/components/primitives'
import { formatNumberOri } from '@/lib/custom-helper'
import { cn } from '@/lib/utils'
import { KOL } from '@/types/api/kol.types'
import { Button } from '@heroui/button'
import { Image } from '@heroui/image'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Chip } from "@heroui/chip";

export default function KOLComponent({
  curKOL
}: {
  curKOL: KOL
}) {
  return (
    <div className="py-5 pt-24 overflow-x-hidden w-full px-4 md:px-6">
      <div className="flex flex-col gap-6 items-start w-full">
        <div className="flex flex-col items-start justify-start pb-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='py-5'
          >
            <Link href="/strategy" passHref>
              <Button variant='solid' color='warning'>
                <ChevronLeft className='w-5 h-5' /> Back to Strategy
              </Button>
            </Link>
          </motion.div>
          <div className='flex flex-row items-center gap-3 mb-2'>
            <motion.img
              src={curKOL.avatar}
              alt={curKOL.name}
              width={100}
              height={100}
              className="rounded-full min-w-10 min-h-10 sm:min-w-14 sm:min-h-14 w-10 h-10 sm:w-14 sm:h-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.span
              className={cn(subtitle({ sizeText: "xl" }), "font-bold text-start truncate line-clamp-1 w-auto")}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {curKOL.twitter_name}
            </motion.span>
          </div>
          <motion.span
            className={cn(subtitle(), "text-start")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            @{curKOL.twitter_username} - {formatNumberOri(curKOL.followers_count || 0, { compact: true })} followers
          </motion.span>
          <motion.div className='mt-5 flex flex-col gap-3 w-fit' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <div className='hidden'>
              <ButtonSoniclabs text='Follow Strategy' />
            </div>
            <ButtonSoniclabsGlow text='Already Followed' />
            <Chip variant='flat' color='primary'>Check dashboard to manage your strategy</Chip>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SummaryCard title="Portfolio Value"
            value={`$${formatNumberOri(curKOL.total_value ?? 0, { compact: true, decimals: 2 })}`}
            subtitle={`Balance: ${formatNumberOri(parseFloat(curKOL.balance ?? '0'), { compact: true, decimals: 4 })}`}
          />
          <SummaryCard title="Profit & Loss"
            value={`${(curKOL.pnl ?? 0 * 100).toFixed(2)}%`}
            subtitle={`Total Profit: $${formatNumberOri(curKOL.total_profit ?? 0, { compact: true, decimals: 2 })}`}
            isPositive={(curKOL.pnl ?? 0) >= 0}
          />
          <SummaryCard title="Win Rate"
            value={`${(curKOL.winrate ?? 0 * 100).toFixed(2)}%`}
            subtitle={`${curKOL.profit_num} profitable / ${curKOL.token_num} tokens`}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-foreground/5 rounded-lg p-4">
            <h3 className="text-sm text-gray-400 mb-4">PERFORMANCE OVER TIME</h3>
            <div className="grid grid-cols-3 gap-4">
              <MetricItem
                label="1 Day"
                value={`${(curKOL.pnl_1d ?? 0 * 100).toFixed(2)}%`}
                subvalue={`$${formatNumberOri(curKOL.realized_profit_1d ?? 0, { compact: true, decimals: 2 })}`}
                isPositive={(curKOL.pnl_1d ?? 0) >= 0}
              />
              <MetricItem
                label="7 Days"
                value={`${(curKOL.pnl_7d ?? 0 * 100).toFixed(2)}%`}
                subvalue={`$${formatNumberOri(curKOL.realized_profit_7d ?? 0, { compact: true, decimals: 2 })}`}
                isPositive={(curKOL.pnl_7d ?? 0) >= 0}
              />
              <MetricItem
                label="30 Days"
                value={`${(curKOL.pnl_30d ?? 0 * 100).toFixed(2)}%`}
                subvalue={`$${formatNumberOri(curKOL.realized_profit_30d ?? 0, { compact: true, decimals: 2 })}`}
                isPositive={(curKOL.pnl_30d ?? 0) >= 0}
              />
            </div>
          </div>

          <div className="bg-foreground/5 rounded-lg p-4">
            <h3 className="text-sm text-gray-400 mb-4">TRADING ACTIVITY</h3>
            <div className="grid grid-cols-3 gap-4">
              <MetricItem
                label="1 Day"
                value={`${curKOL.buy_1d} Buys`}
                subvalue={`${curKOL.sell_1d} Sells`}
              />
              <MetricItem
                label="7 Days"
                value={`${curKOL.buy_7d} Buys`}
                subvalue={`${curKOL.sell_7d} Sells`}
              />
              <MetricItem
                label="30 Days"
                value={`${curKOL.buy_30d} Buys`}
                subvalue={`${curKOL.sell_30d} Sells`}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="bg-foreground/5 rounded-lg p-4">
            <h3 className="text-sm text-gray-400 mb-4">LATEST ACTIVITY</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Token</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Profit/Loss</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">PnL %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {curKOL.trade && curKOL.trade.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.token.logo && (
                            <Image
                              src={item.token.logo}
                              alt={item.token.symbol}
                              className="min-w-6 min-h-6 w-6 h-6 rounded-full mr-2"
                            />
                          )}
                          <div>
                            <div className="font-medium">{item.token.symbol}</div>
                            <div className="text-xs text-gray-400 truncate max-w-xs">{item.token.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className={parseFloat(item.total_profit ?? '0') >= 0 ? "text-green-500" : "text-red-500"}>
                          {formatNumberOri(parseFloat(item.total_profit ?? '0'), { compact: true, decimals: 2, prefix: "$" })}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className={parseFloat(item.total_profit_pnl ?? '0') >= 0 ? "text-green-500" : "text-red-500"}>
                          {((parseFloat(item.total_profit_pnl ?? '0')) * 100).toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="bg-foreground/5 rounded-lg p-4">
            <h3 className="text-sm text-gray-400 mb-4">INVESTMENT DISTRIBUTION</h3>
            <div className="grid grid-cols-2 gap-4">
              <MetricItem
                label="Avg Holding Period"
                value={`${formatNumberOri(curKOL.avg_holding_peroid ?? 0 / 3600, { compact: true, decimals: 0 })} hours`}
              />
              <MetricItem
                label="Total Investment"
                value={`$${formatNumberOri(curKOL.history_bought_cost ?? 0, { compact: true, decimals: 2 })}`}
              />
              <MetricItem
                label="Avg Token Cost"
                value={`$${formatNumberOri(curKOL.token_avg_cost ?? 0, { compact: true, decimals: 2 })}`}
              />
              <MetricItem
                label="Avg Sold Profit"
                value={`$${formatNumberOri(curKOL.token_sold_avg_profit ?? 0, { compact: true, decimals: 2 })}`}
                isPositive={(curKOL.token_sold_avg_profit ?? 0) >= 0}
              />
            </div>
          </div>

          <div className="bg-foreground/5 rounded-lg p-4">
            <h3 className="text-sm text-gray-400 mb-4">PNL DISTRIBUTION</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <MetricItem label="< -50%" value={(curKOL.pnl_lt_minus_dot5_num ?? 0).toString()} />
              <MetricItem label="-50% to 0%" value={(curKOL.pnl_minus_dot5_0x_num ?? 0).toString()} />
              <MetricItem label="0% to 200%" value={(curKOL.pnl_lt_2x_num ?? 0).toString()} />
              <MetricItem label="200% to 500%" value={(curKOL.pnl_2x_5x_num ?? 0).toString()} />
              <MetricItem label="> 500%" value={(curKOL.pnl_gt_5x_num ?? 0).toString()} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const SummaryCard = ({
  title,
  value,
  subtitle,
  isPositive
}: {
  title: string,
  value: string,
  subtitle: string,
  isPositive?: boolean
}) => (
  <div className="bg-foreground/5 rounded-lg p-4">
    <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
    <p className={cn("text-2xl font-bold", isPositive !== undefined ? (isPositive ? "text-green-500" : "text-red-500") : "")}>
      {value}
    </p>
    <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
  </div>
);

const MetricItem = ({
  label,
  value,
  subvalue,
  isPositive
}: {
  label: string,
  value: string,
  subvalue?: string,
  isPositive?: boolean
}) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className={cn("text-base font-medium", isPositive !== undefined ? (isPositive ? "text-green-500" : "text-red-500") : "")}>
      {value}
    </p>
    {subvalue && <p className="text-xs text-gray-400">{subvalue}</p>}
  </div>
);