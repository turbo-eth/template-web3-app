"use client"

import { useContext } from "react"

import { TallyGovernorsContext } from "../context/governors"

export const useGovernors = () => {
  return useContext(TallyGovernorsContext)
}
