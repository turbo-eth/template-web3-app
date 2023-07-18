import clsx from 'clsx'
import { useEffect, useState } from 'react'

const AppearAnimation = ({ children, className }: { children: JSX.Element | JSX.Element[]; className?: string }) => {
  const [mounting, setMounting] = useState(false)
  useEffect(() => {
    setMounting(true)
  }, [])
  return (
    <div
      className={clsx('transition ease-out duration-500 transform', className, mounting ? 'opacity-100 scale-100' : 'opacity-0 scale-95')}
      style={{ width: '-webkit-fill-available' }}>
      {children}
    </div>
  )
}

export default AppearAnimation
