"use client"

import { useState } from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { integrations } from "@/data/integrations"
import { LuMenu } from "react-icons/lu"

import { menuDashboard } from "@/config/menu-dashboard"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LightDarkImage } from "@/components/shared/light-dark-image"

import { ModeToggle } from "../shared/mode-toggle"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex w-full items-center justify-between md:hidden">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <LightDarkImage
            LightImage="/logo-dark.png"
            DarkImage="/logo-light.png"
            alt="TurboETH"
            height={32}
            width={32}
          />
          <span className="inline-block bg-gradient-to-br from-black to-stone-500 bg-clip-text text-xl font-bold text-transparent dark:from-stone-100 dark:to-yellow-200 sm:text-2xl">
            {siteConfig.name}
          </span>
        </Link>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="ml-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <LuMenu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="right" className="pr-0">
        <div className="flex items-center gap-x-4">
          <MobileLink
            href="/"
            className="flex items-center"
            onOpenChange={setOpen}
          >
            <LightDarkImage
              LightImage="/logo-dark.png"
              DarkImage="/logo-light.png"
              alt="TurboETH"
              height={32}
              width={32}
            />
          </MobileLink>
          <ModeToggle />
        </div>
        <ScrollArea className="my-4 mr-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-4">
            <Accordion type="single" collapsible className="mx-auto w-full">
              <AccordionItem value="integrations">
                <AccordionTrigger className="text-base font-medium">
                  Integrations
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium leading-none">
                      General
                    </h4>
                    <Separator />
                    {Object.values(integrations.general).map((component) => (
                      <NavMenuListItem
                        key={component.name}
                        name={component.name}
                        href={component.href}
                        lightImage={component.imgDark}
                        darkImage={component.imgLight}
                      />
                    ))}
                    <h4 className="mt-2 text-sm font-medium leading-none">
                      Protocols
                    </h4>
                    <Separator />
                    {Object.values(integrations.protocols).map((component) => (
                      <NavMenuListItem
                        key={component.name}
                        name={component.name}
                        href={component.href}
                        lightImage={component.imgDark}
                        darkImage={component.imgLight}
                      />
                    ))}
                    <h4 className="mt-2 text-sm font-medium leading-none">
                      Services
                    </h4>
                    <Separator />
                    {Object.values(integrations.services).map((component) => (
                      <NavMenuListItem
                        key={component.name}
                        name={component.name}
                        href={component.href}
                        lightImage={component.imgDark}
                        darkImage={component.imgLight}
                      />
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="dashboard">
                <AccordionTrigger className="text-base font-medium">
                  Dashboard
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {menuDashboard?.map((item, index) =>
                      item.href ? (
                        <Link
                          key={index}
                          href={item.href}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <div
                          key={index}
                          className="text-muted-foreground/70 transition-colors"
                        >
                          {item.label}
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              href="https://docs.turboeth.xyz/overview"
              className="font-medium"
            >
              Documentation
            </Link>
            <Separator />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

interface NavMenuListItemProps {
  name: string
  href: string
  lightImage: string
  darkImage: string
  onOpenChange?: (open: boolean) => void
}

const NavMenuListItem = ({
  name,
  href,
  lightImage,
  darkImage,
  onOpenChange,
}: NavMenuListItemProps) => {
  const router = useRouter()
  return (
    <li key={name}>
      <Link
        href={href}
        onClick={() => {
          router.push(href.toString())
          onOpenChange?.(false)
        }}
        className="block select-none space-y-1 rounded-md py-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="flex items-center space-x-2">
          <LightDarkImage
            LightImage={lightImage}
            DarkImage={darkImage}
            alt="icon"
            height={16}
            width={16}
            className="h-4 w-4"
          />
          <span className="text-sm font-medium leading-none">{name}</span>
        </div>
      </Link>
    </li>
  )
}
