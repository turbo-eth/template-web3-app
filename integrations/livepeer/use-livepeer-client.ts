export const useLivepeerClient = () => {
  function updateStream(streamId: string, updateConfig: any) {
    return fetch(`https://livepeer.studio/api/stream/${streamId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LIVEPEER_API_KEY}`,
      },
      body: JSON.stringify(updateConfig),
    })
  }

  function deleteStream(streamId: string) {
    return fetch(`https://livepeer.studio/api/stream/${streamId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LIVEPEER_API_KEY}`,
      },
      body: JSON.stringify({}),
    })
  }

  return { updateStream, deleteStream }
}
