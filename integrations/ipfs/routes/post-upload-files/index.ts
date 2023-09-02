import { ipfsClient } from '../../ipfs-client'

export async function ipfsUploadFiles(val: any) {
  console.log(val, 'okokval')
  const payload = { file: val?.file }
  console.log(payload, 'pay')

  const formData = new FormData()
  formData.append('file', values?.file)

  const { data } = await ipfsClient.post(
    `/upload`,

    formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  console.log('finaldata', data)

  return data
}

// import axios from 'axios'

// export async function appIpfsPostUploadFiles(values: any) {
//   console.log(values, 'clientValues')
//   // const payload = { ...values }

//   // console.log('payload', payload)

//   const convertBlobToBase64 = (blob: Blob): Promise<ArrayBuffer> =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader()
//       reader.onload = () => (reader.result ? resolve(reader.result as ArrayBuffer) : reject('Unable to handle file'))
//       reader.onerror = reject
//       reader.readAsArrayBuffer(blob)
//     })

//   try {
//     const base64File = await convertBlobToBase64(values?.file)
//     const formData = new FormData()
//     formData.append('file', base64File)

//     console.log('base64', base64File)
//     const payload = { file: base64File }
//     const response = await axios.post('/api/ipfs/upload', payload, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // Important: Use 'multipart/form-data' for file uploads
//       },
//     })

//     console.log('response', response)

//     if (response.status !== 200) {
//       console.log('ERROR', response)
//     } else {
//       console.log('Form successfully submitted!')
//       const responseJSON = response.data
//       console.log('CID:', responseJSON.cid)
//       return responseJSON.cid
//     }
//   } catch (error) {
//     console.error('Error:', error)
//     throw new Error('Failed to upload files')
//   }
// }
