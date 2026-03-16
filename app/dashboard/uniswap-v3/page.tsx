'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { PoolList, usePools, useTopTokens } from '@/integrations/uniswap-v3'
import { TokenList } from '@/integrations/uniswap-v3/components/token-list'

export default function PageUniswapV3() {
  const [selectedTab, setSelectedTab] = useState('pools')

  // Default ETH/USDC pool addresses (Uniswap V3 mainnet)
  const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'.toLowerCase()
  const USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'.toLowerCase()

  const { data: pools, isLoading: poolsLoading } = usePools(ETH_ADDRESS, USDC_ADDRESS)
  const { data: tokens, isLoading: tokensLoading } = useTopTokens(20)

  return (
    <motion.div
      className="container mx-auto py-6"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Uniswap V3</h1>
        <p className="text-muted-foreground mt-2">Explore Uniswap V3 pools and tokens on Ethereum mainnet</p>
      </div>

      <Tabs defaultValue="pools" className="w-full" onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="pools">Pools</TabsTrigger>
          <TabsTrigger value="tokens">Top Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="pools">
          <Card>
            <CardHeader>
              <CardTitle>Uniswap V3 Pools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">Viewing ETH/USDC pools on Ethereum mainnet</p>
              {poolsLoading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-48 w-full" />
                  ))}
                </div>
              ) : pools && pools.length > 0 ? (
                <PoolList pools={pools} />
              ) : (
                <div className="text-muted-foreground py-8 text-center">No pools found. The subgraph may be temporarily unavailable.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens">
          {tokensLoading ? (
            <Skeleton className="h-96 w-full" />
          ) : tokens && tokens.length > 0 ? (
            <TokenList tokens={tokens} />
          ) : (
            <div className="text-muted-foreground py-8 text-center">No tokens found. The subgraph may be temporarily unavailable.</div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
