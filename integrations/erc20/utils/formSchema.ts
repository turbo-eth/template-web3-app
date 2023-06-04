'use client'

import { ethers } from 'ethers'
import * as z from 'zod'

export const deployFormSchema = z.object({
  name: z.string().min(2).max(50),
  symbol: z.string().min(2).max(10),
})

export const writeMintFormSchema = z.object({
  amount: z.string().min(1),
})

export const writeTransferFormSchema = z.object({
  amount: z.string().min(1),
  fromAddress: z.string().refine((value) => ethers.utils.isAddress(value), {
    message: 'From address is invalid. Please insure you have typed correctly.',
  }),
  toAddress: z.string().refine((value) => ethers.utils.isAddress(value), {
    message: 'Reciever address is invalid. Please insure you have typed correctly.',
  }),
})
