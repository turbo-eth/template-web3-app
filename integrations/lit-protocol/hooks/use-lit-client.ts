import * as LitJsSdk from "@lit-protocol/lit-node-client"
import { LitProtocolMessage } from "@prisma/client"
import { useAccount, useNetwork, useSignMessage } from "wagmi"

import { siweMessage } from "@/integrations/siwe/actions/siwe-message"

import litClient from "../client"
import { blobToString } from "../utils/data-types"
import { AccessControlConditions } from "../utils/types"

export const useLitClient = () => {
  const { signMessageAsync } = useSignMessage()
  const { address } = useAccount()
  const { chain } = useNetwork()

  /**
   * Get auth signature using siwe
   * @returns Promise that resolves to the signature
   */
  const signAuthMessage = async () => {
    if (!address || !chain?.id) throw new Error("Wallet not connected")

    const { messageToSign, signature } = await siweMessage({
      address,
      chainId: chain.id,
      signMessageAsync,
    })
    const signAuthMessage = {
      sig: signature,
      derivedVia: "web3.eth.personal.sign",
      signedMessage: messageToSign,
      address,
    }
    return signAuthMessage
  }

  /**
   * Encrypt a message using Lit Protocol
   * @param messageToEncrypt
   * @param accessControlConditions
   * @returns Promise that resolves to the encrypted message and database id
   * @throws Error if the wallet is not connected
   * @throws Error if the message cannot be encrypted
   */
  const encryptMessage = async (
    messageToEncrypt: string,
    accessControlConditions: AccessControlConditions
  ) => {
    if (!address || !chain?.id) throw new Error("Wallet not connected")
    await litClient.connect()

    // Get auth signature using SIWE
    const authSig = await signAuthMessage()

    // Encrypt message into an encripted blob and a symmetric key
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      messageToEncrypt
    )

    // Save symmetric key and access control conditions to Lit Protocol
    // This will return an encrypted symmetric key in Uint8Array format
    const encryptedSymmetricKey = await litClient.saveEncryptionKey({
      accessControlConditions: accessControlConditions as any,
      symmetricKey,
      authSig,
      chain: "ethereum",
    })

    // Convert encrypted symmetric key from Uint8Array  to a string
    const encryptedSymmetricKeyString = LitJsSdk.uint8arrayToString(
      encryptedSymmetricKey,
      "base16"
    )

    if (typeof encryptedSymmetricKeyString !== "string")
      throw new Error("Encrypted symmetric key is not a string")

    // Store encrypted message, encrypted symmetric key and access control conditions into the database
    const litProtocolMessage: LitProtocolMessage = await fetch(
      "/api/lit-protocol/encrypt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          encryptedString: await blobToString(encryptedString),
          accessControlConditions,
          encryptedSymmetricKeyString,
        }),
      }
    ).then((res) => res.json())

    if (!litProtocolMessage)
      throw new Error("Could not save message to database")

    return {
      id: litProtocolMessage.id,
      encryptedString,
      encryptedSymmetricKey: encryptedSymmetricKeyString,
    }
  }

  /**
   * Decrypt a message using Lit Protocol given the database id
   * @param id
   * @returns Promise that resolves to the decrypted message or an error message
   * @throws Error if the message cannot be decrypted
   * @throws Error if the wallet is not connected
   */
  const decryptMessage = async (id: string) => {
    if (!address || !chain?.id) throw new Error("Wallet not connected")
    await litClient.connect()

    // Get encrypted message, encrypted symmetric key and access control conditions from the database using the id
    let response: {
      encryptedString: string
      metadata: {
        encryptedSymmetricKey: string
        accessControlConditions: AccessControlConditions[]
      }
    }

    try {
      response = await fetch(`/api/lit-protocol/${id}`).then((res) =>
        res.json()
      )
    } catch (e) {
      return { error: "Message not found" }
    }
    const { encryptedString, metadata } = response

    const encryptedStringBlob = await fetch(encryptedString).then((res) =>
      res.blob()
    )

    // Get auth signature using SIWE
    const authSig = await signAuthMessage()

    let _symmetricKey
    try {
      // Retrieve the symmetric encryption key from the LIT nodes.
      // This will only work if the access control conditions are met
      _symmetricKey = await litClient.getEncryptionKey({
        accessControlConditions: metadata.accessControlConditions as any,
        toDecrypt: metadata.encryptedSymmetricKey,
        chain: "ethereum",
        authSig,
      })
    } catch (e) {
      return { error: "Access denied" }
    }

    let decryptedString

    try {
      // Decrypt the message using the symmetric key
      decryptedString = await LitJsSdk.decryptString(
        encryptedStringBlob,
        _symmetricKey
      )
    } catch (e) {
      return { error: "Failed to decrypt message" }
    }

    return { decryptedString }
  }

  return { encryptMessage, decryptMessage }
}
