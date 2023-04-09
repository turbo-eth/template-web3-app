import Dexie, { Table } from 'dexie'

export interface SessionKey {
  address: `0x${string}`
  privateKey: `0x${string}`
}

/**
 *  SessionKeysDB is a class that extends Dexie and is used to create a database
 * that stores session keys. The database is called 'sessionKey' and has a
 * single table called 'sessionKey'. The table has two fields: address and
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
      sessionKey: 'address, privateKey',
    })
  }
}
