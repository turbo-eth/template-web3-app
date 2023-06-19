import { FormEvent, useState } from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'

import { LinkComponent } from '@/components/shared/link-component'
import { useToast } from '@/lib/hooks/use-toast'

import { useOpenAIPrompt } from '../hooks/use-openai-prompt'

export function FormOpenAIPrompt() {
  const [prompt, setPrompt] = useState<string>('')
  const [apiKey, setApiKey] = useState<string>('')
  const { toast, dismiss } = useToast()
  const { response, isLoading, generateAIResponse } = useOpenAIPrompt()

  const handleToast = ({ title, description }: { title: string; description: string }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const handleGenerateResponse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await generateAIResponse(prompt, apiKey)
    } catch (e) {
      handleToast({
        title: 'An Error Occurred',
        description: 'An error occurred while generating the AI response. Please try again later.',
      })
    }
  }

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={handleGenerateResponse}>
        <label>
          OpenAI API Key
          <input
            required
            className="input mt-2"
            pattern="sk-[a-zA-Z0-9]{48}"
            placeholder="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
        <label>
          Prompt
          <textarea className="input mt-2 h-40" placeholder="Write your prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </label>
        <div className="relative">
          <label>
            Response
            <textarea readOnly className="input relative mt-2 h-60" placeholder="Your AI response will appear here" value={response} />
          </label>
          {response && (
            <CopyToClipboard text={response}>
              <span
                className="flex-center absolute right-2 top-8 flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900"
                onClick={() =>
                  handleToast({
                    title: 'AI response copied to clipboard',
                    description: 'You can now paste the response anywhere you want.',
                  })
                }>
                <FaCopy className="text-neutral-600 dark:text-neutral-100" />
              </span>
            </CopyToClipboard>
          )}
        </div>
        <button className="btn btn-emerald" disabled={isLoading || !prompt} type="submit">
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </form>{' '}
      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-center">OpenAI</h3>
        <p className="text-center text-sm text-gray-500">
          <LinkComponent isExternal className="font-bold" href={'https://platform.openai.com/account/api-keys'}>
            Get your API keys
          </LinkComponent>{' '}
          to interact with OpenAI.
        </p>
      </div>
    </div>
  )
}
