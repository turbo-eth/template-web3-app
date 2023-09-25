"use client"

import { useContext } from "react"

import { TallyContext } from "../tally-provider"

export const useTally = () => {
  return useContext(TallyContext)
}
