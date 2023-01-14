import React, { useEffect } from 'react'

// @ts-ignore
import MoonIcon from 'public/icons/MoonIcon.svg?icon'
import SunIcon from 'public/icons/SunIcon.svg?icon'

// @ts-ignore

export function ThemeSwitcher() {
  const classes = 'cursor-pointer'
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>('light')

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      setColorMode('dark')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      setColorMode('light')
    }
  }, [])

  const handleToggle = (_e: any) => {
    document.documentElement.classList.toggle('dark')
    setColorMode(colorMode === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={classes} onClick={handleToggle}>
      {colorMode === 'light' ? <MoonIcon width={16} /> : <SunIcon width={16} />}
    </div>
  )
}
