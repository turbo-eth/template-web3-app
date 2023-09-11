"use client"

import { useState } from "react"
import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { ApiNotificationType } from "@pushprotocol/restapi"
import { LuBook } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { PageSection } from "@/components/layout/page-section"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import {
  ChannelCard,
  ChannelSearch,
  ENV,
  getMockedNotification,
  NotificationBell,
} from "@/integrations/push-protocol"
import { PUSH_CHANNEL_ADDRESS } from "@/integrations/push-protocol/utils/constants"

export default function PushProtocolPage() {
  const [mockedNotifications, setMockedNotifications] = useState<
    ApiNotificationType[]
  >([])

  const [channelAddress, setChannelAddress] = useState(PUSH_CHANNEL_ADDRESS)
  const [env, setEnv] = useState(ENV.STAGING)

  // Shows mock notificatins in inbox after subscribing if there is no notifications to show.
  const handleSubscribe = () => {
    const mockedNotification = getMockedNotification({ env })
    setMockedNotifications([mockedNotification])
  }

  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.push_protocol.imgDark}
          DarkImage={turboIntegrations.push_protocol.imgLight}
          alt="Push Protocol Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Push Protocol</PageHeaderHeading>
        <PageHeaderDescription>
          Push Protocol is a web3 communication network, enabling cross-chain
          notifications and messaging for dapps, wallets, and services.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.push_protocol.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection>
        <IsWalletDisconnected>
          <WalletConnect />
        </IsWalletDisconnected>
        <IsWalletConnected>
          <div className="mb-5 flex w-full">
            <div className="mx-auto">
              <NotificationBell
                env={ENV.STAGING}
                mockedNotifications={mockedNotifications}
              />
            </div>
          </div>
          <div className="mb-6 w-full">
            <Card>
              <CardContent>
                <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  <div className="grow">
                    <Input
                      defaultValue={channelAddress}
                      placeholder="Enter Channel Address"
                      onChange={(e) => setChannelAddress(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-56">
                    <Select
                      value={env}
                      onValueChange={(value) => setEnv(value as ENV)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            env === ENV.STAGING ? "Goerli" : "Mainnet"
                          }
                        >
                          {env === ENV.STAGING ? "Goerli" : "Mainnet"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ENV.STAGING}>Goerli</SelectItem>
                        <SelectItem value={ENV.PROD}>Mainnet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex w-full flex-col space-y-4  lg:flex-row lg:space-x-4 lg:space-y-0">
                  <div className="grow">
                    <ChannelCard
                      channelAddress={channelAddress}
                      env={env}
                      onSubscribe={() => handleSubscribe()}
                    />
                  </div>
                </div>
              </CardContent>
              <Separator className="my-4" />
              <CardFooter className="justify-between">
                <h3 className="text-center">Channel Preview</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Preview and subscribe channel
                </p>
              </CardFooter>
            </Card>
          </div>
          <div className="mb-3 w-full">
            <Card>
              <CardContent>
                <ChannelSearch />
              </CardContent>
              <Separator className="my-4" />
              <CardFooter className="justify-between">
                <h3 className="text-center">Search Channels</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Search for PUSH channels
                </p>
              </CardFooter>
            </Card>
          </div>
        </IsWalletConnected>
      </PageSection>
    </div>
  )
}
