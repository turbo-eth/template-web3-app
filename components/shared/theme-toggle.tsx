import { useEffect } from 'react'

import { useTheme } from 'next-themes'

import { BranchColorMode } from '@/components/shared/branch-color-mode'
import { Icons } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useColorMode } from '@/lib/state/color-mode'

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [colorMode, toggleMode, setMode] = useColorMode()

  const handleSetLightTheme = (_e: any) => {
    setTheme('light')
    setMode('light')
  }

  const handleSetDarkTheme = (_e: any) => {
    setTheme('dark')
    setMode('dark')
  }

  const handleSetSystemTheme = (_e: any) => {
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
          <BranchColorMode>
            <Icons.sun className="hover:text-slate-900" />
            <Icons.moon className="hover:text-slate-900 dark:text-white dark:hover:text-slate-100" />
          </BranchColorMode>
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
