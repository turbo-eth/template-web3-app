import { useLiveQuery } from "dexie-react-hooks"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import type { Address } from "wagmi"

import { SessionKeysDB } from "../database"

export const db = new SessionKeysDB()

/**
 * React hook to get session keys from IndexedDB
 * @returns sessionKeys - Array of session keys
 * @returns createSessionKey - Function to create a session key and save it to IndexedDB
 * @returns deleteSessionKey - Function to delete a session key from IndexedDB
 * @returns deleteAllSessionKeys - Function to delete all session keys from IndexedDB
 * @returns getSessionAccount - Function to get a viem account from a session key in IndexedDB
 */
export const useSessionKeys = () => {
  /**
   * Array of session keys from IndexedDB using Dexie's live query.
   * Any changes to the session keys on indexedDB will be reflected in the sessionKeys array automatically.
   *  https://dexie.org/docs/liveQuery()
   */
  const sessionKeys = useLiveQuery(() => db.sessionKey.toArray(), [])

  /**
   * Gets a session private key from indexedDB
   * @param id - The id of the session key database entry
   * @returns sessionKey - The stored session key object
   */
  const getStoredSessionKey = async (id: string) => {
    const storedSessionKey = await db.sessionKey.get(id)
    return storedSessionKey
  }

  /**
   * Checks if a session private key is valid
   * @param privateKey - The session private key
   * @returns object - Object with a boolean success and an error if the session key is not valid or the viem account if it is valid
   * @throws Error - If the session key is not a valid private key
   * @example
   * isValidSessionKey('0x12343') // false
   * isValidSessionKey('0x1234567890123456789012345678901234567890123456789012345678901234') // true
   * */
  const isValidPrivateKey = (privateKey: Address) => {
    try {
      const account = privateKeyToAccount(privateKey)
      return { success: true, account }
    } catch (error) {
      return { success: false, error }
    }
  }

  /**
   * Saves a session key to indexedDB using an optional id and the given Ethereum address and private key.
   * If id is not provided, the address will be used as the id of the indexedDB entry.
   * @param id - The id of the session key database entry (optional)
   * @param privateKey - The session private key
   * @returns void
   * @throws Error - If the session key is already saved
   * @throws Error - If the session key is not a valid private key
   *  */
  const saveSessionKey = async ({
    id,
    privateKey,
  }: {
    id?: string
    privateKey: Address
  }) => {
    const { address } = privateKeyToAccount(privateKey)
    const storedSessionKey = await getStoredSessionKey(address)
    const entryId = id ?? address

    if (!!storedSessionKey) {
      throw new Error("Session key already exists")
    }

    if (isValidPrivateKey(privateKey).success) {
      await db.sessionKey.add({
        id: entryId,
        address,
        privateKey,
      })
    } else {
      throw new Error("Invalid private key")
    }
    return { address, privateKey }
  }

  /**
   * Creates a session key and saves it to indexedDB
   * If id is not provided, the address will be used as the id of the indexedDB entry.
   * @param id - The id of the session key database entry (optional)
   * @returns sessionKey - Object with the session's address and private key
   * @throws Error - If the session key is already saved
   * @throws Error - If the session key is not a valid private key
   * */
  const createSessionKey = (id?: string) => {
    const privateKey = generatePrivateKey()
    return saveSessionKey({ id, privateKey })
  }

  /**
   * Deletes a session key from IndexedDB using the id of the session key.
   * @param id - The id of the session key
   * @returns void
   * @throws Error - If the session key does not exist
   * @throws Error - If the session key is not a valid private key
   *  */
  const deleteSessionKey = async (id: string) => {
    const storedSessionKey = await getStoredSessionKey(id)
    if (!storedSessionKey) {
      throw new Error("Session key does not exist")
    }
    if (isValidPrivateKey(storedSessionKey.privateKey).success) {
      await db.sessionKey.delete(id)
    }
  }

  /**
   * Deletes all session keys from IndexedDB.
   * @returns void
   * */
  const deleteAllSessionKeys = async () => {
    await db.sessionKey.clear()
  }

  /**
   * Gets a session account from indexedDB
   * @param id - The id of the session key
   * @returns account - The viem account of the session key
   * @throws Error - If the session key does not exist
   * @throws Error - If the session key is not a valid private key
   * */
  const getSessionAccount = async (id: string) => {
    const storedSessionKey = await getStoredSessionKey(id)
    if (!storedSessionKey) {
      throw new Error("Session key does not exist")
    }
    return isValidPrivateKey(storedSessionKey.privateKey).account
  }

  return {
    sessionKeys,
    createSessionKey,
    deleteSessionKey,
    deleteAllSessionKeys,
    getSessionAccount,
  }
}
