'use client'

import { Token } from '../uniswap-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TokenListProps {
  tokens: Token[]
}

export function TokenList({ tokens }: TokenListProps) {
  if (tokens.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tokens found
      </div>
    )
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Tokens by TVL</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Token</th>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-right py-3 px-4 font-medium">TVL</th>
                <th className="text-right py-3 px-4 font-medium">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{token.symbol}</td>
                  <td className="py-3 px-4">{token.name}</td>
                  <td className="text-right py-3 px-4">
                    ${Number(token.totalValueLockedUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td className="text-right py-3 px-4">
                    ${Number(token.volumeUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
