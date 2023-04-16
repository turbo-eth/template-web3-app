import { Dispatch, SetStateAction } from 'react'

export interface AccessControlProps {
  accessControlConditions: any
  setAccessControlConditions: Dispatch<SetStateAction<any>>
}
