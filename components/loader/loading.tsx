import { cn } from '@/lib/utils'
import React from 'react'

export default function Loading({
  className
}: {
  className?: string
}) {
  return (
    <div className={cn(`fixed z-[100] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm w-full h-full`, className)}>
      <div className="loader"></div>
    </div>
  )
}
