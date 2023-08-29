"use client"

import { motion, MotionProps } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { fadeDownVariant, staggerContainer } from "@/lib/utils/motion"

interface MotionHeaderProps extends MotionProps {
  className?: string
  children?: React.ReactNode
}

function PageHeader({ className, children, ...props }: MotionHeaderProps) {
  return (
    <motion.section
      variants={staggerContainer({ staggerChildren: 0.15 })}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={cn(
        "mx-auto flex max-w-4xl flex-col items-center gap-2 px-4 pt-8 md:pt-12",
        className
      )}
      {...props}
    >
      {children}
    </motion.section>
  )
}

function PageHeaderHeading({
  className,
  children,
  ...props
}: MotionHeaderProps) {
  return (
    <motion.h1
      variants={fadeDownVariant()}
      className={cn(
        "bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold leading-tight tracking-tight text-transparent drop-shadow-sm dark:from-stone-100 dark:to-yellow-200 md:text-8xl md:leading-[6rem] lg:leading-[1.1]",
        className
      )}
      {...props}
    >
      {children}
    </motion.h1>
  )
}

function PageHeaderDescription({
  className,
  children,
  ...props
}: MotionHeaderProps) {
  return (
    <motion.p
      variants={fadeDownVariant()}
      className={cn(
        "text-center text-lg text-muted-foreground md:text-xl",
        className
      )}
      {...props}
    >
      {children}
    </motion.p>
  )
}

function PageHeaderCTA({ className, children, ...props }: MotionHeaderProps) {
  return (
    <motion.div
      variants={fadeDownVariant()}
      className={cn(
        "mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-3",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription, PageHeaderCTA }
