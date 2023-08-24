import { prisma } from "@/lib/prisma"

export type LitProtocolMessage = Awaited<
  ReturnType<typeof prisma.litProtocolMessage.findFirst>
>

export type AccessControlConditions = {
  conditionType: string
  contractAddress: string
  standardContractType: string
  chain: string
  method: string
  parameters: string[]
  returnValueTest: {
    comparator: string
    value: string
  }
}[]
