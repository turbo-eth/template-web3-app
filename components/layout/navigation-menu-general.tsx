'use client'

import * as React from 'react'

import Image from 'next/image'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { turboIntegrations } from '@/data/turbo-integrations'
import { cn } from '@/lib/utils'

import { BranchColorMode } from '../shared/branch-color-mode'
import { LinkComponent } from '../shared/link-component'

export function NavigationMenuGeneral() {
  return (
    <NavigationMenu className="self-center">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div className="relative flex h-full w-full select-none flex-col justify-end overflow-hidden rounded-md bg-gradient-to-b from-emerald-500 to-lime-700 p-6 no-underline outline-none focus:shadow-md">
                    <div className="absolute top-10 right-0 z-0 h-48 w-48 bg-[url('https://em-content.zobj.net/thumbs/240/twitter/322/high-voltage_26a1.png')] bg-cover opacity-20" />
                    <div className="z-10">
                      <h3 className="z-10 mb-2 mt-4 text-lg font-medium text-white">
                        <span className="text-4xl">⚡️</span>
                        <br />
                        Build in Turbo Mode
                      </h3>
                      <p className="mb-3 text-sm leading-tight text-white/90">
                        TurboETH is a Web3 App Template built using Next.js, RainbowKit, SIWE, Disco, and more!
                      </p>
                      <p className="text-sm font-bold leading-tight text-white/90">#TurboETH</p>
                    </div>
                  </div>
                </NavigationMenuLink>
              </li>
              <li className="flex flex-col gap-4">
                <LinkComponent href="/dashboard">
                  <div className="card bg-card-with-hover">
                    <h3 className="text-lg font-bold">🎛️ Dashboard</h3>
                    <div className="my-2" />
                    <p className="text-xs">
                      The TurboETH Dashboard is a great place to start. It&apos;s where you can see your app&apos;s features, and get started.
                    </p>
                  </div>
                </LinkComponent>
                <LinkComponent href="/dashboard">
                  <div className="card bg-card-with-hover">
                    <h3 className="text-lg font-bold">🔐 Admin</h3>
                    <div className="my-2" />
                    <p className="text-xs">The TurboETH Admin area is where you can see your app&apos;s users.</p>
                  </div>
                </LinkComponent>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
              {Object.values(turboIntegrations).map((component) => (
                <ListItem key={component.name} title={component.name} {...component}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = ({ className, name, imgLight, imgDark, children, ...props }: any) => {
  return (
    <li key={name}>
      <NavigationMenuLink asChild>
        <LinkComponent
          href={props.href as string}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700',
            className
          )}
          {...props}>
          <BranchColorMode>
            <Image className="mb-3 h-7 w-7 rounded-full" alt="Etherscan logo" src={imgDark} width={100} height={100} />
            <Image className="mb-3 h-7 w-7 rounded-full" alt="Etherscan logo" src={imgLight} width={100} height={100} />
          </BranchColorMode>
          <div className="text-sm font-medium leading-none">{name}</div>
          <p className="text-sm leading-snug text-slate-500 line-clamp-2 dark:text-slate-400">{children}</p>
        </LinkComponent>
      </NavigationMenuLink>
    </li>
  )
}
ListItem.displayName = 'ListItem'
