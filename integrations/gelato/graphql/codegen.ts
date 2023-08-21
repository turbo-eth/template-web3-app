import { join } from 'path'

import { CodegenConfig } from '@graphql-codegen/cli'

const pth = (path: string) => {
  return join(__dirname, path)
}

const config: CodegenConfig = {
  schema: 'https://api.thegraph.com/subgraphs/name/gelatodigital/poke-me',
  documents: [pth('/tasks.graphql')],
  generates: {
    [pth('graphql/generated/')]: {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
}

export default config
