export async function appIpfsPostUploadFiles(values: any) {
  const payload = { file: values?.file }

  const convertBlobToBase64 = (blob: Blob): Promise<ArrayBuffer> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => (reader.result ? resolve(reader.result as ArrayBuffer) : reject('Unable to handle file'))
      reader.onerror = reject
      reader.readAsArrayBuffer(blob)
    })

  try {
    // const formData = new FormData()
    // formData.append('file', values)
    console.log('valClient', values?.file)

    // const response = await axios.post('/api/ipfs/upload', payload, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })

    // console.log('response', response)

    // if (response.status !== 200) {
    //   console.log('ERROR', response)
    // } else {
    //   console.log('Form successfully submitted!')
    //   const responseJSON = response.data
    //   console.log('CID:', responseJSON.cid)
    //   return responseJSON.cid
    // }

    // const fileData = await new Promise((resolve, reject) => {
    //   const reader = new FileReader()
    //   reader.onload = () => {
    //     resolve(reader.result as ArrayBuffer)
    //   }
    //   reader.onerror = reject
    //   reader.readAsArrayBuffer(values?.file)
    // })

    const fileData = await convertBlobToBase64(values?.file)
    const blob = new Blob([fileData])

    const formData = new FormData()
    formData.append('file', blob)

    const res = await fetch('/api/ipfs/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { file: values?.file },
    })

    if (!res.ok && res.status !== 200) {
      throw new Error(await res.text())
    }
    const finalData = await res.json()

    return finalData
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Failed to upload files')
  }
}
