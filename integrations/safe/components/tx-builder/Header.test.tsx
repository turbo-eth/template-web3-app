import { screen, waitFor } from '@testing-library/react'

import { render } from '../test-utils'
import Header from './Header'

// Axios is bundled as ESM module which is not directly compatible with Jest
// https://jestjs.io/docs/ecmascript-modules
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}))

describe('<Header>', () => {
  it('Renders Header component', async () => {
    render(<Header />)

    await waitFor(() => {
      expect(screen.getByText('Transaction Builder')).toBeInTheDocument()
    })
  })

  it('Shows Link to Transaction Library in Create Batch pathname', async () => {
    render(<Header />)

    await waitFor(() => {
      expect(screen.getByText('Transaction Builder')).toBeInTheDocument()
      expect(
        screen.getByText('Your transaction library', {
          exact: false,
        }),
      ).toBeInTheDocument()
    })
  })
})
