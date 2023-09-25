export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  AccountID: string
  Address: string
  AssetID: string
  BigInt: string
  BlockID: any
  Bytes: string
  Bytes32: string
  ChainID: string
  Cursor: any
  HashID: any
  Long: number
  Timestamp: string
  Upload: any
}

/** Key for use with this API.  See https://docs.tally.xyz/tally-api/welcome#request-an-api-key for how to request & use! */
export type ApiKey = {
  /** Last four characters of original generated key */
  lastFour: Scalars["String"]
  /** User generated name to differentiate keys */
  name: Scalars["String"]
}

/** A Blockchain `Account` with its associated metadata, participations and activity. */
export type Account = {
  /** AccountActivity (votes, proposals created, etc).  Currently only supports on chain governance. */
  activity?: Maybe<Array<ActivityItem>>
  /** EVM Address for this `Account` */
  address: Scalars["Address"]
  /** List of APIKeys generated for this account.  See https://docs.tally.xyz/tally-api/welcome#request-an-api-key for how to request & use! */
  apiKeys?: Maybe<Array<ApiKey>>
  /** `Account` bio set on Tally */
  bio: Scalars["String"]
  /** `Account` email set on Tally */
  email: Scalars["String"]
  /** Ethereum Name Service Name */
  ens?: Maybe<Scalars["String"]>
  /** Feature flags */
  features?: Maybe<Array<FeatureState>>
  id: Scalars["ID"]
  /**
   * Linked Identities: i.e. ENS, Twitter stored in Tally
   * @deprecated ens, twitter available on `Account` type
   */
  identities?: Maybe<Identities>
  /** `Account` name set on Tally */
  name: Scalars["String"]
  /** Organizations the Account is a member of.  Can be filtered to get only specific roles. */
  organizations?: Maybe<Array<Organization>>
  otherLinks?: Maybe<Array<Maybe<OtherLink>>>
  /** Governances where an `Account` has a token balance or delegations along with `Account` `Participation`: votes, proposals, stats, delegations, etc. */
  participations: Array<Participation>
  /** Picture URL */
  picture?: Maybe<Scalars["String"]>
  /** Twitter handle */
  twitter?: Maybe<Scalars["String"]>
}

/** A Blockchain `Account` with its associated metadata, participations and activity. */
export type AccountActivityArgs = {
  governanceIds?: InputMaybe<Array<Scalars["AccountID"]>>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<AccountActivitySort>
}

/** A Blockchain `Account` with its associated metadata, participations and activity. */
export type AccountOrganizationsArgs = {
  pagination?: InputMaybe<Pagination>
  roles?: InputMaybe<Array<OrganizationRole>>
  sort?: InputMaybe<OrganizationSort>
}

/** A Blockchain `Account` with its associated metadata, participations and activity. */
export type AccountParticipationsArgs = {
  governanceIds?: InputMaybe<Array<Scalars["AccountID"]>>
  includeInactive?: InputMaybe<Scalars["Boolean"]>
  pagination?: InputMaybe<Pagination>
}

export type AccountActivitySort = {
  field?: InputMaybe<AccountActivitySortField>
  order?: InputMaybe<SortOrder>
}

export enum AccountActivitySortField {
  BlockTimestamp = "BLOCK_TIMESTAMP",
}

export type ActivityItem = Proposal | Vote

export type AddAdmin = {
  address: Scalars["String"]
  role: OrganizationRole
}

export type AddressInfo = {
  accounts: Array<Account>
  /** Returns a list of `AddressInfo` Activity for a given address across all chains supported by Tally.  Currently only supports on chain governances. */
  activity?: Maybe<Array<ActivityItem>>
  address: Scalars["Address"]
  /** Account used for SIWE (auth). */
  ethAccount: Account
  participations: Array<Participation>
}

export type AddressInfoActivityArgs = {
  governanceIds?: InputMaybe<Array<Scalars["AccountID"]>>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<AccountActivitySort>
}

export type AddressInfoParticipationsArgs = {
  governanceIds?: InputMaybe<Array<Scalars["AccountID"]>>
  pagination?: InputMaybe<Pagination>
}

export type Block = {
  id: Scalars["BlockID"]
  number: Scalars["Long"]
  timestamp: Scalars["Timestamp"]
}

export type BlockIdInput = {
  blockNumber: Scalars["Long"]
  chain: Scalars["ChainID"]
}

/** Chain data in the models are only loaded on server startup. If changed please restart the api servers. */
export type Chain = {
  /**  API url of the block explorer  */
  blockExplorerURL: Scalars["String"]
  /**  Average block time in seconds. */
  blockTime: Scalars["Float"]
  /**  Chain as parameter found in the eip. */
  chain: Scalars["String"]
  /**  The id in eip155:chain_id  */
  id: Scalars["ChainID"]
  /**  Boolean true if it is a testnet, false if it's not. */
  isTestnet: Scalars["Boolean"]
  /**  If chain is an L2, the L1 id in format eip155:chain_id  */
  layer1Id?: Maybe<Scalars["ChainID"]>
  /** Chain name with removed redundancy and unnecessary words. e.g.: Ethereum Rinkeby */
  mediumName: Scalars["String"]
  /** Chain name as found in eip lists. e.g.: Ethereum Testnet Rinkeby */
  name: Scalars["String"]
  /**  Data from chain native currency. */
  nativeCurrency: NativeCurrency
  /** Chain short name as found in eip lists. The Acronym of it. e.g.: rin */
  shortName: Scalars["String"]
  /**  Icon SVG of the chain logo. */
  svg?: Maybe<Scalars["String"]>
  /**  Boolean true if Tenderly supports simulations. */
  tenderlySupport: Scalars["Boolean"]
  /**  Boolean true if L2 depends on L1 for voting period, false if it doesn't. */
  useLayer1VotingPeriod: Scalars["Boolean"]
}

export type Collectible = {
  ID: Scalars["ID"]
  address: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  imageURI?: Maybe<Scalars["String"]>
  logoURI: Scalars["String"]
  metadata?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  tokenName: Scalars["String"]
  tokenSymbol: Scalars["String"]
  uri?: Maybe<Scalars["String"]>
}

export type Confirmation = {
  owner: Account
  signature: Scalars["Bytes"]
  signatureType: Scalars["String"]
  submissionDate: Scalars["Timestamp"]
}

export type ContactInformation = {
  discord: Scalars["String"]
  email: Scalars["String"]
  name: Scalars["String"]
  twitter: Scalars["String"]
}

export type ContactInformationInput = {
  discord: Scalars["String"]
  email: Scalars["String"]
  name: Scalars["String"]
  twitter: Scalars["String"]
}

export type Contracts = {
  governor: GovernorContract
  tokens: Array<TokenContract>
}

/** A single parameter used in a method. */
export type DecodedParameter = {
  /** Decoded calls in the case of a `transactions` parameter on multisend contract or similar. */
  calls?: Maybe<Array<ExecutableCall>>
  name: Scalars["String"]
  type: Scalars["String"]
  value: Scalars["Bytes"]
}

export type Delegate = {
  account: Account
  address: Scalars["Address"]
  participation: Participation
}

export type DelegateSort = {
  field?: InputMaybe<DelegateSortField>
  order?: InputMaybe<SortOrder>
}

export enum DelegateSortField {
  Created = "CREATED",
  Delegations = "DELEGATIONS",
  HasDelegateStatement = "HAS_DELEGATE_STATEMENT",
  HasEns = "HAS_ENS",
  ProposalsCreated = "PROPOSALS_CREATED",
  TokensOwned = "TOKENS_OWNED",
  Updated = "UPDATED",
  VotingWeight = "VOTING_WEIGHT",
}

export type DelegateStatement = {
  dataSource: DelegateStatementSource
  dataSourceURL?: Maybe<Scalars["String"]>
  delegateAddress: Scalars["Address"]
  delegateStatement: Scalars["String"]
  delegateStatementSummary?: Maybe<Scalars["String"]>
  discourseProfileLink?: Maybe<Scalars["String"]>
  discourseUserName?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  organizationID: Scalars["String"]
  seekingDelegations?: Maybe<Scalars["Boolean"]>
}

export enum DelegateStatementSource {
  Script = "SCRIPT",
  User = "USER",
}

export type Delegation = {
  /** The `Block` when the `Delegation` took place */
  block: Block
  /** Actor who is delegating their voting power */
  delegator: Account
  /** The `Account` this voting power was delegated to before this `Delegation` event */
  from: Account
  /** The `Account` to whom the voting power is not delegated */
  to: Account
  /** `Token` contract where this `Delegation` was created */
  token: Token
  /** Voting Power delegated at time of delegation */
  votingPower: Scalars["BigInt"]
  /** @deprecated renamed for clarity to `votingPower` */
  weight: Scalars["BigInt"]
}

export type DelegationWeightChange = {
  block?: Maybe<Block>
  delegate: Account
  hash?: Maybe<Scalars["Bytes32"]>
  netChange: Scalars["BigInt"]
  newBalance: Scalars["BigInt"]
  prevBalance: Scalars["BigInt"]
  timestamp: Scalars["Timestamp"]
  token: Token
}

export type DelegationWeightChangeSort = {
  field?: InputMaybe<DelegationWeightChangeSortField>
  order?: InputMaybe<SortOrder>
}

export enum DelegationWeightChangeSortField {
  Created = "CREATED",
  NetChange = "NET_CHANGE",
  NewBalance = "NEW_BALANCE",
  OldBalance = "OLD_BALANCE",
}

export type DelegationWeightStats = {
  in: Scalars["BigInt"]
  out: Scalars["BigInt"]
}

/** Executable payload of a proposal.  This is contains four arrays each of which contain an element for each action included. */
export type Executable = {
  /** Call data sent */
  callDatas: Array<Scalars["Bytes"]>
  /** Method signatures for the target.  Only set in Alpha and Bravo style Governors. */
  signatures: Array<Scalars["Bytes"]>
  /** Contract targets */
  targets: Array<Scalars["Address"]>
  /** Amount of native asset to be transferred */
  values: Array<Scalars["BigInt"]>
}

/** Describes what happens if a given `Proposal` or `GnosisSafeTransaction` is executed. A call can have an unlimited amount of nested parameters which can have their own calls in the case of a common initial call to a multisend contract. */
export type ExecutableCall = {
  /** Input data that will be sent to the target method.  Individual parameters derived from this data are available on the parameters field if decoding succeeds. */
  data?: Maybe<Scalars["Bytes"]>
  /** Media context i.e. invoice file */
  media?: Maybe<Scalars["String"]>
  /** Transfer recipe memo */
  memo?: Maybe<Scalars["String"]>
  /** Method to be called on the target smart contract. */
  method?: Maybe<Scalars["String"]>
  /** `DecodedParameter`s sent to the method on the target contract. */
  parameters?: Maybe<Array<DecodedParameter>>
  /** Tally `Recipe` that was used to create this call. */
  recipe?: Maybe<Recipe>
  simulations?: Maybe<Array<Simulation>>
  /** `AccountID` of contract that will be called. */
  target: Scalars["AccountID"]
  /** Amount of native asset that will be sent to the target contract & method. */
  value?: Maybe<Scalars["BigInt"]>
}

export type Feature = Node & {
  id: Scalars["ID"]
  name: Scalars["String"]
}

/** A connection to a list of featues. */
export type FeatureConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<FeatureEdge>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** Identifies the total count of features in the connection. */
  totalCount: Scalars["Int"]
}

/** An edge in a feature connection. */
export type FeatureEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["Cursor"]
  /** The item at the end of the edge. */
  node?: Maybe<Feature>
}

export type FeatureOrder = {
  direction: OrderDirection
  field?: InputMaybe<FeatureOrderField>
}

export enum FeatureOrderField {
  Name = "NAME",
}

export type FeatureState = {
  account?: Maybe<Account>
  enabled: Scalars["Boolean"]
  governance?: Maybe<Governance>
  name: Scalars["String"]
  organization?: Maybe<Organization>
}

/** The `File` type, represents the response of uploading a file. */
export type File = {
  contentType: Scalars["String"]
  id: Scalars["String"]
  metadata: Image
  name: Scalars["String"]
  url: Scalars["String"]
}

export type GnosisSafe = {
  /** Values of all Tokens in this Gnosis Safe */
  balance?: Maybe<Treasury>
  collectibles?: Maybe<Array<Maybe<Collectible>>>
  /** GnosisSafe smart contract AccountID. */
  id: Scalars["AccountID"]
  /** GnosisSafe name to help distinguish it. */
  name?: Maybe<Scalars["String"]>
  /** A counter of the amount of transactions executed on the safe. */
  nonce: Scalars["Int"]
  /** A list of owner Accounts.  The Account includes participations, but we haven't included gnosis safe owners or signers in the participations yet. */
  owners: Array<Account>
  /** The amount of confirmations (owner signatures) that are required to execute a transaction. */
  threshold: Scalars["Int"]
  /** GnosisSafe smart contract version. */
  version: Scalars["String"]
}

/** A transaction can be `SUBMITTED` or `EXECUTED`. An `EXECUTED` transaction will include a block and an on chain txHashID. */
export type GnosisSafeTransaction = {
  /** `Block` at which this safe transaction was executed. */
  block?: Maybe<Block>
  /** Describes what happens if it is executed.  This includes a `target` smart contract address as well as the method and input data being used to make the call.  A call can have an unlimited amount of nested `parameters` which can have their own calls in the case of a common initial call to a multisend contract.  Each call includes a `recipe` placeholder if the call was created on Tally. */
  call?: Maybe<ExecutableCall>
  /** All the owners that have signed the transaction. */
  confirmations: Array<Confirmation>
  /** Chain scoped safeTxHash- https://github.com/safe-global/safe-contracts/blob/da66b45ec87d2fb6da7dfd837b29eacdb9a604c5/contracts/GnosisSafe.sol#L353-L394. */
  id: Scalars["HashID"]
  /** Current counter of multisig transactions executed on this safe.  No two transactions on this contract will have the same `nonce`. */
  nonce?: Maybe<Scalars["BigInt"]>
  /** `GnosisSafe` smart contract AccountID. */
  safeID: Scalars["AccountID"]
  /** Chain scoped safeTxHash- https://github.com/safe-global/safe-contracts/blob/da66b45ec87d2fb6da7dfd837b29eacdb9a604c5/contracts/GnosisSafe.sol#L353-L394. */
  safeTxHashID?: Maybe<Scalars["HashID"]>
  /** Executed transaction verified signatures. */
  signatures?: Maybe<Scalars["Bytes"]>
  /** A list of all states the transaction has been through with a timestamp.  A transaction can be `SUBMITTED` or `EXECUTED`.  Similar to a governor proposal. */
  statusChanges: Array<GnosisStatusChange>
  /** Ethereum transaction hash of the executed transaction. */
  txHashID?: Maybe<Scalars["HashID"]>
}

export type GnosisStatusChange = {
  timestamp: Scalars["Timestamp"]
  type: GnosisStatusChangeType
}

export enum GnosisStatusChangeType {
  Executed = "EXECUTED",
  Submitted = "SUBMITTED",
}

export type Governance = {
  active: Scalars["Boolean"]
  balance: Scalars["BigInt"]
  chainId: Scalars["ChainID"]
  contracts: Contracts
  delegatedVotingPower: Scalars["BigInt"]
  delegates: Array<Delegate>
  features?: Maybe<Array<FeatureState>>
  id: Scalars["AccountID"]
  kind: MultiGovernanceSupport
  name: Scalars["String"]
  organization: Organization
  parameters: GovernanceParameters
  proposals: Array<Proposal>
  quorum: Scalars["BigInt"]
  slug: Scalars["String"]
  stats: GovernanceStats
  tallyProposals: Array<TallyProposal>
  timelockId?: Maybe<Scalars["AccountID"]>
  tokens: Array<Token>
}

export type GovernanceBalanceArgs = {
  id: Scalars["AccountID"]
}

export type GovernanceDelegatedVotingPowerArgs = {
  id: Scalars["AccountID"]
}

export type GovernanceDelegatesArgs = {
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<DelegateSort>
}

export type GovernanceProposalsArgs = {
  pagination?: InputMaybe<Pagination>
  proposalIds?: InputMaybe<Array<Scalars["ID"]>>
  proposerIds?: InputMaybe<Array<Scalars["AccountID"]>>
  proposers?: InputMaybe<Array<Scalars["Address"]>>
  sort?: InputMaybe<ProposalSort>
}

export type GovernanceTallyProposalsArgs = {
  creatorIds?: InputMaybe<Array<Scalars["AccountID"]>>
  ids?: InputMaybe<Array<Scalars["ID"]>>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<TallyProposalSort>
}

export type GovernanceArgs = {
  id: Scalars["AccountID"]
  start: Scalars["Long"]
  type: GovernanceType
}

export type GovernanceParameters =
  | GovernorAaveParameters
  | GovernorAlphaParameters
  | GovernorBravoParameters
  | OpenZeppelinGovernorParameters

export type GovernanceSort = {
  field?: InputMaybe<GovernanceSortField>
  order?: InputMaybe<SortOrder>
}

export enum GovernanceSortField {
  ActiveProposals = "ACTIVE_PROPOSALS",
  TotalProposals = "TOTAL_PROPOSALS",
}

export type GovernanceStats = {
  proposals: ProposalStats
  tokens: GovernanceTokenStats
}

export type GovernanceSync = {
  id: Scalars["AccountID"]
  start: Scalars["Long"]
  tokenId: Scalars["AssetID"]
  type: GovernanceType
}

export type GovernanceTokenStats = {
  delegatedVotingPower: Scalars["BigInt"]
  owners: Scalars["Int"]
  supply: Scalars["BigInt"]
  voters: Scalars["Int"]
}

export enum GovernanceType {
  Aave = "AAVE",
  Governoralpha = "GOVERNORALPHA",
  Governorbravo = "GOVERNORBRAVO",
  Openzeppelingovernor = "OPENZEPPELINGOVERNOR",
}

export type GovernanceTypeData = {
  name: Scalars["String"]
  type: GovernanceType
}

/** Core type that describes an onchain Governor contract */
export type Governor = {
  /** Current tokens owned by a particular address */
  balance: Scalars["BigInt"]
  /** Current voting power of a particular address */
  delegatedVotingPower: Scalars["BigInt"]
  /** List of users that can currently create proposals and vote. */
  delegates: Array<Participation>
  id: Scalars["AccountID"]
  /** Last block that Tally has indexed.  Sometimes our indexer needs to catch up.  Our indexer is usually ~1min behind depending on chain so we don't serve data that might later be reorged. */
  lastIndexedBlock: Block
  /** Tally name of the governor contract */
  name: Scalars["String"]
  parameters: GovernorParameters
  /** Counts of total, active, failed, and passed proosals. */
  proposalStats: ProposalStats
  /** Proposals created using this Governor contract */
  proposals: Array<Proposal>
  /** The minumum amount of votes (total or for depending on type) that are currently required to pass a proposal. */
  quorum: Scalars["BigInt"]
  /** Tally slug used for this goverance: tally.xyz/gov/[slug] */
  slug: Scalars["String"]
  /** Chain scoped address of the timelock contract for this governor if it exists. */
  timelockId?: Maybe<Scalars["AccountID"]>
  /** List of related tokens used to operate this contract.  Most governors only have one. */
  tokens: Array<Token>
  /** Governor contract type */
  type: GovernorType
}

/** Core type that describes an onchain Governor contract */
export type GovernorBalanceArgs = {
  id: Scalars["AccountID"]
}

/** Core type that describes an onchain Governor contract */
export type GovernorDelegatedVotingPowerArgs = {
  id: Scalars["AccountID"]
}

/** Core type that describes an onchain Governor contract */
export type GovernorDelegatesArgs = {
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<DelegateSort>
}

/** Core type that describes an onchain Governor contract */
export type GovernorProposalsArgs = {
  pagination?: InputMaybe<Pagination>
  proposalIds?: InputMaybe<Array<Scalars["ID"]>>
  proposerIds?: InputMaybe<Array<Scalars["AccountID"]>>
  proposers?: InputMaybe<Array<Scalars["Address"]>>
  sort?: InputMaybe<ProposalSort>
}

export type GovernorAaveParameters = {
  proposalThreshold: Scalars["BigInt"]
  quorumDenominator?: Maybe<Scalars["BigInt"]>
  quorumNumerator?: Maybe<Scalars["BigInt"]>
  quorumVotes?: Maybe<Scalars["BigInt"]>
  votingDelay: Scalars["BigInt"]
  votingPeriod: Scalars["BigInt"]
}

export type GovernorAlphaParameters = {
  /** Amount of votes needed to create a proposal */
  proposalThreshold: Scalars["BigInt"]
  /** If the governor supports fractional quorum the denominatior of the quorum fraction */
  quorumDenominator?: Maybe<Scalars["BigInt"]>
  /** If the governor supports fractional quorum the numerator of the quorum fraction */
  quorumNumerator?: Maybe<Scalars["BigInt"]>
  /** Amount of votes needed for a proposal to qualify for passing */
  quorumVotes?: Maybe<Scalars["BigInt"]>
  /** Amount of blocks before a proposal can be voted on */
  votingDelay: Scalars["BigInt"]
  /** Amount of blocks a proposal remains active */
  votingPeriod: Scalars["BigInt"]
}

export type GovernorBravoParameters = {
  /** Amount of votes needed to create a proposal */
  proposalThreshold: Scalars["BigInt"]
  /** If the governor supports fractional quorum the denominatior of the quorum fraction */
  quorumDenominator?: Maybe<Scalars["BigInt"]>
  /** If the governor supports fractional quorum the numerator of the quorum fraction */
  quorumNumerator?: Maybe<Scalars["BigInt"]>
  /** Amount of votes needed for a proposal to qualify for passing */
  quorumVotes?: Maybe<Scalars["BigInt"]>
  /** Amount of blocks before a proposal can be voted on */
  votingDelay: Scalars["BigInt"]
  /** Amount of blocks a proposal remains active */
  votingPeriod: Scalars["BigInt"]
}

export type GovernorContract = {
  address: Scalars["Address"]
  lastBlock: Scalars["Long"]
  type: GovernanceType
}

export type GovernorExecutableCallInput = {
  /** Input data that will be sent to the target method.  Individual parameters derived from this data are available on the parameters field if decoding succeeds. */
  data: Scalars["Bytes"]
  /** Media context i.e. invoice file */
  media?: InputMaybe<Scalars["String"]>
  /** Transfer recipe memo */
  memo?: InputMaybe<Scalars["String"]>
  /** Method to be called on the target smart contract. */
  method?: InputMaybe<Scalars["String"]>
  /** Tally `Recipe` that was used to create this call. */
  recipe: Recipe
  /** `AccountID` of contract that will be called. */
  target: Scalars["AccountID"]
  /** Amount of native asset that will be sent to the target contract & method. */
  value: Scalars["BigInt"]
}

export type GovernorParameters =
  | GovernorAaveParameters
  | GovernorAlphaParameters
  | GovernorBravoParameters
  | OpenZeppelinGovernorParameters

export type GovernorSort = {
  field?: InputMaybe<GovernorSortField>
  order?: InputMaybe<SortOrder>
}

export enum GovernorSortField {
  ActiveProposals = "ACTIVE_PROPOSALS",
  TotalProposals = "TOTAL_PROPOSALS",
}

/** Current token stats */
export type GovernorTokenStats = {
  /** Total delegated voting power from `DelegateVotesChanged` events */
  delegatedVotingPower: Scalars["BigInt"]
  /** Number of addresses with non-zero balances of this token derived from `Transfer` events */
  owners: Scalars["Int"]
  /** Supply derived from `Transfer` events */
  supply: Scalars["BigInt"]
  /** Number of addresses with non-zero voting power of this token derived from `DelegateVotesChanged` events */
  voters: Scalars["Int"]
}

/** Governor contract type */
export enum GovernorType {
  Aave = "AAVE",
  Governoralpha = "GOVERNORALPHA",
  Governorbravo = "GOVERNORBRAVO",
  Openzeppelingovernor = "OPENZEPPELINGOVERNOR",
}

/** Identity Providers associated with an `Account`. */
export type Identities = {
  /** Ethereum Name Service */
  ens?: Maybe<Scalars["String"]>
  twitter?: Maybe<Scalars["String"]>
}

export type IdentitiesInput = {
  twitter?: InputMaybe<TwitterIdentity>
}

export type Image = {
  thumbnail?: Maybe<Scalars["String"]>
  url?: Maybe<Scalars["String"]>
}

export type Member = {
  account: Account
  id: Scalars["ID"]
  organization: Organization
  /** Number of polls the member has voted on. */
  pollVotesCount: Scalars["Int"]
  role: OrganizationRole
}

export type MemberSort = {
  field: MemberSortField
  order: SortOrder
}

export enum MemberSortField {
  PollsVoteCount = "POLLS_VOTE_COUNT",
}

export enum MultiGovernanceSupport {
  MultiGovPrimary = "MULTI_GOV_PRIMARY",
  MultiGovSecondary = "MULTI_GOV_SECONDARY",
  SingleGov = "SINGLE_GOV",
}

export type Mutation = {
  analyticsBackfill: Scalars["Boolean"]
  /** Creates an API Key for the logged in User */
  createAPIKey: Scalars["String"]
  /** Creates an API User and returns a key that can be used to access the API */
  createAPIUser: Scalars["String"]
  createDelegateStatement: DelegateStatement
  /** Creates a Governance on Tally associated with an Organization.  If the Governance is already indexed it only updates the Organization. */
  createGovernance: Scalars["Boolean"]
  /** Creates an organization with a governor and token. */
  createGovernorOrganization: Organization
  /** Creates an organization for a group. Adds a demo proposal for that group. */
  createGroupOrganization: Organization
  createOrganization: Organization
  createPoll: Scalars["String"]
  /** Creates a `TallyProposal`. Returns a TallyProposal ID. */
  createProposal: Scalars["ID"]
  createProposalActionAttempt: Scalars["Boolean"]
  /** Creates a `TallyProposal` with a `Poll`, which immediately begins voting. Returns a Poll ID. */
  createProposalWithPoll: Scalars["ID"]
  /** Creates a `TallyProposal` with a `Poll` for a Group. Returns a Poll ID. */
  createProposalWithPollForGroup: Scalars["ID"]
  /** Much like governors we can add a safe to an existing DAO.  A DAO can have an unlimited amount of `GnosisSafe`s. */
  createSafe: Scalars["Boolean"]
  /** Begins indexer sync for the requested token */
  createToken: Scalars["Boolean"]
  /** Creates a `VoteAttempt` with the user intended vote and support data */
  createVoteAttempt: Scalars["Boolean"]
  deleteSync: Scalars["Boolean"]
  /** Adds the authenticated user to the organization. */
  joinOrganization: Scalars["Boolean"]
  /** Links a Governance to an Organization if it is unlinked.  Fails if Governance doesn't exist or isn't indexed. */
  linkGovernance: Governance
  login: Scalars["String"]
  logout: Scalars["Boolean"]
  runProposalSimulation: Array<Simulation>
  /** Unlinks a Safe from it's Organization for linking to other Organizations */
  unlinkGnosisSafe: Scalars["Boolean"]
  /** Unlinks a Governance from it's Organization for linking to other Organizations */
  unlinkGovernance: Governance
  /** Updates tally stored `Account` metadata (name, bio, picture, email, identity providers, etc) */
  updateAccount: Scalars["Boolean"]
  /** Updates an Account for a user via their account id */
  updateAccountByID: Scalars["Boolean"]
  updateChain: Chain
  updateFeature: FeatureState
  /** Updates a Governance data using the given input parameters */
  updateGovernance: Governance
  updateOrganization: Organization
  /** Updates the admins of organization. `remove` should be a list of member IDs. */
  updateOrganizationAdmins: Scalars["Boolean"]
  /** Updates the organization password. */
  updateOrganizationPassword: Scalars["Boolean"]
  /** Updates the voting parameters of organization. */
  updateOrganizationVotingParameters: Scalars["Boolean"]
  updateParametersOZ: Scalars["Boolean"]
  /** Updates a `TallyProposal`. */
  updateProposal: Scalars["Boolean"]
  /** We are able to use updateSafe to change a gnosis safe name. */
  updateSafe: Scalars["Boolean"]
  upload: File
  vote: Scalars["Boolean"]
}

export type MutationCreateApiKeyArgs = {
  name?: InputMaybe<Scalars["String"]>
}

export type MutationCreateApiUserArgs = {
  email: Scalars["String"]
}

export type MutationCreateDelegateStatementArgs = {
  dataSource: DelegateStatementSource
  dataSourceURL?: InputMaybe<Scalars["String"]>
  delegateAddress: Scalars["Address"]
  delegateStatement: Scalars["String"]
  delegateStatementSummary?: InputMaybe<Scalars["String"]>
  discourseProfileLink?: InputMaybe<Scalars["String"]>
  discourseUserName?: InputMaybe<Scalars["String"]>
  organizationID: Scalars["String"]
  seekingDelegations?: InputMaybe<Scalars["Boolean"]>
}

export type MutationCreateGovernanceArgs = {
  address: Scalars["Address"]
  chainId: Scalars["ChainID"]
  name?: InputMaybe<Scalars["String"]>
  organization: Scalars["ID"]
  slug?: InputMaybe<Scalars["String"]>
  start: Scalars["Long"]
  tokenId: Scalars["AssetID"]
  type: GovernanceType
}

export type MutationCreateGovernorOrganizationArgs = {
  governanceArgs: GovernanceArgs
  orgArgs: OrganizationArgs
  tokenArgs: TokenArgs
}

export type MutationCreateGroupOrganizationArgs = {
  orgArgs: OrganizationArgs
}

export type MutationCreateOrganizationArgs = {
  color?: InputMaybe<Scalars["String"]>
  contact?: InputMaybe<ContactInformationInput>
  description?: InputMaybe<Scalars["String"]>
  icon?: InputMaybe<Scalars["String"]>
  name: Scalars["String"]
  orgUxVersion: OrgUxVersion
  socialProfiles?: InputMaybe<SocialProfilesInput>
  website?: InputMaybe<Scalars["String"]>
}

export type MutationCreatePollArgs = {
  proposalId: Scalars["ID"]
}

export type MutationCreateProposalArgs = {
  choices?: InputMaybe<Array<Scalars["String"]>>
  description: Scalars["String"]
  governanceId: Scalars["AccountID"]
  governorExecutableCalls: Array<GovernorExecutableCallInput>
  simulationValue?: InputMaybe<Scalars["BigInt"]>
  title: Scalars["String"]
  txHash?: InputMaybe<Scalars["String"]>
}

export type MutationCreateProposalActionAttemptArgs = {
  actionType: ProposalActionType
  actionUser: Scalars["AccountID"]
  governanceId: Scalars["AccountID"]
  proposalId: Scalars["ID"]
  txID: Scalars["Bytes32"]
}

export type MutationCreateProposalWithPollArgs = {
  choices?: InputMaybe<Array<Scalars["String"]>>
  description: Scalars["String"]
  governanceId: Scalars["AccountID"]
  title: Scalars["String"]
}

export type MutationCreateProposalWithPollForGroupArgs = {
  choices?: InputMaybe<Array<Scalars["String"]>>
  description: Scalars["String"]
  organizationId: Scalars["ID"]
  title: Scalars["String"]
}

export type MutationCreateSafeArgs = {
  id: Scalars["AccountID"]
  name?: InputMaybe<Scalars["String"]>
  organization: Scalars["ID"]
}

export type MutationCreateTokenArgs = {
  id: Scalars["AssetID"]
  start: Scalars["Long"]
}

export type MutationCreateVoteAttemptArgs = {
  governanceId: Scalars["AccountID"]
  proposalId: Scalars["ID"]
  support: SupportType
  txID: Scalars["Bytes32"]
  voter: Scalars["AccountID"]
}

export type MutationDeleteSyncArgs = {
  accountID?: InputMaybe<Scalars["AccountID"]>
}

export type MutationJoinOrganizationArgs = {
  id: Scalars["ID"]
  password?: InputMaybe<Scalars["String"]>
}

export type MutationLinkGovernanceArgs = {
  id: Scalars["AccountID"]
  organizationId: Scalars["ID"]
}

export type MutationLoginArgs = {
  message: Scalars["String"]
  signature: Scalars["String"]
}

export type MutationRunProposalSimulationArgs = {
  proposalID: Scalars["ID"]
  value?: InputMaybe<Scalars["BigInt"]>
}

export type MutationUnlinkGnosisSafeArgs = {
  id: Scalars["AccountID"]
}

export type MutationUnlinkGovernanceArgs = {
  id: Scalars["AccountID"]
}

export type MutationUpdateAccountArgs = {
  bio?: InputMaybe<Scalars["String"]>
  email?: InputMaybe<Scalars["String"]>
  identities?: InputMaybe<IdentitiesInput>
  name?: InputMaybe<Scalars["String"]>
  otherLinks?: InputMaybe<Array<InputMaybe<OtherLinkInput>>>
  picture?: InputMaybe<Scalars["String"]>
}

export type MutationUpdateAccountByIdArgs = {
  bio?: InputMaybe<Scalars["String"]>
  email?: InputMaybe<Scalars["String"]>
  id: Scalars["AccountID"]
  identities?: InputMaybe<IdentitiesInput>
  name?: InputMaybe<Scalars["String"]>
  otherLinks?: InputMaybe<Array<InputMaybe<OtherLinkInput>>>
  picture?: InputMaybe<Scalars["String"]>
}

export type MutationUpdateChainArgs = {
  blockExplorerURL?: InputMaybe<Scalars["String"]>
  id: Scalars["ChainID"]
  rpcURL?: InputMaybe<Scalars["String"]>
}

export type MutationUpdateFeatureArgs = {
  accountID?: InputMaybe<Scalars["AccountID"]>
  governanceID?: InputMaybe<Scalars["AccountID"]>
  name: Scalars["String"]
  organizationID?: InputMaybe<Scalars["ID"]>
  value: Scalars["Boolean"]
}

export type MutationUpdateGovernanceArgs = {
  active?: InputMaybe<Scalars["Boolean"]>
  governanceId: Scalars["AccountID"]
  name?: InputMaybe<Scalars["String"]>
  slug?: InputMaybe<Scalars["String"]>
}

export type MutationUpdateOrganizationArgs = {
  color?: InputMaybe<Scalars["String"]>
  contact?: InputMaybe<ContactInformationInput>
  description?: InputMaybe<Scalars["String"]>
  icon?: InputMaybe<Scalars["String"]>
  id: Scalars["ID"]
  name?: InputMaybe<Scalars["String"]>
  slug?: InputMaybe<Scalars["String"]>
  socialProfiles?: InputMaybe<SocialProfilesInput>
  website?: InputMaybe<Scalars["String"]>
}

export type MutationUpdateOrganizationAdminsArgs = {
  add?: InputMaybe<Array<AddAdmin>>
  id: Scalars["ID"]
  remove?: InputMaybe<Array<Scalars["ID"]>>
}

export type MutationUpdateOrganizationPasswordArgs = {
  id: Scalars["ID"]
  password: Scalars["String"]
}

export type MutationUpdateOrganizationVotingParametersArgs = {
  id: Scalars["ID"]
  parameters: UpdateVoteParameters
}

export type MutationUpdateProposalArgs = {
  governanceId: Scalars["AccountID"]
  proposalId: Scalars["ID"]
  update: UpdateProposalInput
}

export type MutationUpdateSafeArgs = {
  id: Scalars["AccountID"]
  name: Scalars["String"]
}

export type MutationUploadArgs = {
  file: UploadFile
}

export type MutationVoteArgs = {
  choice?: InputMaybe<Scalars["String"]>
  message: Scalars["String"]
  pollId: Scalars["ID"]
  reason?: InputMaybe<Scalars["String"]>
  signature: Scalars["String"]
  support?: InputMaybe<Scalars["String"]>
}

export type NativeCurrency = {
  /** Decimals of the Currency. e.g.: 18 */
  decimals: Scalars["Long"]
  /** Name of the Currency. e.g.: Ether */
  name: Scalars["String"]
  /** Symbol of the Currency. e.g.: ETH */
  symbol: Scalars["String"]
}

/**
 * An object with an ID.
 * Follows the [Relay Global Object Identification Specification](https://relay.dev/graphql/objectidentification.htm)
 */
export type Node = {
  /** The id of the object. */
  id: Scalars["ID"]
}

export type OpenZeppelinGovernorParameters = {
  /** Amount of votes needed to create a proposal */
  proposalThreshold: Scalars["BigInt"]
  /** If the governor supports fractional quorum the denominatior of the quorum fraction */
  quorumDenominator?: Maybe<Scalars["BigInt"]>
  /** If the governor supports fractional quorum the numerator of the quorum fraction */
  quorumNumerator?: Maybe<Scalars["BigInt"]>
  /** Amount of votes needed for a proposal to qualify for passing */
  quorumVotes?: Maybe<Scalars["BigInt"]>
  /** Amount of blocks before a proposal can be voted on */
  votingDelay: Scalars["BigInt"]
  /** Amount of blocks a proposal remains active */
  votingPeriod: Scalars["BigInt"]
}

export enum OrderDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type OrgMember = {
  id: Scalars["AccountID"]
  role?: InputMaybe<OrganizationRole>
}

export enum OrgUxVersion {
  Governor = "governor",
  Tokenless = "tokenless",
}

export type Organization = {
  /** Can only be accessed by a TallyAdmin or Organization Admin */
  adminData?: Maybe<OrganizationAdminData>
  creator?: Maybe<Account>
  description?: Maybe<Scalars["String"]>
  features?: Maybe<Array<FeatureState>>
  governances: Array<Governance>
  id: Scalars["ID"]
  /** Returns members of the organization, optional `roles` filter. */
  members: Array<Member>
  myRole?: Maybe<OrganizationRole>
  name: Scalars["String"]
  requiresPasswordToJoin: Scalars["Boolean"]
  slug: Scalars["String"]
  socialProfiles?: Maybe<SocialProfiles>
  /** Organization type, for UX purposes only. */
  uxVersion: OrgUxVersion
  visual: Visual
  votingParameters?: Maybe<VotingParameters>
  website?: Maybe<Scalars["String"]>
}

export type OrganizationGovernancesArgs = {
  chainIds?: InputMaybe<Array<Scalars["ChainID"]>>
  ids?: InputMaybe<Array<Scalars["AccountID"]>>
  includeInactive?: InputMaybe<Scalars["Boolean"]>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<GovernanceSort>
}

export type OrganizationMembersArgs = {
  pagination?: InputMaybe<Pagination>
  roles?: InputMaybe<Array<OrganizationRole>>
  sort?: InputMaybe<MemberSort>
}

export type OrganizationAdminData = {
  contact?: Maybe<ContactInformation>
  password?: Maybe<Scalars["String"]>
}

export type OrganizationArgs = {
  description?: InputMaybe<Scalars["String"]>
  name: Scalars["String"]
}

export enum OrganizationRole {
  Admin = "ADMIN",
  Member = "MEMBER",
  Superadmin = "SUPERADMIN",
}

export type OrganizationSort = {
  field?: InputMaybe<OrganizationSortField>
  order?: InputMaybe<SortOrder>
}

export enum OrganizationSortField {
  Id = "ID",
  Name = "NAME",
}

export type OtherLink = {
  label: Scalars["String"]
  value: Scalars["String"]
}

export type OtherLinkInput = {
  label: Scalars["String"]
  value: Scalars["String"]
}

export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["Cursor"]>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"]
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"]
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["Cursor"]>
}

export type Pagination = {
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
}

/** Convenience type representing the activity a particular `Account` has in a `Governor` contract or it's related `Token` contract. */
export type Participation = {
  account: Account
  /** Delegation of voting power of this `account` to another `account`.  An `account` can delegate to itself and often that is required in order for voting power to be counted. */
  delegationOut?: Maybe<Delegation>
  /** Delegations of voting power made to this `account` */
  delegationsIn: Array<Delegation>
  /** @deprecated use `governor` selector instead */
  governance: Governance
  governor: Governor
  /** Proposals created by this `account` */
  proposals: Array<Proposal>
  /** Aggregations of account activity in this governor */
  stats: ParticipationStats
  /** Votes made by the `account` on the `governor` */
  votes: Array<Vote>
  /** Query voting power changes for this `account` on this `governor`.  You can request all changes or aggregate over an interval using the `interval` parameter. */
  votingPowerChanges: Array<VotingPowerChange>
  /** @deprecated `votingPowerChanges` is a better name */
  weightChanges: Array<DelegationWeightChange>
}

/** Convenience type representing the activity a particular `Account` has in a `Governor` contract or it's related `Token` contract. */
export type ParticipationDelegationsInArgs = {
  pagination?: InputMaybe<Pagination>
}

/** Convenience type representing the activity a particular `Account` has in a `Governor` contract or it's related `Token` contract. */
export type ParticipationProposalsArgs = {
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<ProposalSort>
}

/** Convenience type representing the activity a particular `Account` has in a `Governor` contract or it's related `Token` contract. */
export type ParticipationVotesArgs = {
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<VoteSort>
}

/** Convenience type representing the activity a particular `Account` has in a `Governor` contract or it's related `Token` contract. */
export type ParticipationVotingPowerChangesArgs = {
  earliest?: InputMaybe<Scalars["Timestamp"]>
  interval?: InputMaybe<TimeInterval>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<VotingPowerChangeSort>
}

/** Convenience type representing the activity a particular `Account` has in a `Governor` contract or it's related `Token` contract. */
export type ParticipationWeightChangesArgs = {
  earliest?: InputMaybe<Scalars["Timestamp"]>
  interval?: InputMaybe<TimeInterval>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<DelegationWeightChangeSort>
}

export type ParticipationDelegationStats = {
  /** Total count of delegations to this `Account` including self-delegation if present */
  total: Scalars["Int"]
}

export type ParticipationProposalStats = {
  /** Number of proposals created by this `Account */
  total: Scalars["Int"]
}

/** Number of votes on the last 10 proposals if there are at least ten made on this contract.  If there are not 10 proposals the amount of proposals is provided as `recentProposalCount`. */
export type ParticipationRate = {
  /** 10 or the number of proposals on this `Governor` if less than 10 */
  recentProposalCount: Scalars["Int"]
  /** Number of votes on the last 10 proposals on this `Governor` */
  recentVoteCount: Scalars["Int"]
}

/** Statistics about an `Account`'s participation in a `Governor` */
export type ParticipationStats = {
  /** Current overall number of delegations that delegate non-zero voting power */
  activeDelegationCount: Scalars["Int"]
  /** Number of proposals created by this `Account */
  createdProposalsCount: Scalars["Int"]
  /** Current overall number of delegations include those that delegate zero voting power */
  delegationCount: Scalars["Int"]
  /** @deprecated use `delegationCount` or `activeDelegationCount` instead. */
  delegations: ParticipationDelegationStats
  /** @deprecated use `recentParticipationRate` instead. */
  participationRate: ParticipationRate
  /** @deprecated use `createdProposalsCount` instead. */
  proposals: ParticipationProposalStats
  /** Number of votes on the last 10 proposals if there are at least ten made on this contract.  If there are not at least 10 proposals the amount of proposals is provided as `recentProposalCount`. */
  recentParticipationRate: ParticipationRate
  /** Current number of tokens owned by this `Account` */
  tokenBalance: Scalars["BigInt"]
  /** Number of votes made by this `Account` */
  voteCount: Scalars["Int"]
  /** @deprecated use `voteCount` instead. */
  votes: ParticipationVoteStats
  /** Current voting power information including total in & out */
  votingPower: ParticipationVotingPowerStats
  /** @deprecated use `votingPower` instead. */
  weight: ParticipationWeightStats
}

/** Statistics about an `Account`'s participation in a `Governor` */
export type ParticipationStatsDelegationsArgs = {
  excludeZeroWeight?: InputMaybe<Scalars["Boolean"]>
}

export type ParticipationVoteStats = {
  /** Number of votes made by this `Account` */
  total: Scalars["Int"]
}

export type ParticipationVotingPowerStats = {
  /** Total current voting power delegated to this `Account` including self-delegation if present */
  in: Scalars["BigInt"]
  /** Total current voting power for this `Account` */
  net: Scalars["BigInt"]
  /** Total voting power delegated to another `Account` */
  out: Scalars["BigInt"]
}

export type ParticipationWeightStats = {
  /** Total current voting power delegated in/out of this `Account` */
  delegations: DelegationWeightStats
  /** Current number of tokens owned by this `Account` */
  owned: Scalars["BigInt"]
  /** Total current voting power for this `Account` */
  total: Scalars["BigInt"]
}

export type Poll = {
  author: Account
  createdAt: Scalars["Timestamp"]
  end: Scalars["BigInt"]
  endTs: Scalars["Timestamp"]
  id: Scalars["ID"]
  myVotingPower: Scalars["BigInt"]
  pollVoteStats?: Maybe<Array<PollVoteStat>>
  quorum: Scalars["BigInt"]
  snapshot: Scalars["BigInt"]
  start: Scalars["BigInt"]
  startTs: Scalars["Timestamp"]
  status: PollStatus
  tallyProposal: TallyProposal
  voteStats?: Maybe<Array<VoteStat>>
  votes?: Maybe<Array<PollVote>>
}

export type PollVotesArgs = {
  pagination?: InputMaybe<Pagination>
}

export enum PollStatus {
  Active = "ACTIVE",
  Draft = "DRAFT",
  Ended = "ENDED",
}

export type PollVote = {
  createdAt: Scalars["Timestamp"]
  id: Scalars["ID"]
  reason?: Maybe<Scalars["String"]>
  support: Scalars["String"]
  voter: Account
  weight: Scalars["BigInt"]
}

export type PollVoteStat = {
  percent: Scalars["Float"]
  support: Scalars["String"]
  votes: Scalars["BigInt"]
  weight: Scalars["BigInt"]
}

/** Core type that describes a proposal created by an onchain Governor contract */
export type Proposal = {
  /**
   * `Block` at proposal creation
   * @deprecated selector `createdTransaction` contains the creation block
   */
  block: Block
  /** `Transaction` that created this proposal */
  createdTransaction: Transaction
  /** Proposal description onchain */
  description: Scalars["String"]
  /** Last block when you can cast a vote */
  end: Block
  /** Time at which a proposal can be executed */
  eta?: Maybe<Scalars["BigInt"]>
  /** Payload that can be executed after the proposal passes */
  executable: Executable
  /**
   * Governor contract details
   * @deprecated selector `Governor` returns the new type
   */
  governance: Governance
  /**
   * Governor contract `AccountID`
   * @deprecated selector `Governor` contains governor contract `id`
   */
  governanceId: Scalars["AccountID"]
  /** Governor contract details */
  governor: Governor
  /**
   * Hash of `Transaction` that created this proposal
   * @deprecated selector `createdTransaction` contains the creation transaction hash
   */
  hash: Scalars["String"]
  /** Chain Scoped onchain Proposal ID */
  id: Scalars["ID"]
  /** `Account` that created this proposal */
  proposer: Account
  /** First block when you can cast a vote, also the time when quorum is established */
  start: Block
  /** List of state transitions for this proposal.  The last `StatusChange` is the current state. */
  statusChanges?: Maybe<Array<StatusChange>>
  /** Tally draft if exists */
  tallyProposal?: Maybe<TallyProposal>
  /** Proposal title: usually first line of description */
  title: Scalars["String"]
  /** Summary of voting by vote choice */
  voteStats?: Maybe<Array<VoteStat>>
  /** List of votes on this proposal */
  votes?: Maybe<Array<Vote>>
  /** Voting power of a given address on this proposal */
  votingPower: Scalars["BigInt"]
}

/** Core type that describes a proposal created by an onchain Governor contract */
export type ProposalVotesArgs = {
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<VoteSort>
  voters?: InputMaybe<Array<Scalars["Address"]>>
}

/** Core type that describes a proposal created by an onchain Governor contract */
export type ProposalVotingPowerArgs = {
  id: Scalars["AccountID"]
}

/** The `ProposalActionAttempt` type represents the stored attempt of a user attempting an action on a `Proposal`. */
export type ProposalActionAttempt = {
  actionType: ProposalActionType
  actionUser: Account
  createdAt: Scalars["Timestamp"]
  proposal: Proposal
  txID: Scalars["HashID"]
}

/** The `ProposalActionType` type represents the attempted action on a `Proposal` as part of a `ProposalActionAttempt`. */
export enum ProposalActionType {
  Cancel = "CANCEL",
  Execute = "EXECUTE",
  Queue = "QUEUE",
}

export type ProposalSort = {
  field?: InputMaybe<ProposalSortField>
  order?: InputMaybe<SortOrder>
}

export enum ProposalSortField {
  CreatedAt = "CREATED_AT",
  EndBlock = "END_BLOCK",
  ExecutionEta = "EXECUTION_ETA",
  StartBlock = "START_BLOCK",
}

export type ProposalStats = {
  /** Total count of active proposals */
  active: Scalars["Int"]
  /** Total count of failed proposals including quorum not reached */
  failed: Scalars["Int"]
  /** Total count of passed proposals */
  passed: Scalars["Int"]
  /** Total count of proposals */
  total: Scalars["Int"]
}

export enum ProposalStatusType {
  /** Voting is in progress. */
  Active = "ACTIVE",
  /** Proposal has been canceled.  This is a final status. */
  Canceled = "CANCELED",
  /** Proposal has been defeated.  This proposal cannot be queued or excuted.  This is a final status. */
  Defeated = "DEFEATED",
  /** Proposal has been executed.  This is a final status. */
  Executed = "EXECUTED",
  /** Proposal has expired.  This is a final status. */
  Expired = "EXPIRED",
  /** Proposal has been created, but voting has not started.  An address can still accumulate voting power. */
  Pending = "PENDING",
  /** Proposal has queued into a timelock.  This proposal can be excuted. */
  Queued = "QUEUED",
  /** Proposal has succeeded, it can now be queued or executed. */
  Succeeded = "SUCCEEDED",
}

export type Query = {
  /** Returns `Account` given a chain scoped `AccountID`. */
  account: Account
  /** Returns `Account` by given an ENS name. */
  accountByEns: Account
  accountDelegationsIn?: Maybe<Array<Delegation>>
  accounts: Array<Account>
  address: AddressInfo
  /** Returns the `Block` including an actual or estimated timestamp given a `BlockIDInput`. */
  block: Block
  chains: Array<Maybe<Chain>>
  createProposalSimulation: Array<Simulation>
  delegateStatement: DelegateStatement
  delegationsIn?: Maybe<Array<Delegation>>
  features: FeatureConnection
  generateAdminToolToken: Scalars["String"]
  /** Returns any `GnosisSafe`'s info given a chain scoped `AccountID`. */
  gnosisSafe: GnosisSafe
  gnosisSafeTransaction: GnosisSafeTransaction
  /** Returns a list of multisig tranasctions given a safe `AccountID`.  `Pagniation` defaults to a limit of 20 transactions if no limit is provided.  There are a number of filters and ordering settings we can support, please reach out to discuss. */
  gnosisSafeTransactions: Array<GnosisSafeTransaction>
  /** This will return a list of `GnosisSafe`s related to a DAO along with `GnosisSafe` info similar to the governances query. */
  gnosisSafes: Array<GnosisSafe>
  governance: Governance
  governanceBySlug: Governance
  governanceSyncs?: Maybe<Array<GovernanceSync>>
  governanceTypes?: Maybe<Array<GovernanceTypeData>>
  governances: Array<Governance>
  /** Returns a list of governors that match the provided filters.  Note: Tally may deactivate governors from time to time.  If you wish to include those set `includeInactive` to `true`. */
  governors: Array<Governor>
  /** [Deprecated] Returns `Account` given a legacy indentity id. */
  legacyAccount: Account
  me: Account
  /** Fetches an object given its ID. */
  node?: Maybe<Node>
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>
  organization: Organization
  organizationBySlug: Organization
  organizationSlugToId: Scalars["ID"]
  organizations: Array<Organization>
  poll: Poll
  polls: Array<Poll>
  proposal: Proposal
  proposalActionAttempt: ProposalActionAttempt
  proposals: Array<Proposal>
  tallyProposal: TallyProposal
  tallyProposals: Array<TallyProposal>
  tokenSyncs?: Maybe<Array<TokenSync>>
  /** Fetches the last vote attempt from a given user on a proposal. */
  voteAttempt: VoteAttempt
  weightChanges?: Maybe<Array<DelegationWeightChange>>
}

export type QueryAccountArgs = {
  id: Scalars["AccountID"]
}

export type QueryAccountByEnsArgs = {
  ens: Scalars["String"]
}

export type QueryAccountDelegationsInArgs = {
  accountID: Scalars["AccountID"]
  governanceId: Scalars["AccountID"]
  pagination?: InputMaybe<Pagination>
}

export type QueryAccountsArgs = {
  ids?: InputMaybe<Array<Scalars["AccountID"]>>
}

export type QueryAddressArgs = {
  address: Scalars["Address"]
}

export type QueryBlockArgs = {
  id: BlockIdInput
}

export type QueryCreateProposalSimulationArgs = {
  executableCalls: Array<GovernorExecutableCallInput>
  governanceID: Scalars["AccountID"]
  value?: InputMaybe<Scalars["BigInt"]>
}

export type QueryDelegateStatementArgs = {
  address: Scalars["Address"]
  governanceId: Scalars["AccountID"]
}

export type QueryDelegationsInArgs = {
  addresses?: InputMaybe<Array<Scalars["Address"]>>
  pagination?: InputMaybe<Pagination>
}

export type QueryFeaturesArgs = {
  after?: InputMaybe<Scalars["Cursor"]>
  before?: InputMaybe<Scalars["Cursor"]>
  first?: InputMaybe<Scalars["Int"]>
  last?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<FeatureOrder>
}

export type QueryGnosisSafeArgs = {
  id: Scalars["AccountID"]
}

export type QueryGnosisSafeTransactionArgs = {
  safeTxHashID: Scalars["HashID"]
}

export type QueryGnosisSafeTransactionsArgs = {
  gnosisSafeId: Scalars["AccountID"]
  pagination?: InputMaybe<Pagination>
}

export type QueryGnosisSafesArgs = {
  organizationIds?: InputMaybe<Array<Scalars["ID"]>>
}

export type QueryGovernanceArgs = {
  id: Scalars["AccountID"]
}

export type QueryGovernanceBySlugArgs = {
  slug: Scalars["String"]
}

export type QueryGovernanceSyncsArgs = {
  chainIds?: InputMaybe<Array<Scalars["ChainID"]>>
}

export type QueryGovernancesArgs = {
  chainIds?: InputMaybe<Array<Scalars["ChainID"]>>
  ids?: InputMaybe<Array<Scalars["AccountID"]>>
  includeInactive?: InputMaybe<Scalars["Boolean"]>
  organizationIds?: InputMaybe<Array<Scalars["ID"]>>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<GovernanceSort>
}

export type QueryGovernorsArgs = {
  chainIds?: InputMaybe<Array<Scalars["ChainID"]>>
  ids?: InputMaybe<Array<Scalars["AccountID"]>>
  includeInactive?: InputMaybe<Scalars["Boolean"]>
  organizationIds?: InputMaybe<Array<Scalars["ID"]>>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<GovernorSort>
}

export type QueryLegacyAccountArgs = {
  id: Scalars["String"]
}

export type QueryNodeArgs = {
  id: Scalars["ID"]
}

export type QueryNodesArgs = {
  ids: Array<Scalars["ID"]>
}

export type QueryOrganizationArgs = {
  id: Scalars["ID"]
}

export type QueryOrganizationBySlugArgs = {
  slug: Scalars["String"]
}

export type QueryOrganizationSlugToIdArgs = {
  slug: Scalars["String"]
}

export type QueryOrganizationsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]>>
  members?: InputMaybe<Array<OrgMember>>
  names?: InputMaybe<Array<Scalars["String"]>>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<OrganizationSort>
  websites?: InputMaybe<Array<Scalars["String"]>>
}

export type QueryPollArgs = {
  id: Scalars["ID"]
}

export type QueryPollsArgs = {
  governanceId?: InputMaybe<Scalars["AccountID"]>
  organizationId?: InputMaybe<Scalars["String"]>
  pagination?: InputMaybe<Pagination>
}

export type QueryProposalArgs = {
  governanceId: Scalars["AccountID"]
  proposalId: Scalars["ID"]
}

export type QueryProposalActionAttemptArgs = {
  actionType: ProposalActionType
  governanceId: Scalars["AccountID"]
  proposalId: Scalars["ID"]
}

export type QueryProposalsArgs = {
  chainId: Scalars["ChainID"]
  governanceIds?: InputMaybe<Array<Scalars["AccountID"]>>
  governors?: InputMaybe<Array<Scalars["Address"]>>
  pagination?: InputMaybe<Pagination>
  proposalIds?: InputMaybe<Array<Scalars["ID"]>>
  proposerIds?: InputMaybe<Array<Scalars["AccountID"]>>
  proposers?: InputMaybe<Array<Scalars["Address"]>>
  sort?: InputMaybe<ProposalSort>
}

export type QueryTallyProposalArgs = {
  id: Scalars["ID"]
}

export type QueryTallyProposalsArgs = {
  creatorIds?: InputMaybe<Array<Scalars["AccountID"]>>
  governanceIds?: InputMaybe<Array<Scalars["AccountID"]>>
  ids?: InputMaybe<Array<Scalars["ID"]>>
  organizationIds?: InputMaybe<Array<Scalars["String"]>>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<TallyProposalSort>
}

export type QueryTokenSyncsArgs = {
  chainIds?: InputMaybe<Array<Scalars["ChainID"]>>
}

export type QueryVoteAttemptArgs = {
  governanceId: Scalars["AccountID"]
  proposalId: Scalars["ID"]
  voter: Scalars["AccountID"]
}

export type QueryWeightChangesArgs = {
  accoundIDs?: InputMaybe<Array<Scalars["AccountID"]>>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<DelegationWeightChangeSort>
}

export enum Recipe {
  Custom = "CUSTOM",
  Empty = "EMPTY",
  OrcaManagePod = "ORCA_MANAGE_POD",
  TransferErc_20 = "TRANSFER_ERC_20",
  TransferNativeAsset = "TRANSFER_NATIVE_ASSET",
}

export enum Role {
  Admin = "ADMIN",
  User = "USER",
}

export type Simulation = {
  executionValue: Scalars["BigInt"]
  id: Scalars["ID"]
  raw: Scalars["String"]
  status: SimulationStatus
}

export enum SimulationStatus {
  Failed = "failed",
  Success = "success",
}

export type SocialProfiles = {
  Discord?: Maybe<Scalars["String"]>
  Others?: Maybe<Array<Maybe<OtherLink>>>
  Telegram?: Maybe<Scalars["String"]>
  Twitter?: Maybe<Scalars["String"]>
}

export type SocialProfilesInput = {
  Discord?: InputMaybe<Scalars["String"]>
  Others?: InputMaybe<Array<InputMaybe<OtherLinkInput>>>
  Telegram?: InputMaybe<Scalars["String"]>
  Twitter?: InputMaybe<Scalars["String"]>
}

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC",
}

export type StatusChange = {
  /** Transaction hash of this state transition if applicable.  Computed states do not have an associated transaction. */
  block: Block
  /**
   * Block Number of this state transition
   * @deprecated selector `block` contains the block number
   */
  blockNumber: Scalars["Long"]
  /**
   * Timestamp of this state transition
   * @deprecated selector `block` contains the block timestamp
   */
  blockTimestamp: Scalars["Timestamp"]
  transaction?: Maybe<Transaction>
  txHash?: Maybe<Scalars["String"]>
  /** Proposal State */
  type: ProposalStatusType
}

/** Vote Choice */
export enum SupportType {
  Abstain = "ABSTAIN",
  Against = "AGAINST",
  For = "FOR",
}

export type TallyProposal = {
  choices?: Maybe<Array<Scalars["String"]>>
  createdAt: Scalars["Timestamp"]
  creator: Account
  description: Scalars["String"]
  executableCalls?: Maybe<Array<ExecutableCall>>
  governance?: Maybe<Governance>
  governorProposal?: Maybe<Proposal>
  hash?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  onChainId?: Maybe<Scalars["ID"]>
  organization: Organization
  poll?: Maybe<Poll>
  status: TallyProposalStatus
  title: Scalars["String"]
}

export type TallyProposalSort = {
  field?: InputMaybe<TallyProposalSortField>
  order?: InputMaybe<SortOrder>
}

export enum TallyProposalSortField {
  CreatedAt = "CREATED_AT",
}

export enum TallyProposalStatus {
  Confirmed = "CONFIRMED",
  Draft = "DRAFT",
  Failed = "FAILED",
  Submitted = "SUBMITTED",
}

export enum TimeInterval {
  All = "ALL",
  Day = "DAY",
  Hour = "HOUR",
  Month = "MONTH",
  Quarter = "QUARTER",
  Week = "WEEK",
  Year = "YEAR",
}

/** Core type that describes an onchain Token contract */
export type Token = {
  /**
   * EVM Address on chain.  See `id` for chain id
   * @deprecated selector `id` has more context
   */
  address: Scalars["Address"]
  /** Number of decimal places included in `BigInt` values */
  decimals: Scalars["Int"]
  id: Scalars["AssetID"]
  /**
   * Last block that Tally has indexed.  Sometimes our indexer needs to catch up.  Our indexer is usually ~1min behind depending on chain so we don't serve data that might later be reorged.
   * @deprecated new selector `lastIndexedBlock` has more context
   */
  lastBlock: Scalars["Long"]
  /** Last block that Tally has indexed.  Sometimes our indexer needs to catch up.  Our indexer is usually ~1min behind depending on chain so we don't serve data that might later be reorged. */
  lastIndexedBlock: Block
  /** Onchain name */
  name: Scalars["String"]
  /** Counts of owners, voters as well as total supply and delegated voting power. */
  stats: GovernorTokenStats
  /** supply derived from `Transfer` events */
  supply: Scalars["BigInt"]
  /** Onchain symbol */
  symbol: Scalars["String"]
  /** Token contract type */
  type: TokenType
}

export type TokenArgs = {
  id: Scalars["AssetID"]
  start: Scalars["Long"]
}

export type TokenBalance = {
  address?: Maybe<Scalars["String"]>
  amount: Scalars["String"]
  decimals: Scalars["Int"]
  fiat: Scalars["String"]
  logoURI: Scalars["String"]
  name: Scalars["String"]
  symbol: Scalars["String"]
}

export type TokenContract = {
  address: Scalars["Address"]
  lastBlock: Scalars["Long"]
  type: TokenType
}

export type TokenSync = {
  id: Scalars["AssetID"]
  start: Scalars["Long"]
}

export enum TokenType {
  Erc20 = "ERC20",
  Erc20Aave = "ERC20AAVE",
  Erc721 = "ERC721",
}

export type Transaction = {
  block: Block
  id: Scalars["HashID"]
}

export type Treasury = {
  tokens: Array<TokenBalance>
  totalUSDValue: Scalars["String"]
}

export type TwitterIdentity = {
  nonce: Scalars["Int"]
  url: Scalars["String"]
}

export type UpdateProposalInput = {
  status?: InputMaybe<TallyProposalStatus>
  txHash?: InputMaybe<Scalars["String"]>
}

export type UpdateVoteParameters = {
  proposalThreshold?: InputMaybe<Scalars["BigInt"]>
  quorum?: InputMaybe<Scalars["BigInt"]>
  role?: InputMaybe<OrganizationRole>
  votingPeriod?: InputMaybe<Scalars["Int"]>
}

/** The `UploadFile` type, represents the request for uploading a file with a certain payload. */
export type UploadFile = {
  id: Scalars["Int"]
  upload: Scalars["Upload"]
}

export type Visual = {
  color?: Maybe<Scalars["String"]>
  icon?: Maybe<Scalars["String"]>
}

/** Votes cast in a Governor proposal */
export type Vote = {
  /**
   * `Block` vote was cast in.
   * @deprecated selector `transaction` contains the creation block
   */
  block: Block
  /**
   * Hash of Transaction in which the vote cast.
   * @deprecated selector `transaction` contains the creation transaction hash
   */
  hash: Scalars["Bytes32"]
  /** Proposal and voter concatenated id. */
  id: Scalars["ID"]
  /** Proposal on which vote was cast. */
  proposal: Proposal
  /** Optional reason for vote choice provided by the voter. */
  reason?: Maybe<Scalars["String"]>
  /** Vote choice made by voter. */
  support: SupportType
  /** `Transaction` vote was cast in. */
  transaction: Transaction
  /** Voter that cast the vote. */
  voter: Account
  /** Weight of the vote.  Typically total delegated voting power of voter at proposal voting `start` block. */
  weight: Scalars["BigInt"]
}

/** The `VoteAttempt` type represents the stored attempt of a user that tried voting on a given proposal. */
export type VoteAttempt = {
  createdAt: Scalars["Timestamp"]
  proposal: Proposal
  support: SupportType
  txID: Scalars["HashID"]
  voter: Account
}

export type VoteSort = {
  field?: InputMaybe<VoteSortField>
  order?: InputMaybe<SortOrder>
}

export enum VoteSortField {
  Block = "BLOCK",
  Created = "CREATED",
  Weight = "WEIGHT",
}

/** Voting Summary per Choice */
export type VoteStat = {
  /** Percent of total weight cast in this `Proposal` */
  percent: Scalars["Float"]
  /** Vote Choice */
  support: SupportType
  /** Number of distinct votes cast for this Choice/`SupportType` */
  votes: Scalars["BigInt"]
  /** Total weight (voting power) for this Choice/`SupportType` */
  weight: Scalars["BigInt"]
}

export type VotingParameters = {
  bigVotingPeriod: Scalars["BigInt"]
  proposalThreshold?: Maybe<Scalars["BigInt"]>
  quorum?: Maybe<Scalars["BigInt"]>
  /** Role user needs to have to update the voting parameters. */
  requiredRole: OrganizationRole
  /** Voting period defined in s, defaults to 172800 (2 days). */
  votingPeriod: Scalars["Long"]
}

/** Represents a voting power change over an interval or triggered by an event. */
export type VotingPowerChange = {
  /** The `delegate` address whose voting power is changing */
  delegate: Account
  /** Net change in voting power caused by this event */
  netChange: Scalars["BigInt"]
  /** Voting power after this event or interval */
  newBalance: Scalars["BigInt"]
  /** Voting power prior to this event or interval */
  prevBalance: Scalars["BigInt"]
  /** Timestamp of event or beginging of the interval this voting power change represents */
  timestamp: Scalars["Timestamp"]
  token: Token
  /** Transaction that triggered this voting change, unset if this is an interval */
  transaction?: Maybe<Transaction>
}

export type VotingPowerChangeSort = {
  field?: InputMaybe<VotingPowerChangeSortField>
  order?: InputMaybe<SortOrder>
}

export enum VotingPowerChangeSortField {
  Created = "CREATED",
  NetChange = "NET_CHANGE",
  NewBalance = "NEW_BALANCE",
  OldBalance = "OLD_BALANCE",
}

export type GovernorsQuery = {
  governors: Array<{
    id: string
    name: string
    tokens: Array<{ stats: { voters: number } }>
    proposalStats: { total: number; active: number }
  }>
}
