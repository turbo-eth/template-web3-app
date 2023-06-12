'use client'
import { setTimeout } from 'timers'

import { useState } from 'react'

import { motion } from 'framer-motion'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useForm } from 'react-hook-form'
import { FaCopy } from 'react-icons/fa'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { useToast } from '@/lib/hooks/use-toast'

import { AccessControlSingleAddress, AccessControlSingleERC721, AccessControlTokenGroup } from './access-control'
import { useLitClient } from '../hooks/use-lit-client'

export function FormLitEncryptMessage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messageToEncrypt, setMessageToEncrypt] = useState<string>()
  const [encryptedMessageId, setEncryptedMessageId] = useState<string>()
  const [accessControlConditions, setAccessControlConditions] = useState<any[]>([])
  const [accessControlType, setAccessControlType] = useState<string>()

  const { toast, dismiss } = useToast()
  const { encryptMessage } = useLitClient()
  const { register, handleSubmit } = useForm()

  const isValid = messageToEncrypt && accessControlConditions.length > 0

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const encryptedMessage = await encryptMessage(data.message, accessControlConditions)
      setEncryptedMessageId(encryptedMessage.id)
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
  }

  const handleToast = () => {
    toast({
      title: 'Message ID Copied',
      description: 'The ID of the encrypted message has been copied to your clipboard.',
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  return (
    <div className="w-full">
      <BranchIsWalletConnected>
        <div className="w-full">
          {encryptedMessageId ? (
            <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} initial="hidden" animate="show" className="card my-8 mx-auto max-w-fit">
              <h4 className="mb-4">Share:</h4>
              <CopyToClipboard text={`${origin}/integration/lit-protocol/unseal?id=${encryptedMessageId}`}>
                <span
                  onClick={handleToast}
                  className="flex max-w-fit cursor-pointer items-center justify-between gap-2 rounded-lg bg-neutral-100 px-4 py-2 hover:bg-neutral-200 dark:bg-neutral-800">
                  <p>{`${origin}/integration/lit-protocol/unseal?id=${encryptedMessageId}`}</p>
                  <span className="flex-center flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                    <FaCopy className=" text-neutral-600 dark:text-neutral-100" />
                  </span>
                </span>
              </CopyToClipboard>
            </motion.div>
          ) : (
            <>
              <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} initial="hidden" animate="show" className="card my-8">
                <label>Select Access Control Conditions:</label>
                <Select value={accessControlType} onValueChange={setAccessControlType}>
                  <SelectTrigger className="input mt-4 text-gray-600 placeholder:text-neutral-400 dark:text-gray-600 dark:placeholder:text-neutral-400">
                    <SelectValue placeholder="Select Condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-white">
                    <SelectItem value="singleAddress">Single Address</SelectItem>
                    <SelectItem value="singleERC721">Single ERC721</SelectItem>
                    <SelectItem value="tokenGroup">Token Group</SelectItem>
                  </SelectContent>
                </Select>
                {accessControlType === 'singleAddress' ? (
                  <AccessControlSingleAddress
                    accessControlConditions={accessControlConditions}
                    setAccessControlConditions={setAccessControlConditions}
                  />
                ) : accessControlType === 'singleERC721' ? (
                  <AccessControlSingleERC721
                    accessControlConditions={accessControlConditions}
                    setAccessControlConditions={setAccessControlConditions}
                  />
                ) : accessControlType === 'tokenGroup' ? (
                  <AccessControlTokenGroup
                    accessControlConditions={accessControlConditions}
                    setAccessControlConditions={setAccessControlConditions}
                  />
                ) : null}
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <h3 className="text-center">Access Control Condition</h3>
                  <p className="text-center text-sm text-gray-500">
                    <LinkComponent
                      isExternal
                      className="font-bold"
                      href="https://developer.litprotocol.com/accessControl/conditionTypes/unifiedAccessControlConditions">
                      Access Control Conditions
                    </LinkComponent>{' '}
                    let you filter who can decrypt your message.
                  </p>
                </div>
              </motion.div>
              {accessControlConditions.length > 0 && (
                <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} initial="hidden" animate="show" className="card my-8">
                  <h4 className="mb-4">Selected Access Control Conditions:</h4>
                  <Textarea
                    value={JSON.stringify(accessControlConditions, null, 2)}
                    className="input h-80 dark:text-gray-600 dark:placeholder:text-neutral-400"
                  />
                  <hr className="my-4" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-center">Selected Access control condition</h3>
                    <p className="text-center text-sm text-gray-500">
                      <LinkComponent isExternal className="font-bold" href="https://lit-share-modal-v3-playground.netlify.app/">
                        Check this playground
                      </LinkComponent>{' '}
                      to create and compose conditions.
                    </p>
                  </div>
                </motion.div>
              )}
              <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} initial="hidden" animate="show" className="card my-8">
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                  <label className="mb-4">Message:</label>
                  <Textarea
                    {...register('message')}
                    value={messageToEncrypt}
                    className="input h-40 dark:text-gray-600 dark:placeholder:text-neutral-400"
                    onChange={(e) => setMessageToEncrypt(e.target.value)}
                  />
                  <button disabled={!isValid || isLoading} type="submit" className="btn btn-emerald mt-4">
                    {isLoading ? 'Loading...' : 'Encrypt'}
                  </button>
                </form>
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <h3 className="text-center">Message Encryption</h3>
                  <p className="text-center text-sm text-gray-500">Select the Lit Protocol access control conditions and insert your message.</p>
                </div>
              </motion.div>
            </>
          )}
        </div>
        <div className="flex items-center justify-center gap-10">
          <WalletConnect />
        </div>
      </BranchIsWalletConnected>
    </div>
  )
}
