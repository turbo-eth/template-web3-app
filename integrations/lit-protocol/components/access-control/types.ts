import { Dispatch, SetStateAction } from 'react'

import { AccessControlConditions } from '../../utils/types'

export interface AccessControlProps {
  accessControlConditions: AccessControlConditions
  setAccessControlConditions: Dispatch<SetStateAction<AccessControlConditions>>
}
