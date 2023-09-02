import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { fetchWeb3StorageKey } from '../routes/fetch-api-key'
import { appIpfsPostUploadFiles } from '../routes/post-upload-files/client'
import StorageClient from '../utils/storageClient'
export const useIpfsUploadFiles = () => {
  return useMutation({
    mutationFn: async (vars) => {
      console.log('mutate::', vars)
      const final = await appIpfsPostUploadFiles(vars)

      console.log('final', final)

      return final
    },
  })
}

export const useUploadIpfsForm = () => {
  const { mutate, data, isLoading, isError, error, isSuccess } = useIpfsUploadFiles()

  // const [isLoading, setIsLoading] = useState(false)
  // const [isError, setIsError] = useState({})
  // const [data, setData] = useState({})

  const txSchema = z.object({
    file: z.instanceof(File),
  })
  const form = useForm<z.infer<typeof txSchema>>({
    resolver: zodResolver(txSchema),
    // defaultValues: {
    //   file: '',
    // },
  })

  // async function readFileAsBytes(inputFile: File): Promise<Uint8Array> {
  //   return new Promise<Uint8Array>((resolve, reject) => {
  //     const fileReader = new FileReader()

  //     fileReader.onload = (event) => {
  //       if (event.target && event.target.result) {
  //         const arrayBuffer = event.target.result as ArrayBuffer
  //         const bytes = new Uint8Array(arrayBuffer)
  //         resolve(bytes)
  //       } else {
  //         reject(new Error('Error reading file as bytes.'))
  //       }
  //     }

  //     fileReader.onerror = (event) => {
  //       reject(new Error('Error reading file as bytes.'))
  //     }

  //     fileReader.readAsArrayBuffer(inputFile)
  //   })
  // }

  const onSubmit = async (values) => {
    // const fileDataArray = await readFileAsBytes(values?.file)
    // console.log('byte', fileDataArray)

    console.log('onSubmitValues', values)
    try {
      if (!!values?.file) {
        mutate({
          file: values?.file,
        })
      }
      form.reset()
    } catch (e) {
      console.log('error', e)
    }
  }

  const onClientSubmit = async (values) => {
    console.log('okok', values)
    try {
      const web3StorageKey = await fetchWeb3StorageKey()

      console.log('key', web3StorageKey)

      const storageClient = new StorageClient(web3StorageKey)

      const imageURI = await storageClient.storeFiles(values?.file)
      console.log('image', imageURI)
      form.reset()
    } catch (e) {
      console.log('error', e)
    }
  }

  return {
    form,
    onSubmit,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
    onClientSubmit,
  }
}
