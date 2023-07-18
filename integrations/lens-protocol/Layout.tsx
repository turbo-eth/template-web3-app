import { LensProvider } from '@lens-protocol/react-web'
import { lensConfig } from './lens-provider'
import { ComponentType } from 'react'

const withLensProvider = (Component: ComponentType<any>) => {
  return function WrappedComponent(props: any) {
    return (
      <LensProvider config={lensConfig}>
        <Component {...props} />
      </LensProvider>
    )
  }
}
export default withLensProvider
