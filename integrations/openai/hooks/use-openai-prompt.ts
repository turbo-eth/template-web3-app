import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/lib/hooks/use-toast'

const openaiPromptSchema = z.object({
  apiKey: z.string().min(2).max(51),
  prompt: z.string().min(2).max(100000),
})
export const useOpenAIPrompt = () => {
  const [response, setResponse] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast, dismiss } = useToast()

  const form = useForm<z.infer<typeof openaiPromptSchema>>({
    resolver: zodResolver(openaiPromptSchema),
    defaultValues: {
      apiKey: '',
      prompt: '',
    },
  })
  const handleToast = ({ title, description }: { title: string; description: string }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const handleGenerateResponse = async (values: z.infer<typeof openaiPromptSchema>) => {
    try {
      await generateAIResponse(values?.prompt, values?.apiKey)
      form.reset({ ...values, prompt: '' })
    } catch (e) {
      handleToast({
        title: 'An Error Occurred',
        description: 'An error occurred while generating the AI response. Please try again later.',
      })
    }
  }

  /**
   * Generate an AI response from a prompt using the OpenAI API
   * It receives a stream of responses from the API and concatenates them into
   * a single string and updates the response state with it
   * More info: https://platform.openai.com/docs/api-reference/chat/create
   * @param prompt The prompt to generate a response from
   * @param apiKey The OpenAI API key to use. If not set, the default API key from env variable OPENAI_API_KEY will be used.
   */
  const generateAIResponse = async (prompt: string, apiKey?: string) => {
    setResponse('')
    setIsLoading(true)

    const response = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        apiKey,
      }),
    })

    if (!response.ok) {
      setIsLoading(false)
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setResponse((prev) => prev + chunkValue)
    }
    setIsLoading(false)
  }

  return {
    response,
    isLoading,
    form,
    handleGenerateResponse,
    handleToast,
  }
}
