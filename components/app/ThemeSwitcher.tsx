import React, { useEffect } from 'react'

// @ts-ignore
import MoonIcon from 'public/icons/MoonIcon.svg?icon'
// @ts-ignore
import SunIcon from 'public/icons/SunIcon.svg?icon'

import { useColorMode } from '@/lib/state'

export function ThemeSwitcher() {
  const classes = 'cursor-pointer'
  const [colorMode, toggleMode, setMode] = useColorMode()

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.colorMode === 'dark' || (!('colorMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      setMode('dark')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      setMode('light')
    }
  }, [])

  const handleToggle = (_e: any) => {
    document.documentElement.classList.toggle('dark')
    toggleMode()
  }

  return (
    <div className={classes} onClick={handleToggle}>
      {colorMode === 'light' ? <MoonIcon width={16} /> : <SunIcon width={16} />}
    </div>
  )
}
