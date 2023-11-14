'use client'
import * as React from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'

interface WalletConnectCustomProps {
  className?: string
  classNameConnect?: string
  classNameConnected?: string
  classNameWrongNetwork?: string
  labelConnect?: string
  labelWrongNetwork?: string
}

export const WalletConnectCustom = ({
  className,
  classNameConnect = 'btn btn-primary w-full',
  classNameConnected = 'btn btn-primary w-full',
  classNameWrongNetwork = 'btn btn-red w-full',
  labelConnect = 'Connect Wallet',
  labelWrongNetwork = 'Wrong Network',
}: WalletConnectCustomProps) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, authenticationStatus }) => {
        const connected = account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div className={className}>
            {(() => {
              if (!connected) {
                return (
                  <>
                    <button className={classNameConnect} onClick={openConnectModal} type="button">
                      {labelConnect}
                    </button>
                  </>
                )
              }

              if (chain.unsupported) {
                return (
                  <button className={classNameWrongNetwork} onClick={openChainModal} type="button">
                    {labelWrongNetwork}
                  </button>
                )
              }

              return (
                <div className="">
                  <button className={classNameConnected} onClick={openChainModal} style={{ display: 'flex', alignItems: 'center' }} type="button">
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}>
                        {chain.iconUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 18, height: 18 }} />
                        )}
                      </div>
                    )}
                    <span className="ml-1 text-lg lowercase">{chain.name}</span>
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default WalletConnectCustom
