import { useCallback } from 'react'

import { SetStateAction, WritableAtom, atom, useAtom } from 'jotai'

const DEFAULT_VALUE: `$0x{string}` | undefined = undefined

let strAtom: WritableAtom<any, SetStateAction<any>>
strAtom = atom(DEFAULT_VALUE)
if (typeof window !== 'undefined') {
  strAtom = atom(window?.localStorage.getItem('erc721-token') ? JSON.parse(window?.localStorage?.getItem('erc721-token') || '') : DEFAULT_VALUE)
} else {
  strAtom = atom(DEFAULT_VALUE)
}

export const tokensWatching = atom(
  (get) => get(strAtom),
  (get, set, newStr: Array<number>) => {
    set(strAtom, newStr)
    localStorage.setItem('erc721-token', JSON.stringify(newStr))
  }
)

export const useErc721TokenStorage = () => {
  const [token, set] = useAtom(tokensWatching)
  const setToken = useCallback(
    (tokenNew: any) => {
      set(tokenNew)
    },
    [set]
  )
  return [token, setToken] as const
}
