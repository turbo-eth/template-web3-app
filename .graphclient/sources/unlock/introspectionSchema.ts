// @ts-nocheck
import { buildASTSchema } from 'graphql'

const schemaAST = {
  kind: 'Document',
  definitions: [
    {
      kind: 'SchemaDefinition',
      operationTypes: [
        {
          kind: 'OperationTypeDefinition',
          operation: 'query',
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Query',
            },
          },
        },
        {
          kind: 'OperationTypeDefinition',
          operation: 'subscription',
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Subscription',
            },
          },
        },
      ],
      directives: [],
    },
    {
      kind: 'DirectiveDefinition',
      description: {
        kind: 'StringValue',
        value: 'Marks the GraphQL type as indexable entity.  Each type that should be an entity is required to be annotated with this directive.',
      },
      name: {
        kind: 'Name',
        value: 'entity',
      },
      arguments: [],
      repeatable: false,
      locations: [
        {
          kind: 'Name',
          value: 'OBJECT',
        },
      ],
    },
    {
      kind: 'DirectiveDefinition',
      description: {
        kind: 'StringValue',
        value: 'Defined a Subgraph ID for an object type',
      },
      name: {
        kind: 'Name',
        value: 'subgraphId',
      },
      arguments: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
      ],
      repeatable: false,
      locations: [
        {
          kind: 'Name',
          value: 'OBJECT',
        },
      ],
    },
    {
      kind: 'DirectiveDefinition',
      description: {
        kind: 'StringValue',
        value: 'creates a virtual field on the entity that may be queried but cannot be set manually through the mappings API.',
      },
      name: {
        kind: 'Name',
        value: 'derivedFrom',
      },
      arguments: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'field',
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
      ],
      repeatable: false,
      locations: [
        {
          kind: 'Name',
          value: 'FIELD_DEFINITION',
        },
      ],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: {
        kind: 'Name',
        value: 'BigDecimal',
      },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: {
        kind: 'Name',
        value: 'BigInt',
      },
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'BlockChangedFilter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'number_gte',
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Block_height',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'hash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'number',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'number_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Bytes',
      },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      description: {
        kind: 'StringValue',
        value: '8 bytes signed integer\n',
        block: true,
      },
      name: {
        kind: 'Name',
        value: 'Int8',
      },
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Key',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Unique identifier for a key (combination of lock address and token id)',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'In the Unlock ecosystem, a “Lock” is a smart contract that creates (or “mints”) NFTs',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'lock',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Lock',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'TokenId for a given key',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The address of the key owner',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'owner',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'An assigned title set on an Unlock key which gives a specific wallet address authorization to transfer, share or cancel',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'manager',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Time the key expires',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'expiration',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The tokenURI on an NFT is a unique identifier',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'tokenURI',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Block key was created',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'createdAtBlock',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Timestamp of the block in which the key was created',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'createdAt',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: "Invoked by a Lock manager to expire the user's key and perform a refund and cancellation of the key",
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'cancelled',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Boolean',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'list of transaction hashes for purchase/extensions of a specific token',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'transactionsHash',
          },
          arguments: [],
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Key_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock_',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Lock_filter',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expiration',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expiration_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expiration_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expiration_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expiration_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expiration_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expiration_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expiration_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAt_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAt_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAt_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAt_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAt_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAt_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAt_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'cancelled',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Boolean',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'cancelled_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Boolean',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'cancelled_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Boolean',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'cancelled_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Boolean',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionsHash',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionsHash_not',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionsHash_contains',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionsHash_contains_nocase',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionsHash_not_contains',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionsHash_not_contains_nocase',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'and',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Key_filter',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'or',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Key_filter',
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Key_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__address',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__name',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__symbol',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__expirationDuration',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__tokenAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__price',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__version',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__totalKeys',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__maxNumberOfKeys',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__maxKeysPerAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__createdAtBlock',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__lastKeyMintedAt',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__deployer',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lock__numberOfReceipts',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'manager',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'expiration',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenURI',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAt',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'cancelled',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionsHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Lock',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Unique ID for the Lock object (uses the lock address)',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Address of the lock',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'address',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'A descriptive name for a collection of NFTs in this contract',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'name',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Token symbol',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'symbol',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Duration is set the on the lock when you deploy and the expiration which is set on each key when they are minted',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'expirationDuration',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: "Address of the 'currency' ERC20 contract if the keys are priced using an ERC20",
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'tokenAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Price of the keys sold by the lock',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'price',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'An assigned role set on a Lock contract which gives the highest level of permissions to the wallet address set to that role',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'lockManagers',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Bytes',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Unlock Protocol version of a minting contract',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'version',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Number of keys minted (expired or not)',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'totalKeys',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Maximum number of keys for sale',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The maximum number of keys allowed for a single address',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Refer to key entity',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'keys',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Key_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Key_filter',
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Key',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Which block the lock was created',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'createdAtBlock',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The timestamp of the block in which the last key was minted',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Address of the lock deployer',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'deployer',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total number of receipts of lock',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'numberOfReceipts',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'LockStats',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Transaction Hash',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total locks deployed',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total keys sold',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'totalKeysSold',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'LockStats_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'and',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'LockStats_filter',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'or',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'LockStats_filter',
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'LockStats_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLocksDeployed',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Lock_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'address_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expirationDuration',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expirationDuration_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expirationDuration_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expirationDuration_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expirationDuration_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expirationDuration_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expirationDuration_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'expirationDuration_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'price',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'price_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'price_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'price_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'price_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'price_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'price_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'price_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockManagers',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockManagers_not',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockManagers_contains',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockManagers_contains_nocase',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockManagers_not_contains',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockManagers_not_contains_nocase',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'version',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'version_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'version_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'version_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'version_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'version_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'version_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'version_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeys',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeys_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeys_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeys_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeys_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeys_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeys_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeys_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'keys_',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Key_filter',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'numberOfReceipts',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'numberOfReceipts_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'numberOfReceipts_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'numberOfReceipts_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'numberOfReceipts_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'numberOfReceipts_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'numberOfReceipts_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'numberOfReceipts_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'and',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Lock_filter',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'or',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Lock_filter',
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Lock_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'address',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'name',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'symbol',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'expirationDuration',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'price',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockManagers',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'version',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeys',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxNumberOfKeys',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'maxKeysPerAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'keys',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'createdAtBlock',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastKeyMintedAt',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'deployer',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'numberOfReceipts',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'Defines the order direction, either ascending or descending',
        block: true,
      },
      name: {
        kind: 'Name',
        value: 'OrderDirection',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'asc',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'desc',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Query',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'lock',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Lock',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'locks',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Lock_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Lock_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Lock',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'key',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Key',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'keys',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Key_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Key_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Key',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'unlockDailyData',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'UnlockDailyData',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'unlockDailyDatas',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'UnlockDailyData_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'UnlockDailyData_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'UnlockDailyData',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'lockStats',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'LockStats_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'LockStats_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'LockStats',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'unlockStats',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'UnlockStats_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'UnlockStats_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'UnlockStats',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'receipt',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Receipt',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'receipts',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Receipt_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Receipt_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Receipt',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Access to subgraph metadata',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_meta',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: '_Meta_',
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Receipt',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Transaction Hash',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Timestamp',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'timestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Sender of the transaction',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'sender',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Payer in the case of an ERC20 lock renewal, the sender and payer might differ',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'payer',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Address of the Lock smart contract',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'lockAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: "Address of the 'currency' ERC20 contract if the keys are priced using an ERC20",
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'tokenAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'amount',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'amountTransferred',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total gas paid',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'gasTotal',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Increasing number of receipt',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'receiptNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Receipt_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'amountTransferred',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'amountTransferred_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'amountTransferred_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'amountTransferred_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'amountTransferred_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'amountTransferred_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'amountTransferred_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'amountTransferred_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'gasTotal',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'gasTotal_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'gasTotal_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'gasTotal_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'gasTotal_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'gasTotal_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'gasTotal_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'gasTotal_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'receiptNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'receiptNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'receiptNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'receiptNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'receiptNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'receiptNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'receiptNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'receiptNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'and',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Receipt_filter',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'or',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Receipt_filter',
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Receipt_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'timestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'sender',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'payer',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'amountTransferred',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'gasTotal',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'receiptNumber',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Subscription',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'lock',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Lock',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'locks',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Lock_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Lock_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Lock',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'key',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Key',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'keys',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Key_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Key_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Key',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'unlockDailyData',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'UnlockDailyData',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'unlockDailyDatas',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'UnlockDailyData_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'UnlockDailyData_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'UnlockDailyData',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'lockStats',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'LockStats_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'LockStats_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'LockStats',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'unlockStats',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'UnlockStats_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'UnlockStats_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'UnlockStats',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'receipt',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Receipt',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'receipts',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Receipt_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Receipt_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Receipt',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Access to subgraph metadata',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_meta',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: '_Meta_',
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'UnlockDailyData',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Day identifier',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Number of locks deployed on that day',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'lockDeployed',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total number of locks deployed',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'totalLockDeployed',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Daily number of keys sold',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'keysSold',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total number of keys sold',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'totalKeysSold',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Daily number of active locks (active locks have minted at least one membership in the last 30 days',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'activeLocks',
          },
          arguments: [],
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total value exchanged on the network',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'UnlockDailyData_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockDeployed',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockDeployed_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockDeployed_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockDeployed_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockDeployed_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockDeployed_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockDeployed_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockDeployed_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'keysSold',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'keysSold_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'keysSold_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'keysSold_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'keysSold_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'keysSold_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'keysSold_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'keysSold_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'activeLocks',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'activeLocks_not',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'activeLocks_contains',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'activeLocks_contains_nocase',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'activeLocks_not_contains',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'activeLocks_not_contains_nocase',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'and',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'UnlockDailyData_filter',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'or',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'UnlockDailyData_filter',
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'UnlockDailyData_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'lockDeployed',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'keysSold',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'activeLocks',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'UnlockStats',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Identifier',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total number of locks deployed',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'totalLockDeployed',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total number of keys sold',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'totalKeysSold',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Total value exchanged on the network',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'UnlockStats_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ID',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ID',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'and',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'UnlockStats_filter',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'or',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'UnlockStats_filter',
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'UnlockStats_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalLockDeployed',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'totalKeysSold',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'grossNetworkProduct',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: '_Block_',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The hash of the block',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'hash',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The block number',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'number',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Integer representation of the timestamp stored in blocks for the chain',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'timestamp',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'The type for the top-level _meta field',
        block: true,
      },
      name: {
        kind: 'Name',
        value: '_Meta_',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value:
              'Information about a specific subgraph block. The hash of the block\nwill be null if the _meta field has a block constraint that asks for\na block number. It will be filled if the _meta field has no block constraint\nand therefore asks for the latest  block\n',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'block',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: '_Block_',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The deployment ID',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'deployment',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'If `true`, the subgraph encountered indexing errors at some past block',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'hasIndexingErrors',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Boolean',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: '_SubgraphErrorPolicy_',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Data will be returned even if the subgraph has indexing errors',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'allow',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'If the subgraph has indexing errors, data will be omitted. The default.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'deny',
          },
          directives: [],
        },
      ],
      directives: [],
    },
  ],
}

export default buildASTSchema(schemaAST, {
  assumeValid: true,
  assumeValidSDL: true,
})
