"use client"

import React from "react"
import Link from "next/link"
import { integrations } from "@/data/integrations"

import { siteConfig } from "@/config/site"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { LightDarkImage } from "@/components/shared/light-dark-image"

import { LinkComponent } from "../shared/link-component"

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <LightDarkImage
          LightImage="/logo-dark.png"
          DarkImage="/logo-light.png"
          alt="TurboETH"
          height={32}
          width={32}
        />
        <span className="hidden bg-gradient-to-br from-black to-stone-500 bg-clip-text text-2xl font-bold text-transparent dark:from-stone-100 dark:to-yellow-200 sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-base font-medium">
        <MainNavMenu />
      </nav>
    </div>
  )
}

function MainNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Integrations</NavigationMenuTrigger>
          <NavigationMenuContent className="max-h-[768px] overflow-y-scroll">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[768px] lg:grid-cols-3">
              <h4 className="col-span-3 text-lg font-medium leading-none">
                General
              </h4>
              <Separator className="col-span-3" />
              {Object.values(integrations.general).map((component) => (
                <NavMenuListItem
                  key={component.name}
                  name={component.name}
                  href={component.href}
                  description={component.description}
                  lightImage={component.imgDark}
                  darkImage={component.imgLight}
                />
              ))}
              <h4 className="col-span-3 mt-2 text-lg font-medium leading-none">
                Protocols
              </h4>
              <Separator className="col-span-3" />
              {Object.values(integrations.protocols).map((component) => (
                <NavMenuListItem
                  key={component.name}
                  name={component.name}
                  href={component.href}
                  description={component.description}
                  lightImage={component.imgDark}
                  darkImage={component.imgLight}
                />
              ))}
              <h4 className="col-span-3 mt-2 text-lg font-medium leading-none">
                Services
              </h4>
              <Separator className="col-span-3" />
              {Object.values(integrations.services).map((component) => (
                <NavMenuListItem
                  key={component.name}
                  name={component.name}
                  href={component.href}
                  description={component.description}
                  lightImage={component.imgDark}
                  darkImage={component.imgLight}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LinkComponent href="https://docs.turboeth.xyz/overview">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span>Documentation</span>
            </NavigationMenuLink>
          </LinkComponent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface NavMenuListItemProps {
  name: string
  description: string
  href: string
  lightImage: string
  darkImage: string
}

const NavMenuListItem = ({
  name,
  description,
  href,
  lightImage,
  darkImage,
}: NavMenuListItemProps) => {
  return (
    <li key={name}>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center space-x-2">
            <LightDarkImage
              LightImage={lightImage}
              DarkImage={darkImage}
              alt="icon"
              height={24}
              width={24}
              className="h-6 w-6"
            />
            <span className="text-base font-medium leading-none">{name}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
