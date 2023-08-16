import { SSXServer } from '@spruceid/ssx-server'

const ssx = new SSXServer({
  signingKey: 'process.env.SPRUCE_KIT_SIGNING_KEY',
})

export default ssx
