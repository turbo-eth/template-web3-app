import { useEffect } from 'react'

import { useTheme } from 'next-themes'

import { Icons } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useColorMode } from '@/lib/state/color-mode'

import { IsDarkTheme } from './is-dark-theme'
import { IsLightTheme } from './is-light-theme'

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [colorMode, toggleMode, setMode] = useColorMode()

  const handleSetLightTheme = () => {
    setTheme('light')
    setMode('light')
  }

  const handleSetDarkTheme = () => {
    setTheme('dark')
    setMode('dark')
  }

  const handleSetSystemTheme = () => {
    setTheme('system')
    setMode('system')
  }

  useEffect(() => {
    colorMode === 'system' ? setTheme('system') : colorMode === 'dark' ? setTheme('dark') : setTheme('light')
  }, [colorMode])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <IsLightTheme>
            <Icons.sun className="h-6 w-6 hover:text-slate-900" />
          </IsLightTheme>
          <IsDarkTheme>
            <Icons.moon className="h-6 w-6 hover:text-slate-900 dark:text-white dark:hover:text-slate-100" />
          </IsDarkTheme>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem onClick={handleSetLightTheme}>
          <Icons.sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSetDarkTheme}>
          <Icons.moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSetSystemTheme}>
          <Icons.laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
