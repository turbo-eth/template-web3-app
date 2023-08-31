"use client"

import { setTimeout } from "timers"
import { useState } from "react"
import { motion } from "framer-motion"
import CopyToClipboard from "react-copy-to-clipboard"
import { useForm } from "react-hook-form"
import { FaCopy } from "react-icons/fa"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { useToast } from "@/lib/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { LinkComponent } from "@/components/shared/link-component"

import { useLitClient } from "../hooks/use-lit-client"
import { AccessControlConditions } from "../utils/types"
import {
  AccessControlSingleAddress,
  AccessControlSingleERC721,
  AccessControlTokenGroup,
} from "./access-control"

interface FormSchema {
  message: string
}

export function FormLitEncryptMessage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messageToEncrypt, setMessageToEncrypt] = useState<string>()
  const [encryptedMessageId, setEncryptedMessageId] = useState<string>()
  const [accessControlConditions, setAccessControlConditions] =
    useState<AccessControlConditions>([])
  const [accessControlType, setAccessControlType] = useState<string>()

  const { toast, dismiss } = useToast()
  const { encryptMessage } = useLitClient()
  const { register, handleSubmit } = useForm<FormSchema>()

  const isValid = messageToEncrypt && accessControlConditions.length > 0

  const onSubmit = async (data: { message: string }) => {
    setIsLoading(true)
    try {
      const encryptedMessage = await encryptMessage(
        data.message,
        accessControlConditions
      )
      setEncryptedMessageId(encryptedMessage.id)
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
  }

  const handleToast = () => {
    toast({
      title: "Message ID Copied",
      description:
        "The ID of the encrypted message has been copied to your clipboard.",
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  return (
    <div className="w-full">
      <IsWalletConnected>
        <div className="w-full">
          {encryptedMessageId ? (
            <motion.div
              animate="show"
              className="card mx-auto my-8 max-w-fit"
              initial="hidden"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <h4 className="mb-4">Share:</h4>
              <CopyToClipboard
                text={`${origin}/integration/lit-protocol/unseal?id=${encryptedMessageId}`}
              >
                <span
                  className="flex max-w-fit cursor-pointer items-center justify-between gap-2 rounded-lg bg-neutral-100 px-4 py-2 hover:bg-neutral-200 dark:bg-neutral-800"
                  onClick={handleToast}
                >
                  <p>{`${origin}/integration/lit-protocol/unseal?id=${encryptedMessageId}`}</p>
                  <span className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                    <FaCopy className="text-muted-foreground" />
                  </span>
                </span>
              </CopyToClipboard>
            </motion.div>
          ) : (
            <>
              <motion.div
                animate="show"
                className="card my-8"
                initial="hidden"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
              >
                <label>Select Access Control Conditions:</label>
                <Select
                  value={accessControlType}
                  onValueChange={setAccessControlType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="singleAddress">
                      Single Address
                    </SelectItem>
                    <SelectItem value="singleERC721">Single ERC721</SelectItem>
                    <SelectItem value="tokenGroup">Token Group</SelectItem>
                  </SelectContent>
                </Select>
                {accessControlType === "singleAddress" ? (
                  <AccessControlSingleAddress
                    accessControlConditions={accessControlConditions}
                    setAccessControlConditions={setAccessControlConditions}
                  />
                ) : accessControlType === "singleERC721" ? (
                  <AccessControlSingleERC721
                    accessControlConditions={accessControlConditions}
                    setAccessControlConditions={setAccessControlConditions}
                  />
                ) : accessControlType === "tokenGroup" ? (
                  <AccessControlTokenGroup
                    accessControlConditions={accessControlConditions}
                    setAccessControlConditions={setAccessControlConditions}
                  />
                ) : null}
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <h3 className="text-center">Access Control Condition</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    <LinkComponent
                      isExternal
                      className="font-bold"
                      href="https://developer.litprotocol.com/accessControl/conditionTypes/unifiedAccessControlConditions"
                    >
                      Access Control Conditions
                    </LinkComponent>{" "}
                    let you filter who can decrypt your message.
                  </p>
                </div>
              </motion.div>
              {accessControlConditions.length > 0 && (
                <motion.div
                  animate="show"
                  className="card my-8"
                  initial="hidden"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  <h4 className="mb-4">Selected Access Control Conditions:</h4>
                  <Textarea
                    className="h-80"
                    value={JSON.stringify(accessControlConditions, null, 2)}
                  />
                  <hr className="my-4" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-center">
                      Selected Access control condition
                    </h3>
                    <p className="text-center text-sm text-muted-foreground">
                      <LinkComponent
                        isExternal
                        className="font-bold"
                        href="https://lit-share-modal-v3-playground.netlify.app/"
                      >
                        Check this playground
                      </LinkComponent>{" "}
                      to create and compose conditions.
                    </p>
                  </div>
                </motion.div>
              )}
              <motion.div
                animate="show"
                className="card my-8"
                initial="hidden"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
              >
                <form
                  className="flex flex-col"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label className="mb-4">Message:</label>
                  <Textarea
                    {...register("message")}
                    className="h-40"
                    value={messageToEncrypt}
                    onChange={(e) => setMessageToEncrypt(e.target.value)}
                  />
                  <Button
                    variant="emerald"
                    className="mt-4"
                    disabled={!isValid || isLoading}
                    type="submit"
                  >
                    {isLoading ? "Loading..." : "Encrypt"}
                  </Button>
                </form>
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <h3 className="text-center">Message Encryption</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Select the Lit Protocol access control conditions and insert
                    your message.
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="flex items-center justify-center gap-10">
          <WalletConnect />
        </div>
      </IsWalletDisconnected>
    </div>
  )
}
