import { useLiveQuery } from 'dexie-react-hooks'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

import { SessionKeysDB } from '../database'

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
   * @param address - The address of the session key
   * @returns sessionKey - The stored session key object
   */
  const getStoredSessionKey = async (address: `0x${string}`) => {
    const storedSessionKey = await db.sessionKey.get(address)
    return storedSessionKey
  }

  /**
   * Checks if a session private key is valid
   * @param sessionKey - The session private key
   * @returns object - Object with a boolean success and an error if the session key is not valid or the viem account if it is valid
   * @throws Error - If the session key is not a valid private key
   * @example
   * isValidSessionKey('0x12343') // false
   * isValidSessionKey('0x1234567890123456789012345678901234567890123456789012345678901234') // true
   * */
  const isValidPrivateKey = (sessionKey: `0x${string}`) => {
    try {
      const account = privateKeyToAccount(sessionKey)
      return { success: true, account }
    } catch (error) {
      return { success: false, error }
    }
  }

  /**
   * Saves a session key to indexedDB
   * @param sessionKey - The session private key
   * @returns void
   * @throws Error - If the session key is already saved
   * @throws Error - If the session key is not a valid private key
   *  */
  const saveSessionKey = async (privateKey: `0x${string}`) => {
    const account = privateKeyToAccount(privateKey)
    const storedSessionKey = await getStoredSessionKey(account.address)

    if (!!storedSessionKey) {
      throw new Error('Session key already exists')
    }

    if (isValidPrivateKey(privateKey).success) {
      await db.sessionKey.add({
        address: account.address,
        privateKey,
      })
    } else {
      throw new Error('Invalid private key')
    }
    return { address: account.address, privateKey }
  }

  /**
   * Creates a session key and saves it to indexedDB
   * Should return an object with address and privateKey
   * @returns sessionKey - Object with the session's address and private key
   * @throws Error - If the session key is already saved
   * @throws Error - If the session key is not a valid private key
   * */
  const createSessionKey = () => {
    const sessionKey = generatePrivateKey()
    return saveSessionKey(sessionKey)
  }

  /**
   * Deletes a session key from IndexedDB using the given Ethereum address.
   * @param address - The address of the session key
   * @returns void
   * @throws Error - If the session key does not exist
   * @throws Error - If the session key is not a valid private key
   *  */
  const deleteSessionKey = async (address: `0x${string}`) => {
    const storedSessionKey = await getStoredSessionKey(address)
    if (!storedSessionKey) {
      throw new Error('Session key does not exist')
    }
    if (isValidPrivateKey(storedSessionKey.privateKey).success) {
      await db.sessionKey.delete(address)
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
   * @param address - The address of the session key
   * @returns account - The viem account of the session key
   * @throws Error - If the session key does not exist
   * @throws Error - If the session key is not a valid private key
   * */
  const getSessionAccount = async (address: `0x${string}`) => {
    const storedSessionKey = await getStoredSessionKey(address)
    if (!storedSessionKey) {
      throw new Error('Session key does not exist')
    }
    return isValidPrivateKey(storedSessionKey.privateKey).account
  }

  return { sessionKeys, createSessionKey, deleteSessionKey, deleteAllSessionKeys, getSessionAccount }
}
