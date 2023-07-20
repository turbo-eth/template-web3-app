// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { UnlockTypes } from './sources/unlock/types';
import * as importedModule$0 from "./sources/unlock/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  Key: ResolverTypeWrapper<Key>;
  Key_filter: Key_filter;
  Key_orderBy: Key_orderBy;
  Lock: ResolverTypeWrapper<Lock>;
  LockStats: ResolverTypeWrapper<LockStats>;
  LockStats_filter: LockStats_filter;
  LockStats_orderBy: LockStats_orderBy;
  Lock_filter: Lock_filter;
  Lock_orderBy: Lock_orderBy;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  Receipt: ResolverTypeWrapper<Receipt>;
  Receipt_filter: Receipt_filter;
  Receipt_orderBy: Receipt_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  UnlockDailyData: ResolverTypeWrapper<UnlockDailyData>;
  UnlockDailyData_filter: UnlockDailyData_filter;
  UnlockDailyData_orderBy: UnlockDailyData_orderBy;
  UnlockStats: ResolverTypeWrapper<UnlockStats>;
  UnlockStats_filter: UnlockStats_filter;
  UnlockStats_orderBy: UnlockStats_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Key: Key;
  Key_filter: Key_filter;
  Lock: Lock;
  LockStats: LockStats;
  LockStats_filter: LockStats_filter;
  Lock_filter: Lock_filter;
  Query: {};
  Receipt: Receipt;
  Receipt_filter: Receipt_filter;
  String: Scalars['String'];
  Subscription: {};
  UnlockDailyData: UnlockDailyData;
  UnlockDailyData_filter: UnlockDailyData_filter;
  UnlockStats: UnlockStats;
  UnlockStats_filter: UnlockStats_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type KeyResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Key'] = ResolversParentTypes['Key']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lock?: Resolver<ResolversTypes['Lock'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  manager?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  expiration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenURI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cancelled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  transactionsHash?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LockResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Lock'] = ResolversParentTypes['Lock']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDuration?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  tokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lockManagers?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalKeys?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  maxNumberOfKeys?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  maxKeysPerAddress?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  keys?: Resolver<Maybe<Array<ResolversTypes['Key']>>, ParentType, ContextType, RequireFields<LockkeysArgs, 'skip' | 'first'>>;
  createdAtBlock?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  lastKeyMintedAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  deployer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  numberOfReceipts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LockStatsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['LockStats'] = ResolversParentTypes['LockStats']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalLocksDeployed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalKeysSold?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  lock?: Resolver<Maybe<ResolversTypes['Lock']>, ParentType, ContextType, RequireFields<QuerylockArgs, 'id' | 'subgraphError'>>;
  locks?: Resolver<Array<ResolversTypes['Lock']>, ParentType, ContextType, RequireFields<QuerylocksArgs, 'skip' | 'first' | 'subgraphError'>>;
  key?: Resolver<Maybe<ResolversTypes['Key']>, ParentType, ContextType, RequireFields<QuerykeyArgs, 'id' | 'subgraphError'>>;
  keys?: Resolver<Array<ResolversTypes['Key']>, ParentType, ContextType, RequireFields<QuerykeysArgs, 'skip' | 'first' | 'subgraphError'>>;
  unlockDailyData?: Resolver<Maybe<ResolversTypes['UnlockDailyData']>, ParentType, ContextType, RequireFields<QueryunlockDailyDataArgs, 'id' | 'subgraphError'>>;
  unlockDailyDatas?: Resolver<Array<ResolversTypes['UnlockDailyData']>, ParentType, ContextType, RequireFields<QueryunlockDailyDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  lockStats?: Resolver<Array<ResolversTypes['LockStats']>, ParentType, ContextType, RequireFields<QuerylockStatsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unlockStats?: Resolver<Array<ResolversTypes['UnlockStats']>, ParentType, ContextType, RequireFields<QueryunlockStatsArgs, 'skip' | 'first' | 'subgraphError'>>;
  receipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType, RequireFields<QueryreceiptArgs, 'id' | 'subgraphError'>>;
  receipts?: Resolver<Array<ResolversTypes['Receipt']>, ParentType, ContextType, RequireFields<QueryreceiptsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type ReceiptResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Receipt'] = ResolversParentTypes['Receipt']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lockAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amountTransferred?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasTotal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  receiptNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  lock?: SubscriptionResolver<Maybe<ResolversTypes['Lock']>, "lock", ParentType, ContextType, RequireFields<SubscriptionlockArgs, 'id' | 'subgraphError'>>;
  locks?: SubscriptionResolver<Array<ResolversTypes['Lock']>, "locks", ParentType, ContextType, RequireFields<SubscriptionlocksArgs, 'skip' | 'first' | 'subgraphError'>>;
  key?: SubscriptionResolver<Maybe<ResolversTypes['Key']>, "key", ParentType, ContextType, RequireFields<SubscriptionkeyArgs, 'id' | 'subgraphError'>>;
  keys?: SubscriptionResolver<Array<ResolversTypes['Key']>, "keys", ParentType, ContextType, RequireFields<SubscriptionkeysArgs, 'skip' | 'first' | 'subgraphError'>>;
  unlockDailyData?: SubscriptionResolver<Maybe<ResolversTypes['UnlockDailyData']>, "unlockDailyData", ParentType, ContextType, RequireFields<SubscriptionunlockDailyDataArgs, 'id' | 'subgraphError'>>;
  unlockDailyDatas?: SubscriptionResolver<Array<ResolversTypes['UnlockDailyData']>, "unlockDailyDatas", ParentType, ContextType, RequireFields<SubscriptionunlockDailyDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  lockStats?: SubscriptionResolver<Array<ResolversTypes['LockStats']>, "lockStats", ParentType, ContextType, RequireFields<SubscriptionlockStatsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unlockStats?: SubscriptionResolver<Array<ResolversTypes['UnlockStats']>, "unlockStats", ParentType, ContextType, RequireFields<SubscriptionunlockStatsArgs, 'skip' | 'first' | 'subgraphError'>>;
  receipt?: SubscriptionResolver<Maybe<ResolversTypes['Receipt']>, "receipt", ParentType, ContextType, RequireFields<SubscriptionreceiptArgs, 'id' | 'subgraphError'>>;
  receipts?: SubscriptionResolver<Array<ResolversTypes['Receipt']>, "receipts", ParentType, ContextType, RequireFields<SubscriptionreceiptsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type UnlockDailyDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UnlockDailyData'] = ResolversParentTypes['UnlockDailyData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lockDeployed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalLockDeployed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  keysSold?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalKeysSold?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  activeLocks?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  grossNetworkProduct?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnlockStatsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UnlockStats'] = ResolversParentTypes['UnlockStats']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalLockDeployed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalKeysSold?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  grossNetworkProduct?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  Key?: KeyResolvers<ContextType>;
  Lock?: LockResolvers<ContextType>;
  LockStats?: LockStatsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Receipt?: ReceiptResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UnlockDailyData?: UnlockDailyDataResolvers<ContextType>;
  UnlockStats?: UnlockStatsResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = UnlockTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/unlock/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const unlockTransforms = [];
const additionalTypeDefs = [] as any[];
const unlockHandler = new GraphqlHandler({
              name: "unlock",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/unlock-protocol/{context.network:goerli-v2}"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("unlock"),
              logger: logger.child("unlock"),
              importFn,
            });
sources[0] = {
          name: 'unlock',
          handler: unlockHandler,
          transforms: unlockTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: LockStatsQueryDocument,
        get rawSDL() {
          return printWithCache(LockStatsQueryDocument);
        },
        location: 'LockStatsQueryDocument.graphql'
      },{
        document: UserKeysQueryDocument,
        get rawSDL() {
          return printWithCache(UserKeysQueryDocument);
        },
        location: 'UserKeysQueryDocument.graphql'
      },{
        document: UserLocksQueryDocument,
        get rawSDL() {
          return printWithCache(UserLocksQueryDocument);
        },
        location: 'UserLocksQueryDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type LockStatsQueryQueryVariables = Exact<{
  lockId: Scalars['ID'];
}>;


export type LockStatsQueryQuery = { locks: Array<Pick<Lock, 'id' | 'address' | 'name' | 'symbol' | 'totalKeys' | 'expirationDuration' | 'price'>> };

export type UserKeysQueryQueryVariables = Exact<{
  user: Scalars['Bytes'];
}>;


export type UserKeysQueryQuery = { keys: Array<(
    Pick<Key, 'id' | 'tokenId' | 'owner'>
    & { lock: Pick<Lock, 'id'> }
  )> };

export type UserLocksQueryQueryVariables = Exact<{
  user: Scalars['Bytes'];
}>;


export type UserLocksQueryQuery = { locks: Array<Pick<Lock, 'id' | 'address' | 'name'>> };


export const LockStatsQueryDocument = gql`
    query LockStatsQuery($lockId: ID!) {
  locks(where: {id: $lockId}) {
    id
    address
    name
    symbol
    totalKeys
    expirationDuration
    price
  }
}
    ` as unknown as DocumentNode<LockStatsQueryQuery, LockStatsQueryQueryVariables>;
export const UserKeysQueryDocument = gql`
    query UserKeysQuery($user: Bytes!) {
  keys(where: {owner: $user}) {
    id
    lock {
      id
    }
    tokenId
    owner
  }
}
    ` as unknown as DocumentNode<UserKeysQueryQuery, UserKeysQueryQueryVariables>;
export const UserLocksQueryDocument = gql`
    query UserLocksQuery($user: Bytes!) {
  locks(where: {lockManagers: [$user]}) {
    id
    address
    name
  }
}
    ` as unknown as DocumentNode<UserLocksQueryQuery, UserLocksQueryQueryVariables>;




export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    LockStatsQuery(variables: LockStatsQueryQueryVariables, options?: C): Promise<LockStatsQueryQuery> {
      return requester<LockStatsQueryQuery, LockStatsQueryQueryVariables>(LockStatsQueryDocument, variables, options) as Promise<LockStatsQueryQuery>;
    },
    UserKeysQuery(variables: UserKeysQueryQueryVariables, options?: C): Promise<UserKeysQueryQuery> {
      return requester<UserKeysQueryQuery, UserKeysQueryQueryVariables>(UserKeysQueryDocument, variables, options) as Promise<UserKeysQueryQuery>;
    },
    UserLocksQuery(variables: UserLocksQueryQueryVariables, options?: C): Promise<UserLocksQueryQuery> {
      return requester<UserLocksQueryQuery, UserLocksQueryQueryVariables>(UserLocksQueryDocument, variables, options) as Promise<UserLocksQueryQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;