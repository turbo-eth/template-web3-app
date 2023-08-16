import { SSXServer } from '@spruceid/ssx-server'

import { env } from '@/env.mjs'

const ssx = new SSXServer({
  signingKey: env.NEXTAUTH_SECRET,
})

export default ssx
