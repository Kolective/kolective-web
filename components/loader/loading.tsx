import { cn } from '@/lib/utils'
import React from 'react'

export default function Loading({
  className
}: {
  className?: string
}) {
  return (
    <div className={cn(`fixed z-[100] inset-0 flex items-center justify-center backdrop-blur-sm w-screen h-screen`, className)}>
      <div className="loader"></div>
    </div>
  )
}
