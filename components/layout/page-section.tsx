"use client"

import { motion, MotionProps } from "framer-motion"

import { cn } from "@/lib/utils"
import { staggerContainer } from "@/lib/utils/motion"

interface MotionSectionProps extends MotionProps {
  className?: string
  children?: React.ReactNode
}

function PageSection({ className, children, ...props }: MotionSectionProps) {
  return (
    <motion.section
      variants={staggerContainer({ staggerChildren: 0.15 })}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={cn(
        "mx-auto flex w-full flex-col items-center gap-2 py-8 sm:px-4 md:py-12",
        className
      )}
      {...props}
    >
      {children}
    </motion.section>
  )
}

function PageSectionGrid({ className, children, ...prop }: MotionSectionProps) {
  return (
    <motion.section
      variants={staggerContainer({ staggerChildren: 0.15, delayChildren: 0.5 })}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={cn(
        "my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0",
        className
      )}
      {...prop}
    >
      {children}
    </motion.section>
  )
}

export { PageSection, PageSectionGrid }
