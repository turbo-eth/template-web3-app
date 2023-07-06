import { DependencyList, useCallback, useState } from 'react'

import { UsePushActionProps } from '../utils/types'

export const usePushAction = <T, F>(props: UsePushActionProps<T, F>, deps: DependencyList) => {
  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const action = useCallback((args: F) => {
    setIsLoading(true)

    return props
      .fetcher(args)
      .then((data) => {
        setData(data)
        return data
      })
      .catch((e: Error) => {
        setError(e)
        throw e
      })
      .finally(() => setIsLoading(false))
  }, deps)

  return { data, isLoading, error, action }
}
