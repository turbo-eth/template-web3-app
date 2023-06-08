import Dexie, { Table } from 'dexie'
import type { Address } from 'wagmi'

export interface SessionKey {
  id: string
  address: Address
  privateKey: Address
}

/**
 *  SessionKeysDB is a class that extends Dexie and is used to create a database
 * that stores session keys. The database is called 'sessionKey' and has a
 * single table called 'sessionKey'. The table has three fields: id, address and
 * privateKey.
 * @example
 * const db = new SessionKeysDB()
 *
 */
export class SessionKeysDB extends Dexie {
  sessionKey!: Table<SessionKey>

  constructor() {
    super('sessionKey')
    this.version(1).stores({
      sessionKey: 'id, address, privateKey',
    })
  }
}
