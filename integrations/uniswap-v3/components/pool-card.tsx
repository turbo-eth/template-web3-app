'use client'

import { Pool, getCurrentPrice, getFeeTierLabel } from '../uniswap-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PoolCardProps {
  pool: Pool
}

export function PoolCard({ pool }: PoolCardProps) {
  const price = getCurrentPrice(pool)
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          {pool.token0.symbol} / {pool.token1.symbol}
        </CardTitle>
        <Badge variant="secondary">{getFeeTierLabel(pool.feeTier)}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">
              {Number(price).toLocaleString(undefined, { maximumFractionDigits: 6 })} {pool.token1.symbol}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">TVL</p>
            <p className="text-lg font-semibold">
              ${Number(pool.totalValueLockedUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Volume (24h)</p>
            <p className="text-lg font-semibold">
              ${Number(pool.volumeUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Liquidity</p>
            <p className="text-lg font-semibold">
              {Number(pool.liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface PoolListProps {
  pools: Pool[]
}

export function PoolList({ pools }: PoolListProps) {
  if (pools.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No pools found
      </div>
    )
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pools.map((pool) => (
        <PoolCard key={pool.id} pool={pool} />
      ))}
    </div>
  )
}
