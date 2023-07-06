import { DependencyList, useCallback, useEffect, useState } from 'react'

import { UsePushQueryProps, UsePushQueryReturn } from '../utils/types'

export const usePushQuery = <T>(props: UsePushQueryProps<T>, deps: DependencyList): UsePushQueryReturn<T> => {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState(false)

  const refetch = useCallback(async () => props.fetcher(), deps)

  useEffect(() => {
    setIsLoading(true)
    refetch()
      .then((res) => setData(res))
      .catch((e) => setError(e as Error))
      .finally(() => setIsLoading(false))
  }, [refetch])

  return { data, isLoading, error, refetch }
}
