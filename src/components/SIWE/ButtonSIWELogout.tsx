import * as React from 'react'

import classNames from 'classnames'

import { siweLogout } from '../../actions/siweLogout'

interface ButtonSIWELogoutProps {
  className?: string
  label?: string
}

export const ButtonSIWELogout = ({ className, label }: ButtonSIWELogoutProps) => {
  const handleLogout = async () => {
    await siweLogout()
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
