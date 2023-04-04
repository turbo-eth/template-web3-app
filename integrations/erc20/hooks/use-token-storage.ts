import { useCallback } from 'react'

import { SetStateAction, WritableAtom, atom, useAtom } from 'jotai'

// @ts-ignore
const DEFAULT_VALUE: `$0x{string}` | undefined = undefined

// @ts-ignore
let strAtom: WritableAtom<any, SetStateAction<any>>
strAtom = atom(DEFAULT_VALUE)
if (typeof window !== 'undefined') {
  strAtom = atom(window?.localStorage.getItem('token') ? JSON.parse(window?.localStorage?.getItem('token') || '') : DEFAULT_VALUE)
} else {
  strAtom = atom(DEFAULT_VALUE)
}

export const tokensWatching = atom(
  (get) => get(strAtom),
  (get, set, newStr: Array<number>) => {
    set(strAtom, newStr)
    localStorage.setItem('token', JSON.stringify(newStr))
  }
)

export const useTokenStorage = () => {
  const [token, set] = useAtom(tokensWatching)
  const setToken = useCallback(
    (tokenNew: any) => {
      set(tokenNew)
    },
    [set]
  )
  return [token, setToken] as const
}
