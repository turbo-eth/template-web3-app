import { WritableAtom, atom, useAtom } from 'jotai'

let strAtom: WritableAtom<string, string>
if (typeof window !== 'undefined') {
  strAtom = atom(window?.localStorage.getItem('colorMode') ?? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
} else {
  strAtom = atom('light')
}

export const colorMode = atom(
  (get) => get(strAtom),
  (get, set, newStr: string) => {
    set(strAtom, newStr)
    localStorage.setItem('colorMode', newStr)
  }
)

export const useColorMode = () => {
  const [mode, setMode] = useAtom(colorMode)
  const toggleMode: Function = () => setMode(mode === 'light' ? 'dark' : 'light')
  return [mode, toggleMode, setMode] as const
}
