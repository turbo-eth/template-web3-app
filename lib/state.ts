import { WritableAtom, atom, useAtom } from 'jotai'

let strAtom: WritableAtom<string, string>
if (typeof window !== 'undefined') {
  strAtom = atom(window?.localStorage.getItem('theme') || 'system')
} else {
  strAtom = atom('system')
}

export const colorMode = atom(
  (get) => get(strAtom),
  (get, set, newStr: string) => {
    set(strAtom, newStr)
    localStorage.setItem('theme', newStr)
  }
)

export const useColorMode = () => {
  const [mode, setMode] = useAtom(colorMode)
  const toggleMode: Function = () => setMode(mode === 'light' ? 'dark' : 'light')
  return [mode, toggleMode, setMode] as const
}
