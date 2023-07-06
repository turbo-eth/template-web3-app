import * as LitJsSdk from '@lit-protocol/lit-node-client'

/**
 * This is a wrapper around the Lit Node Client SDK.
 * It is used to create a single instance of the client
 * that can be used throughout the application.
 */
const client = new LitJsSdk.LitNodeClient({})

export default client
