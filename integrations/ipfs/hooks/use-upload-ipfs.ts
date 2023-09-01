'use client'
import { useState } from 'react'

import { unixfs } from '@helia/unixfs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useIpfsNode } from './use-ipfs-node'

export const useUploadIpfs = () => {
  const { helia } = useIpfsNode()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState({})
  const [data, setData] = useState({})

  const txSchema = z.object({
    data: z.string(),
    file: z.instanceof(File).optional(),
  })
  const form = useForm<z.infer<typeof txSchema>>({
    resolver: zodResolver(txSchema),
    defaultValues: {
      data: '',
    },
  })

  // const formData = useWatch({ name: 'data', control: form.control })
  // const formFile = useWatch({ name: 'file', control: form.control })

  // const debouncedFormData = useDebounce(formData, 1000)

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

  const onSubmit = async (values: z.infer<typeof txSchema>) => {
    try {
      console.log('v', values)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const fs = unixfs(helia)

      if (values?.data) {
        const encoder = new TextEncoder()
        const bytes = encoder.encode(values?.data)

        setIsLoading(true)
        const cid = await fs.addBytes(bytes)
        setIsLoading(false)
        setData(cid)
        console.log('Added file:', cid.toString(), helia)
      } else if (values?.file) {
        setIsLoading(true)
        const fileDataArray = await readFileAsBytes(values?.file)
        const cid = await fs.addBytes(fileDataArray)
        setData(cid)
        console.log('fileDataArray', fileDataArray)
        console.log('Added file:', cid.toString(), helia)
        setIsLoading(false)
        // reader.onload = async () => {
        //   const bytes = new Uint8Array(reader.result)

        //   const cid = await fs.addBytes(bytes)
        //   setIsLoading(false)
        //   setData(cid)
        //   console.log('Added file:', cid.toString())
        // }
      }

      form.reset()
    } catch (error) {
      console.log(error)
      // setIsError(error)
      setIsLoading(false)
    }
  }

  return {
    form,
    onSubmit,
    isLoading,
    isError,
    data,
  }
}
