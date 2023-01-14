import * as React from 'react'

import classNames from 'classnames'
import { useRouter } from 'next/router'

import { siweLogout } from '../../lib/actions/siweLogout'

interface ButtonSIWELogoutProps {
  className?: string
  label?: string
}

export const ButtonSIWELogout = ({ className, label }: ButtonSIWELogoutProps) => {
  const router = useRouter()
  const handleLogout = async () => {
    await siweLogout()
    router.reload()
  }

  const classes = classNames(className, 'ButtonSIWELogout')
  return (
    <button onClick={handleLogout} className={classes}>
      {label}
    </button>
  )
}

ButtonSIWELogout.defaultProps = {
  className: '',
  label: 'Logout',
}

export default ButtonSIWELogout
