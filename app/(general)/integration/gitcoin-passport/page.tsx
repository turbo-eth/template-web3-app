'use client'
import { useState } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ScoreGate } from '@/integrations/gitcoin-passport/components/score-gate'
import { ScoreStamp } from '@/integrations/gitcoin-passport/components/score-stamp'
import { PaginatedStampCredentialResponse } from '@/integrations/gitcoin-passport/utils/types'

export default function PageIntegration() {
  const [apiKey, setApiKey] = useState<string>('')
  const [scorerId, setScorerId] = useState<string>('')
  const [stamps, setStamps] = useState<PaginatedStampCredentialResponse | null>(null)
  const [score, setScore] = useState<number | null>(null)

  return (
    <>
      <div className="flex-center flex w-full flex-1 flex-col items-center justify-center text-center">
        <motion.div
          animate="show"
          className="max-w-3xl px-5 text-center xl:px-0"
          initial="hidden"
          viewport={{ once: true }}
          whileInView="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}>
          <IsLightTheme>
            <Image alt="Gitcoin Passport logo" className="mx-auto" height={100} src={turboIntegrations.gitcoinPassport.imgDark} width={100} />
          </IsLightTheme>
          <IsDarkTheme>
            <Image alt="Gitcoin Passport logo" className="mx-auto" height={100} src={turboIntegrations.gitcoinPassport.imgLight} width={100} />
          </IsDarkTheme>
          <motion.h1
            className="text-gradient-sand text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            Gitcoin Passport
          </motion.h1>
          <motion.p className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer>{turboIntegrations.gitcoinPassport.description}</Balancer>
          </motion.p>
          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal className="btn btn-primary" href={turboIntegrations.gitcoinPassport.url}>
              Documentation
            </LinkComponent>
          </motion.div>
        </motion.div>

        <div className="w-full max-w-screen-lg lg:mt-10">
          <IsWalletConnected>
            <div className="card">
              {/* <div className="flex w-full items-center">
                <label className="mx-2 w-full text-left">
                  Gitcoin API Key
                  <input
                    required
                    className="input mt-2"
                    placeholder="Enter API key"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </label>
                <label className="ml-2 w-full text-left">
                  Scorer Id
                  <input
                    required
                    className="input mt-2"
                    placeholder="Enter Scorer Id"
                    type="text"
                    value={scorerId}
                    onChange={(e) => setScorerId(e.target.value)}
                  />
                </label>
              </div> */}
              <div className="flex w-full items-center justify-center">
                <ScoreGate setScore={setScore} />
                <ScoreStamp setStamps={setStamps} />
              </div>
              <div className="mt-4 w-full text-center">
                {score !== null && (
                  <p>
                    Your score is <strong>{score}</strong>
                  </p>
                )}
              </div>
              <div className="mt-4 grid w-full grid-cols-6 gap-4 text-center">
                {stamps !== null &&
                  stamps.items.map((stamp) => (
                    <div key={stamp.metadata.hash} className="card flex flex-col items-center">
                      <img alt={stamp.metadata.name} className="h-10 w-10" src={stamp.metadata.platform.icon} />
                      <p className="mt-4">{stamp.metadata.platform.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </IsWalletConnected>
          <IsWalletDisconnected>
            <WalletConnect className="mx-auto inline-block" />
          </IsWalletDisconnected>
        </div>
      </div>
    </>
  )
}
