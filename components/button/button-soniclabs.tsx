import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'
import React from 'react'

export const ButtonSoniclabs = ({
  text,
  delay = 0.5,
  classNameText,
  onClick = () => {}
}: {
  text: string;
  delay?: number;
  classNameText?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="relative p-[2px] bg-gradient-sonic-mirrored rounded-lg animate-gradient cursor-pointer z-20 transform"
      tabIndex={0}
      style={{ willChange: "transform, filter", filter: "brightness(1)", transform: "none" }}
      onClick={onClick}
    >
      <div className="relative z-10 bg-black/75 rounded-md flex items-center overflow-hidden opacity-100">
        <div className="px-3 py-1.5 flex items-center gap-x-2.5 opacity-100">
          <span className={cn("text-body-base font-medium", classNameText)}>{text}</span>
        </div>
      </div>
    </motion.button>
  )
}
