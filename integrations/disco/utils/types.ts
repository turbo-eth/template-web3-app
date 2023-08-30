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
  "@context": string[]
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
  "@context": string[]
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
      primaryType: "VerifiableCredential"
    }
  }
}

export interface IssueEntity {
  schemaUrl: string
  subjectData: {
    eventDate: string
    eventName: string
    place: string
    projectName: string
    sourceCodeUrl: string
    teamName: string
    usageLink: string
    expDate: string
    recipientDid: string
  }
  recipientDID: string
}

export interface EventData {
  eventDate: string
  eventName: string
  expDate: string
  place: string
  projectName: string
  recipientDid: string
  sourceCodeUrl: string
  teamName: string
  usageLink: string
}
