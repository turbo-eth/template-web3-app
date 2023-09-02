import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { appIpfsPostUploadFiles } from '../routes/post-upload-files/client'

export const useIpfsUploadFiles = () => {
  return useMutation({
    mutationFn: async (vars) => {
      console.log(vars, 'mutateVal')

      const final = await appIpfsPostUploadFiles(vars)

      console.log('final:::::::', final)
      return final
    },
  })
}

export const useUploadIpfsForm = () => {
  const { mutate, data, isLoading, isError, error, isSuccess } = useIpfsUploadFiles()

  console.log('data1', data)
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

  async function readFileAsBytes(inputFile: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onload = (event) => {
        if (event.target && event.target.result) {
          const arrayBuffer = event.target.result as ArrayBuffer
          const bytes = new Uint8Array(arrayBuffer)
          resolve(bytes)
        } else {
          reject(new Error('Error reading file as bytes.'))
        }
      }

      fileReader.onerror = (event) => {
        reject(new Error('Error reading file as bytes.'))
      }

      fileReader.readAsArrayBuffer(inputFile)
    })
  }

  const onSubmit = async (values) => {
    console.log(values?.file, 'onSubmitVal')
    // const fileDataArray = await readFileAsBytes(values?.file)
    // console.log('byte', fileDataArray)
    console.log('data2', data)
    try {
      if (!!values?.file) {
        // setIsLoading(true)

        // console.log('file::', { file: fileDataArray })
        mutate({
          file: values?.file,
        })
      }
      form.reset()
      // setIsLoading(false)
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
  }
}
