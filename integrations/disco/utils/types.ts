export interface Credential {
  id: string
  type: string[]
  genId: string
  proof: {
    type: string
    created: string
    proofValue: string
    eip712Domain: {
      domain: {
        name: string
        chainId: number
        version: string
      }
      primaryType: string
      messageSchema: {
        Proof: {
          name: string
          type: string
        }[]
        Issuer: {
          name: string
          type: string
        }[]
        EIP712Domain: {
          name: string
          type: string
        }[]
        CredentialSubject: {
          name: string
          type: string
        }[]
        VerifiableCredential: {
          name: string
          type: string
        }[]
      }
    }
  }
  issuer: {
    id: string
    name: string
    profilePicture: string
  }
  '@context': string[]
  isPublic: boolean
  recipient: string
  updatedAt: string
  issuanceDate: string
  credentialSchema: {
    id: string
    type: string
  }
  credentialSubject: {
    id: string
    edition: number
  }
}

export interface Profile {
  did: string
  profile: {
    bio: string
    name: string
    avatar: string
    ethAddress: string
  }
  linkages: {
    [key: string]: {
      id: string
      host: string
      claim: string
      protocol: string
      attestations: {
        [key: string]: string
      }
    }
  }
  creds: Credential[]
  isDiscoOrg: boolean
}

export interface IssuedCredentials {
  '@context': string[]
  type: string[]
  issuer: {
    id: string
  }
  issuanceDate: string
  id: string
  credentialSubject: {
    id: string
  }
  credentialSchema: {
    id: string
    type: string
  }
  proof: {
    verificationMethod: string
    created: string
    proofPurpose: string
    type: string
    proofValue: string
    eip712Domain: {
      domain: {
        chainId: number
        name: string
        version: string
      }
      messageSchema: {
        EIP712Domain: {
          name: string
          type: string
        }[]
        Proof: {
          name: string
          type: string
        }[]
        Issuer: {
          name: string
          type: string
        }[]
        CredentialSubject: {
          name: string
          type: string
        }[]
        VerifiableCredential: {
          name: string
          type: string
        }[]
      }
      primaryType: 'VerifiableCredential'
    }
  }
}

// {
//   "@context": [
//       "https://www.w3.org/2018/credentials/v1"
//   ],
//   "type": [
//       "VerifiableCredential",
//       "GmCredential"
//   ],
//   "issuer": {
//       "id": "did:3:kjzl6cwe1jw145l0eotzxw28znn1zcis2khwa1rf56ss5a8e55ffhqht25fmk66"
//   },
//   "issuanceDate": "2023-05-08T15:54:56.431Z",
//   "id": "did:3:kjzl6cwe1jw145l0eotzxw28znn1zcis2khwa1rf56ss5a8e55ffhqht25fmk66#fe0b5bab-a850-40ac-a5bc-46d779feda41",
//   "credentialSubject": {
//       "id": "did:3:kjzl6cwe1jw147pkworv5ff70zkwjne15b4ww4xwyof4cdgvgsw8xl1srg287wj"
//   },
//   "credentialSchema": {
//       "id": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json",
//       "type": "JsonSchemaValidator2018"
//   },
//   "proof": {
//       "verificationMethod": "did:3:kjzl6cwe1jw145l0eotzxw28znn1zcis2khwa1rf56ss5a8e55ffhqht25fmk66#controller",
//       "created": "2023-05-08T15:54:56.538Z",
//       "proofPurpose": "assertionMethod",
//       "type": "EthereumEip712Signature2021",
//       "proofValue": "0x8808c6ed2f471e2d8bfbde026ce787e39b638959e9174b88d8a14d9742fe3840079345cea7c120c71f3b50689806f9c4ab25d5bbc2722018f35ba9d22b913a551c",
//       "eip712Domain": {
//           "domain": {
//               "chainId": 1,
//               "name": "Disco Verifiable Credential",
//               "version": "1"
//           },
//           "messageSchema": {
//               "EIP712Domain": [
//                   {
//                       "name": "name",
//                       "type": "string"
//                   },
//                   {
//                       "name": "version",
//                       "type": "string"
//                   },
//                   {
//                       "name": "chainId",
//                       "type": "uint256"
//                   }
//               ],
//               "Proof": [
//                   {
//                       "name": "created",
//                       "type": "string"
//                   },
//                   {
//                       "name": "proofPurpose",
//                       "type": "string"
//                   },
//                   {
//                       "name": "type",
//                       "type": "string"
//                   },
//                   {
//                       "name": "verificationMethod",
//                       "type": "string"
//                   }
//               ],
//               "Issuer": [
//                   {
//                       "name": "id",
//                       "type": "string"
//                   }
//               ],
//               "CredentialSubject": [
//                   {
//                       "name": "id",
//                       "type": "string"
//                   }
//               ],
//               "VerifiableCredential": [
//                   {
//                       "name": "@context",
//                       "type": "string[]"
//                   },
//                   {
//                       "name": "credentialSubject",
//                       "type": "CredentialSubject"
//                   },
//                   {
//                       "name": "id",
//                       "type": "string"
//                   },
//                   {
//                       "name": "issuanceDate",
//                       "type": "string"
//                   },
//                   {
//                       "name": "issuer",
//                       "type": "Issuer"
//                   },
//                   {
//                       "name": "proof",
//                       "type": "Proof"
//                   },
//                   {
//                       "name": "type",
//                       "type": "string[]"
//                   }
//               ]
//           },
//           "primaryType": "VerifiableCredential"
//       }
//   }
// }
