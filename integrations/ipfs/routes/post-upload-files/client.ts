export async function appIpfsPostUploadFiles(values: any) {
  console.log(values, 'clientValues')
  const payload = { file: values?.file }

  // const convertBlobToBase64 = (blob: Blob): Promise<ArrayBuffer> =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.onload = () => (reader.result ? resolve(reader.result as ArrayBuffer) : reject('Unable to handle file'))
  //     reader.onerror = reject
  //     reader.readAsArrayBuffer(blob)
  //   })

  const formData = new FormData()

  // const base64File = await convertBlobToBase64(values?.file)
  formData.append('file', values?.file)

  console.log('formData', formData)
  const res = await fetch('/api/ipfs/upload', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: formData,
  })

  console.log('res', res)

  if (!res.ok && res.status !== 200) {
    throw new Error(await res.text())
  }

  return res.json()
}
