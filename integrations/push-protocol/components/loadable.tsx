import { PropsWithChildren } from 'react'

import { ImSpinner2 } from 'react-icons/im'

export function Loadable(props: PropsWithChildren<{ isLoading: boolean }>) {
  return props.isLoading ? (
    <>
      <ImSpinner2 className="animate-spin" size={20} />
    </>
  ) : (
    <>{props.children}</>
  )
}
