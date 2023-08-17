export class PermissionError extends Error {
  constructor() {
    super("API key doesn't have full access to the application.")
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('Stream not found.')
  }
}

export class FailedToFetchError extends Error {
  constructor() {
    super("Couldn't fetch data from Livepeer API.")
  }
}

export const useCheckLivepeerApiKey = () => {
  const deleteStream = async (apiKey: string, streamId: string) => {
    const res = await fetch(`https://livepeer.studio/api/stream/${streamId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      method: 'DELETE',
    })

    if (!res.ok) {
      if (res.status === 404) {
        throw new NotFoundError()
      } else if (res.status === 403) {
        throw new PermissionError()
      }
      throw new Error(`Error from Livepeer API: ${res.status} ${res.statusText}`)
    }
  }

  const checkLivepeerApiKey = async (apiKey: string) => {
    try {
      await deleteStream(apiKey, 'test_api_key_stream')
    } catch (e) {
      const error = e as Error & { status?: number }
      if (e instanceof PermissionError || e instanceof NotFoundError) {
        throw e
      } else if (error.message === 'Failed to fetch') {
        throw new FailedToFetchError()
      } else {
        throw new Error(`${error.message}`)
      }
    }
  }

  return {
    checkLivepeerApiKey,
  }
}
