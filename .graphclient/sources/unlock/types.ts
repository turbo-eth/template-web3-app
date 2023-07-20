// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace UnlockTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Key = {
  /** Unique identifier for a key (combination of lock address and token id) */
  id: Scalars['ID'];
  /** In the Unlock ecosystem, a “Lock” is a smart contract that creates (or “mints”) NFTs */
  lock: Lock;
  /** TokenId for a given key */
  tokenId: Scalars['BigInt'];
  /** The address of the key owner */
  owner: Scalars['Bytes'];
  /** An assigned title set on an Unlock key which gives a specific wallet address authorization to transfer, share or cancel */
  manager?: Maybe<Scalars['Bytes']>;
  /** Time the key expires */
  expiration: Scalars['BigInt'];
  /** The tokenURI on an NFT is a unique identifier */
  tokenURI?: Maybe<Scalars['String']>;
  /** Block key was created */
  createdAtBlock: Scalars['BigInt'];
  /** Timestamp of the block in which the key was created */
  createdAt: Scalars['BigInt'];
  /** Invoked by a Lock manager to expire the user's key and perform a refund and cancellation of the key */
  cancelled?: Maybe<Scalars['Boolean']>;
  /** list of transaction hashes for purchase/extensions of a specific token */
  transactionsHash?: Maybe<Array<Scalars['String']>>;
};

export type Key_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lock?: InputMaybe<Scalars['String']>;
  lock_not?: InputMaybe<Scalars['String']>;
  lock_gt?: InputMaybe<Scalars['String']>;
  lock_lt?: InputMaybe<Scalars['String']>;
  lock_gte?: InputMaybe<Scalars['String']>;
  lock_lte?: InputMaybe<Scalars['String']>;
  lock_in?: InputMaybe<Array<Scalars['String']>>;
  lock_not_in?: InputMaybe<Array<Scalars['String']>>;
  lock_contains?: InputMaybe<Scalars['String']>;
  lock_contains_nocase?: InputMaybe<Scalars['String']>;
  lock_not_contains?: InputMaybe<Scalars['String']>;
  lock_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lock_starts_with?: InputMaybe<Scalars['String']>;
  lock_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lock_not_starts_with?: InputMaybe<Scalars['String']>;
  lock_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lock_ends_with?: InputMaybe<Scalars['String']>;
  lock_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lock_not_ends_with?: InputMaybe<Scalars['String']>;
  lock_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lock_?: InputMaybe<Lock_filter>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  manager?: InputMaybe<Scalars['Bytes']>;
  manager_not?: InputMaybe<Scalars['Bytes']>;
  manager_gt?: InputMaybe<Scalars['Bytes']>;
  manager_lt?: InputMaybe<Scalars['Bytes']>;
  manager_gte?: InputMaybe<Scalars['Bytes']>;
  manager_lte?: InputMaybe<Scalars['Bytes']>;
  manager_in?: InputMaybe<Array<Scalars['Bytes']>>;
  manager_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  manager_contains?: InputMaybe<Scalars['Bytes']>;
  manager_not_contains?: InputMaybe<Scalars['Bytes']>;
  expiration?: InputMaybe<Scalars['BigInt']>;
  expiration_not?: InputMaybe<Scalars['BigInt']>;
  expiration_gt?: InputMaybe<Scalars['BigInt']>;
  expiration_lt?: InputMaybe<Scalars['BigInt']>;
  expiration_gte?: InputMaybe<Scalars['BigInt']>;
  expiration_lte?: InputMaybe<Scalars['BigInt']>;
  expiration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenURI?: InputMaybe<Scalars['String']>;
  tokenURI_not?: InputMaybe<Scalars['String']>;
  tokenURI_gt?: InputMaybe<Scalars['String']>;
  tokenURI_lt?: InputMaybe<Scalars['String']>;
  tokenURI_gte?: InputMaybe<Scalars['String']>;
  tokenURI_lte?: InputMaybe<Scalars['String']>;
  tokenURI_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_contains?: InputMaybe<Scalars['String']>;
  tokenURI_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelled?: InputMaybe<Scalars['Boolean']>;
  cancelled_not?: InputMaybe<Scalars['Boolean']>;
  cancelled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  cancelled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionsHash?: InputMaybe<Array<Scalars['String']>>;
  transactionsHash_not?: InputMaybe<Array<Scalars['String']>>;
  transactionsHash_contains?: InputMaybe<Array<Scalars['String']>>;
  transactionsHash_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  transactionsHash_not_contains?: InputMaybe<Array<Scalars['String']>>;
  transactionsHash_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Key_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Key_filter>>>;
};

export type Key_orderBy =
  | 'id'
  | 'lock'
  | 'lock__id'
  | 'lock__address'
  | 'lock__name'
  | 'lock__symbol'
  | 'lock__expirationDuration'
  | 'lock__tokenAddress'
  | 'lock__price'
  | 'lock__version'
  | 'lock__totalKeys'
  | 'lock__maxNumberOfKeys'
  | 'lock__maxKeysPerAddress'
  | 'lock__createdAtBlock'
  | 'lock__lastKeyMintedAt'
  | 'lock__deployer'
  | 'lock__numberOfReceipts'
  | 'tokenId'
  | 'owner'
  | 'manager'
  | 'expiration'
  | 'tokenURI'
  | 'createdAtBlock'
  | 'createdAt'
  | 'cancelled'
  | 'transactionsHash';

export type Lock = {
  /** Unique ID for the Lock object (uses the lock address) */
  id: Scalars['ID'];
  /** Address of the lock */
  address: Scalars['Bytes'];
  /** A descriptive name for a collection of NFTs in this contract */
  name?: Maybe<Scalars['String']>;
  /** Token symbol */
  symbol?: Maybe<Scalars['String']>;
  /** Duration is set the on the lock when you deploy and the expiration which is set on each key when they are minted */
  expirationDuration?: Maybe<Scalars['BigInt']>;
  /** Address of the 'currency' ERC20 contract if the keys are priced using an ERC20 */
  tokenAddress: Scalars['Bytes'];
  /** Price of the keys sold by the lock */
  price: Scalars['BigInt'];
  /** An assigned role set on a Lock contract which gives the highest level of permissions to the wallet address set to that role */
  lockManagers: Array<Scalars['Bytes']>;
  /** Unlock Protocol version of a minting contract */
  version: Scalars['BigInt'];
  /** Number of keys minted (expired or not) */
  totalKeys: Scalars['BigInt'];
  /** Maximum number of keys for sale */
  maxNumberOfKeys?: Maybe<Scalars['BigInt']>;
  /** The maximum number of keys allowed for a single address */
  maxKeysPerAddress?: Maybe<Scalars['BigInt']>;
  /** Refer to key entity */
  keys?: Maybe<Array<Key>>;
  /** Which block the lock was created */
  createdAtBlock?: Maybe<Scalars['BigInt']>;
  /** The timestamp of the block in which the last key was minted */
  lastKeyMintedAt?: Maybe<Scalars['BigInt']>;
  /** Address of the lock deployer */
  deployer: Scalars['Bytes'];
  /** Total number of receipts of lock */
  numberOfReceipts: Scalars['BigInt'];
};


export type LockkeysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Key_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Key_filter>;
};

export type LockStats = {
  /** Transaction Hash */
  id: Scalars['ID'];
  /** Total locks deployed */
  totalLocksDeployed: Scalars['BigInt'];
  /** Total keys sold */
  totalKeysSold: Scalars['BigInt'];
};

export type LockStats_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalLocksDeployed?: InputMaybe<Scalars['BigInt']>;
  totalLocksDeployed_not?: InputMaybe<Scalars['BigInt']>;
  totalLocksDeployed_gt?: InputMaybe<Scalars['BigInt']>;
  totalLocksDeployed_lt?: InputMaybe<Scalars['BigInt']>;
  totalLocksDeployed_gte?: InputMaybe<Scalars['BigInt']>;
  totalLocksDeployed_lte?: InputMaybe<Scalars['BigInt']>;
  totalLocksDeployed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLocksDeployed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalKeysSold?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_not?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_gt?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_lt?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_gte?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_lte?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalKeysSold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LockStats_filter>>>;
  or?: InputMaybe<Array<InputMaybe<LockStats_filter>>>;
};

export type LockStats_orderBy =
  | 'id'
  | 'totalLocksDeployed'
  | 'totalKeysSold';

export type Lock_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  expirationDuration?: InputMaybe<Scalars['BigInt']>;
  expirationDuration_not?: InputMaybe<Scalars['BigInt']>;
  expirationDuration_gt?: InputMaybe<Scalars['BigInt']>;
  expirationDuration_lt?: InputMaybe<Scalars['BigInt']>;
  expirationDuration_gte?: InputMaybe<Scalars['BigInt']>;
  expirationDuration_lte?: InputMaybe<Scalars['BigInt']>;
  expirationDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expirationDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAddress?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_gt?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_lt?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_gte?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_lte?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lockManagers?: InputMaybe<Array<Scalars['Bytes']>>;
  lockManagers_not?: InputMaybe<Array<Scalars['Bytes']>>;
  lockManagers_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  lockManagers_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  lockManagers_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  lockManagers_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  version?: InputMaybe<Scalars['BigInt']>;
  version_not?: InputMaybe<Scalars['BigInt']>;
  version_gt?: InputMaybe<Scalars['BigInt']>;
  version_lt?: InputMaybe<Scalars['BigInt']>;
  version_gte?: InputMaybe<Scalars['BigInt']>;
  version_lte?: InputMaybe<Scalars['BigInt']>;
  version_in?: InputMaybe<Array<Scalars['BigInt']>>;
  version_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalKeys?: InputMaybe<Scalars['BigInt']>;
  totalKeys_not?: InputMaybe<Scalars['BigInt']>;
  totalKeys_gt?: InputMaybe<Scalars['BigInt']>;
  totalKeys_lt?: InputMaybe<Scalars['BigInt']>;
  totalKeys_gte?: InputMaybe<Scalars['BigInt']>;
  totalKeys_lte?: InputMaybe<Scalars['BigInt']>;
  totalKeys_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalKeys_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxNumberOfKeys?: InputMaybe<Scalars['BigInt']>;
  maxNumberOfKeys_not?: InputMaybe<Scalars['BigInt']>;
  maxNumberOfKeys_gt?: InputMaybe<Scalars['BigInt']>;
  maxNumberOfKeys_lt?: InputMaybe<Scalars['BigInt']>;
  maxNumberOfKeys_gte?: InputMaybe<Scalars['BigInt']>;
  maxNumberOfKeys_lte?: InputMaybe<Scalars['BigInt']>;
  maxNumberOfKeys_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxNumberOfKeys_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxKeysPerAddress?: InputMaybe<Scalars['BigInt']>;
  maxKeysPerAddress_not?: InputMaybe<Scalars['BigInt']>;
  maxKeysPerAddress_gt?: InputMaybe<Scalars['BigInt']>;
  maxKeysPerAddress_lt?: InputMaybe<Scalars['BigInt']>;
  maxKeysPerAddress_gte?: InputMaybe<Scalars['BigInt']>;
  maxKeysPerAddress_lte?: InputMaybe<Scalars['BigInt']>;
  maxKeysPerAddress_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxKeysPerAddress_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  keys_?: InputMaybe<Key_filter>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastKeyMintedAt?: InputMaybe<Scalars['BigInt']>;
  lastKeyMintedAt_not?: InputMaybe<Scalars['BigInt']>;
  lastKeyMintedAt_gt?: InputMaybe<Scalars['BigInt']>;
  lastKeyMintedAt_lt?: InputMaybe<Scalars['BigInt']>;
  lastKeyMintedAt_gte?: InputMaybe<Scalars['BigInt']>;
  lastKeyMintedAt_lte?: InputMaybe<Scalars['BigInt']>;
  lastKeyMintedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastKeyMintedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deployer?: InputMaybe<Scalars['Bytes']>;
  deployer_not?: InputMaybe<Scalars['Bytes']>;
  deployer_gt?: InputMaybe<Scalars['Bytes']>;
  deployer_lt?: InputMaybe<Scalars['Bytes']>;
  deployer_gte?: InputMaybe<Scalars['Bytes']>;
  deployer_lte?: InputMaybe<Scalars['Bytes']>;
  deployer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  deployer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  deployer_contains?: InputMaybe<Scalars['Bytes']>;
  deployer_not_contains?: InputMaybe<Scalars['Bytes']>;
  numberOfReceipts?: InputMaybe<Scalars['BigInt']>;
  numberOfReceipts_not?: InputMaybe<Scalars['BigInt']>;
  numberOfReceipts_gt?: InputMaybe<Scalars['BigInt']>;
  numberOfReceipts_lt?: InputMaybe<Scalars['BigInt']>;
  numberOfReceipts_gte?: InputMaybe<Scalars['BigInt']>;
  numberOfReceipts_lte?: InputMaybe<Scalars['BigInt']>;
  numberOfReceipts_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfReceipts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Lock_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Lock_filter>>>;
};

export type Lock_orderBy =
  | 'id'
  | 'address'
  | 'name'
  | 'symbol'
  | 'expirationDuration'
  | 'tokenAddress'
  | 'price'
  | 'lockManagers'
  | 'version'
  | 'totalKeys'
  | 'maxNumberOfKeys'
  | 'maxKeysPerAddress'
  | 'keys'
  | 'createdAtBlock'
  | 'lastKeyMintedAt'
  | 'deployer'
  | 'numberOfReceipts';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  lock?: Maybe<Lock>;
  locks: Array<Lock>;
  key?: Maybe<Key>;
  keys: Array<Key>;
  unlockDailyData?: Maybe<UnlockDailyData>;
  unlockDailyDatas: Array<UnlockDailyData>;
  lockStats: Array<LockStats>;
  unlockStats: Array<UnlockStats>;
  receipt?: Maybe<Receipt>;
  receipts: Array<Receipt>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerylockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Lock_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Lock_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerykeyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerykeysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Key_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Key_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunlockDailyDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunlockDailyDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnlockDailyData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnlockDailyData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylockStatsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LockStats_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LockStats_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunlockStatsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnlockStats_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnlockStats_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreceiptArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreceiptsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Receipt_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Receipt_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Receipt = {
  /** Transaction Hash */
  id: Scalars['ID'];
  /** Timestamp */
  timestamp: Scalars['BigInt'];
  /** Sender of the transaction */
  sender: Scalars['String'];
  /** Payer in the case of an ERC20 lock renewal, the sender and payer might differ */
  payer?: Maybe<Scalars['String']>;
  /** Address of the Lock smart contract */
  lockAddress: Scalars['String'];
  /** Address of the 'currency' ERC20 contract if the keys are priced using an ERC20 */
  tokenAddress: Scalars['String'];
  /** amount */
  amountTransferred: Scalars['BigInt'];
  /** Total gas paid */
  gasTotal: Scalars['BigInt'];
  /** Increasing number of receipt */
  receiptNumber: Scalars['BigInt'];
};

export type Receipt_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sender?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  payer?: InputMaybe<Scalars['String']>;
  payer_not?: InputMaybe<Scalars['String']>;
  payer_gt?: InputMaybe<Scalars['String']>;
  payer_lt?: InputMaybe<Scalars['String']>;
  payer_gte?: InputMaybe<Scalars['String']>;
  payer_lte?: InputMaybe<Scalars['String']>;
  payer_in?: InputMaybe<Array<Scalars['String']>>;
  payer_not_in?: InputMaybe<Array<Scalars['String']>>;
  payer_contains?: InputMaybe<Scalars['String']>;
  payer_contains_nocase?: InputMaybe<Scalars['String']>;
  payer_not_contains?: InputMaybe<Scalars['String']>;
  payer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  payer_starts_with?: InputMaybe<Scalars['String']>;
  payer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  payer_not_starts_with?: InputMaybe<Scalars['String']>;
  payer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  payer_ends_with?: InputMaybe<Scalars['String']>;
  payer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  payer_not_ends_with?: InputMaybe<Scalars['String']>;
  payer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lockAddress?: InputMaybe<Scalars['String']>;
  lockAddress_not?: InputMaybe<Scalars['String']>;
  lockAddress_gt?: InputMaybe<Scalars['String']>;
  lockAddress_lt?: InputMaybe<Scalars['String']>;
  lockAddress_gte?: InputMaybe<Scalars['String']>;
  lockAddress_lte?: InputMaybe<Scalars['String']>;
  lockAddress_in?: InputMaybe<Array<Scalars['String']>>;
  lockAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  lockAddress_contains?: InputMaybe<Scalars['String']>;
  lockAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  lockAddress_not_contains?: InputMaybe<Scalars['String']>;
  lockAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lockAddress_starts_with?: InputMaybe<Scalars['String']>;
  lockAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lockAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  lockAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lockAddress_ends_with?: InputMaybe<Scalars['String']>;
  lockAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lockAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  lockAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress?: InputMaybe<Scalars['String']>;
  tokenAddress_not?: InputMaybe<Scalars['String']>;
  tokenAddress_gt?: InputMaybe<Scalars['String']>;
  tokenAddress_lt?: InputMaybe<Scalars['String']>;
  tokenAddress_gte?: InputMaybe<Scalars['String']>;
  tokenAddress_lte?: InputMaybe<Scalars['String']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amountTransferred?: InputMaybe<Scalars['BigInt']>;
  amountTransferred_not?: InputMaybe<Scalars['BigInt']>;
  amountTransferred_gt?: InputMaybe<Scalars['BigInt']>;
  amountTransferred_lt?: InputMaybe<Scalars['BigInt']>;
  amountTransferred_gte?: InputMaybe<Scalars['BigInt']>;
  amountTransferred_lte?: InputMaybe<Scalars['BigInt']>;
  amountTransferred_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountTransferred_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasTotal?: InputMaybe<Scalars['BigInt']>;
  gasTotal_not?: InputMaybe<Scalars['BigInt']>;
  gasTotal_gt?: InputMaybe<Scalars['BigInt']>;
  gasTotal_lt?: InputMaybe<Scalars['BigInt']>;
  gasTotal_gte?: InputMaybe<Scalars['BigInt']>;
  gasTotal_lte?: InputMaybe<Scalars['BigInt']>;
  gasTotal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasTotal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receiptNumber?: InputMaybe<Scalars['BigInt']>;
  receiptNumber_not?: InputMaybe<Scalars['BigInt']>;
  receiptNumber_gt?: InputMaybe<Scalars['BigInt']>;
  receiptNumber_lt?: InputMaybe<Scalars['BigInt']>;
  receiptNumber_gte?: InputMaybe<Scalars['BigInt']>;
  receiptNumber_lte?: InputMaybe<Scalars['BigInt']>;
  receiptNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receiptNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Receipt_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Receipt_filter>>>;
};

export type Receipt_orderBy =
  | 'id'
  | 'timestamp'
  | 'sender'
  | 'payer'
  | 'lockAddress'
  | 'tokenAddress'
  | 'amountTransferred'
  | 'gasTotal'
  | 'receiptNumber';

export type Subscription = {
  lock?: Maybe<Lock>;
  locks: Array<Lock>;
  key?: Maybe<Key>;
  keys: Array<Key>;
  unlockDailyData?: Maybe<UnlockDailyData>;
  unlockDailyDatas: Array<UnlockDailyData>;
  lockStats: Array<LockStats>;
  unlockStats: Array<UnlockStats>;
  receipt?: Maybe<Receipt>;
  receipts: Array<Receipt>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionlockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Lock_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Lock_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionkeyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionkeysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Key_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Key_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunlockDailyDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunlockDailyDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnlockDailyData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnlockDailyData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlockStatsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LockStats_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LockStats_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunlockStatsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnlockStats_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnlockStats_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreceiptArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreceiptsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Receipt_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Receipt_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type UnlockDailyData = {
  /** Day identifier */
  id: Scalars['ID'];
  /** Number of locks deployed on that day */
  lockDeployed: Scalars['BigInt'];
  /** Total number of locks deployed */
  totalLockDeployed: Scalars['BigInt'];
  /** Daily number of keys sold */
  keysSold: Scalars['BigInt'];
  /** Total number of keys sold */
  totalKeysSold: Scalars['BigInt'];
  /** Daily number of active locks (active locks have minted at least one membership in the last 30 days */
  activeLocks?: Maybe<Array<Scalars['Bytes']>>;
  /** Total value exchanged on the network */
  grossNetworkProduct: Scalars['BigInt'];
};

export type UnlockDailyData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lockDeployed?: InputMaybe<Scalars['BigInt']>;
  lockDeployed_not?: InputMaybe<Scalars['BigInt']>;
  lockDeployed_gt?: InputMaybe<Scalars['BigInt']>;
  lockDeployed_lt?: InputMaybe<Scalars['BigInt']>;
  lockDeployed_gte?: InputMaybe<Scalars['BigInt']>;
  lockDeployed_lte?: InputMaybe<Scalars['BigInt']>;
  lockDeployed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lockDeployed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLockDeployed?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_not?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_gt?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_lt?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_gte?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_lte?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLockDeployed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  keysSold?: InputMaybe<Scalars['BigInt']>;
  keysSold_not?: InputMaybe<Scalars['BigInt']>;
  keysSold_gt?: InputMaybe<Scalars['BigInt']>;
  keysSold_lt?: InputMaybe<Scalars['BigInt']>;
  keysSold_gte?: InputMaybe<Scalars['BigInt']>;
  keysSold_lte?: InputMaybe<Scalars['BigInt']>;
  keysSold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  keysSold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalKeysSold?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_not?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_gt?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_lt?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_gte?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_lte?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalKeysSold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  activeLocks?: InputMaybe<Array<Scalars['Bytes']>>;
  activeLocks_not?: InputMaybe<Array<Scalars['Bytes']>>;
  activeLocks_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  activeLocks_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  activeLocks_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  activeLocks_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  grossNetworkProduct?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_not?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_gt?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_lt?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_gte?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_lte?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_in?: InputMaybe<Array<Scalars['BigInt']>>;
  grossNetworkProduct_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UnlockDailyData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UnlockDailyData_filter>>>;
};

export type UnlockDailyData_orderBy =
  | 'id'
  | 'lockDeployed'
  | 'totalLockDeployed'
  | 'keysSold'
  | 'totalKeysSold'
  | 'activeLocks'
  | 'grossNetworkProduct';

export type UnlockStats = {
  /** Identifier */
  id: Scalars['ID'];
  /** Total number of locks deployed */
  totalLockDeployed: Scalars['BigInt'];
  /** Total number of keys sold */
  totalKeysSold: Scalars['BigInt'];
  /** Total value exchanged on the network */
  grossNetworkProduct: Scalars['BigInt'];
};

export type UnlockStats_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalLockDeployed?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_not?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_gt?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_lt?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_gte?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_lte?: InputMaybe<Scalars['BigInt']>;
  totalLockDeployed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLockDeployed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalKeysSold?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_not?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_gt?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_lt?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_gte?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_lte?: InputMaybe<Scalars['BigInt']>;
  totalKeysSold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalKeysSold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  grossNetworkProduct?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_not?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_gt?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_lt?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_gte?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_lte?: InputMaybe<Scalars['BigInt']>;
  grossNetworkProduct_in?: InputMaybe<Array<Scalars['BigInt']>>;
  grossNetworkProduct_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UnlockStats_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UnlockStats_filter>>>;
};

export type UnlockStats_orderBy =
  | 'id'
  | 'totalLockDeployed'
  | 'totalKeysSold'
  | 'grossNetworkProduct';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  lock: InContextSdkMethod<Query['lock'], QuerylockArgs, MeshContext>,
  /** null **/
  locks: InContextSdkMethod<Query['locks'], QuerylocksArgs, MeshContext>,
  /** null **/
  key: InContextSdkMethod<Query['key'], QuerykeyArgs, MeshContext>,
  /** null **/
  keys: InContextSdkMethod<Query['keys'], QuerykeysArgs, MeshContext>,
  /** null **/
  unlockDailyData: InContextSdkMethod<Query['unlockDailyData'], QueryunlockDailyDataArgs, MeshContext>,
  /** null **/
  unlockDailyDatas: InContextSdkMethod<Query['unlockDailyDatas'], QueryunlockDailyDatasArgs, MeshContext>,
  /** null **/
  lockStats: InContextSdkMethod<Query['lockStats'], QuerylockStatsArgs, MeshContext>,
  /** null **/
  unlockStats: InContextSdkMethod<Query['unlockStats'], QueryunlockStatsArgs, MeshContext>,
  /** null **/
  receipt: InContextSdkMethod<Query['receipt'], QueryreceiptArgs, MeshContext>,
  /** null **/
  receipts: InContextSdkMethod<Query['receipts'], QueryreceiptsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  lock: InContextSdkMethod<Subscription['lock'], SubscriptionlockArgs, MeshContext>,
  /** null **/
  locks: InContextSdkMethod<Subscription['locks'], SubscriptionlocksArgs, MeshContext>,
  /** null **/
  key: InContextSdkMethod<Subscription['key'], SubscriptionkeyArgs, MeshContext>,
  /** null **/
  keys: InContextSdkMethod<Subscription['keys'], SubscriptionkeysArgs, MeshContext>,
  /** null **/
  unlockDailyData: InContextSdkMethod<Subscription['unlockDailyData'], SubscriptionunlockDailyDataArgs, MeshContext>,
  /** null **/
  unlockDailyDatas: InContextSdkMethod<Subscription['unlockDailyDatas'], SubscriptionunlockDailyDatasArgs, MeshContext>,
  /** null **/
  lockStats: InContextSdkMethod<Subscription['lockStats'], SubscriptionlockStatsArgs, MeshContext>,
  /** null **/
  unlockStats: InContextSdkMethod<Subscription['unlockStats'], SubscriptionunlockStatsArgs, MeshContext>,
  /** null **/
  receipt: InContextSdkMethod<Subscription['receipt'], SubscriptionreceiptArgs, MeshContext>,
  /** null **/
  receipts: InContextSdkMethod<Subscription['receipts'], SubscriptionreceiptsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["unlock"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
