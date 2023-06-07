import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // Iron session requires a secret of at least 32 characters
    NEXTAUTH_SECRET: z.string().min(32),
    DATABASE_URL: z.string().url().optional(),
    // Comma separated list of Ethereum addresses, accepts optinal whitespace after comma
    APP_ADMINS: z
      .string()
      .regex(/^(0x[a-fA-F0-9]{40}( *, *0x[a-fA-F0-9]{40})* *)*$/)
      .optional(),
    SITE_URL: z.string().url().optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_USE_PUBLIC_PROVIDER: z.enum(['true', 'false']).default('true'),
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_INFURA_API_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_ETHERSCAN_API_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_ETHERSCAN_API_KEY_OPTIMISM: z.string().min(1).optional(),
    NEXT_PUBLIC_ETHERSCAN_API_KEY_ARBITRUM: z.string().min(1).optional(),
    NEXT_PUBLIC_ETHERSCAN_API_KEY_POLYGON: z.string().min(1).optional(),
    NEXT_PUBLIC_DISCO_API_KEY: z.string().min(1).optional(),
  },
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    APP_ADMINS: process.env.APP_ADMINS,
    SITE_URL: process.env.SITE_URL,
    NEXT_PUBLIC_DISCO_API_KEY: process.env.NEXT_PUBLIC_DISCO_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_ETHERSCAN_API_KEY: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
    NEXT_PUBLIC_ETHERSCAN_API_KEY_OPTIMISM: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY_OPTIMISM,
    NEXT_PUBLIC_ETHERSCAN_API_KEY_ARBITRUM: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY_ARBITRUM,
    NEXT_PUBLIC_ETHERSCAN_API_KEY_POLYGON: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY_POLYGON,
    NEXT_PUBLIC_USE_PUBLIC_PROVIDER: process.env.NEXT_PUBLIC_USE_PUBLIC_PROVIDER,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  },
})
