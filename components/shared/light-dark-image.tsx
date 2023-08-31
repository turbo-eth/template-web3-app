"use client"

import Image from "next/image"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

interface LightDarkImageProps {
  LightImage: string
  DarkImage: string
  alt: string
  height: number
  width: number
  className?: string
}
const LightDarkImage = ({
  LightImage,
  DarkImage,
  alt,
  height,
  width,
  className,
}: LightDarkImageProps) => {
  const { resolvedTheme } = useTheme()

  let imageUrl = LightImage
  if (resolvedTheme === "dark") {
    imageUrl = DarkImage
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      height={height}
      width={width}
      className={cn("object-contain", className)}
    />
  )
}

export { LightDarkImage }
