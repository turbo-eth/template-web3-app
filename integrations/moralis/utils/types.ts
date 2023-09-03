import { z } from "zod"

export const formatSchema = z
  .union([z.literal("result"), z.literal("raw")])
  .optional()
  .nullable()

// Transaction API
export const transactionAPIMethodsSchema = z.union([
  z.literal("getTransaction"),
  z.literal("getTransactionVerbose"),
  z.literal("getInternalTransactions"),
  z.literal("getWalletTransactions"),
  z.literal("getWalletTransactionsVerbose"),
])

export type TransactionAPIMethods = z.infer<typeof transactionAPIMethodsSchema>

// Events API
export const eventsAPIMethodsSchema = z.union([
  z.literal("getContractLogs"),
  z.literal("getContractEvents"),
])

export type GetContractLogs = z.infer<typeof getContractLogsSchema>
export type GetContractEvents = z.infer<typeof getContractEventsSchema>

export const getContractLogsSchema = z.object({
  format: formatSchema,
  args: z.object({
    chain: z.string(),
    address: z.string(),
  }),
})

export const getContractEventsSchema = z.object({
  format: formatSchema,
  args: z.object({
    address: z.string(),
    chain: z.string(),
    topic: z.string(),
    abi: z.any(),
  }),
})

export const eventsAPIBodySchema = z.object({
  args: z.union([getContractLogsSchema, getContractEventsSchema]),
})
