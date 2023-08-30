import { useEffect, useState } from "react"
import { SubscribeOptionsType } from "@pushprotocol/restapi/src/lib/channels"
import { ImSpinner2 } from "react-icons/im"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"

import { useEthersSigner } from "@/lib/hooks/web3/use-ethers-signer"

import { ENV } from ".."
import { useSubscribe, useUserSubscriptions } from "../hooks"
import { useUnsubscribe } from "../hooks/use-unsubscribe-channel"
import { pushEnvToChainId } from "../utils/helpers"

export type SubscribeButtonProps = {
  channelAddress: string
  env: ENV
  onSubscribe?: () => void
  onUnsubscribe?: () => void
}

export function SubscribeButton({
  channelAddress,
  env,
  onSubscribe,
  onUnsubscribe,
}: SubscribeButtonProps) {
  const [userIsSubscribed, setUserIsSubscribed] = useState(false)

  const channelChainId = pushEnvToChainId(env)

  const { address } = useAccount()
  const { chain } = useNetwork()
  const signer = useEthersSigner()
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: channelChainId,
  })

  const { isLoading: subLoading, mutateAsync: subscribe } = useSubscribe()
  const { isLoading: unsubLoading, mutateAsync: unsubscribe } = useUnsubscribe()

  const { data: userSubscriptions, isLoading: userSubsIsLoading } =
    useUserSubscriptions({
      user: address as string,
      env,
    })

  useEffect(() => {
    if (!address || !userSubscriptions) {
      setUserIsSubscribed(false)
      return
    }

    setUserIsSubscribed(
      userSubscriptions
        .map((channel) => channel.channel.toLowerCase())
        .includes(channelAddress.toLowerCase())
    )
  }, [userSubscriptions])

  const toggleSubscribe = async () => {
    if (!signer || !address) return

    if (channelChainId !== chain?.id) {
      await switchNetworkAsync?.()
    }

    const args: SubscribeOptionsType = {
      signer,
      userAddress: address,
      channelAddress: channelAddress,
      env: env,
    }

    return (userIsSubscribed ? unsubscribe(args) : subscribe(args)).then(
      (res) => {
        if (res.status === "error") return

        const isSubscribed = !userIsSubscribed
        setUserIsSubscribed(isSubscribed)
        isSubscribed ? onSubscribe?.() : onUnsubscribe?.()
      }
    )
  }

  const buttonIsLoading = userSubsIsLoading || subLoading || unsubLoading

  return userIsSubscribed ? (
    <button
      className="rounded-md border-2 border-pink-600 px-3 py-1 text-sm font-semibold text-inherit shadow focus:outline-none md:py-2 md:px-3"
      disabled={buttonIsLoading}
      onClick={() => toggleSubscribe()}
    >
      {buttonIsLoading ? (
        <ImSpinner2 className="animate-spin" size={20} />
      ) : (
        "Unsubscribe"
      )}
    </button>
  ) : (
    <button
      className="rounded-md border-2 border-pink-600 bg-pink-600 px-3 py-1 text-sm font-semibold text-white shadow focus:outline-none md:py-2 md:px-3"
      disabled={buttonIsLoading}
      onClick={() => toggleSubscribe()}
    >
      {buttonIsLoading ? (
        <ImSpinner2 className="animate-spin" size={20} />
      ) : (
        "Subscribe"
      )}
    </button>
  )
}
