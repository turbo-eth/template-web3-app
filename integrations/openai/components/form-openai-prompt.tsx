"use client"

import { FormEvent, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { FaCopy } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LinkComponent } from "@/components/shared/link-component"

import { useOpenAIPrompt } from "../hooks/use-openai-prompt"

export function FormOpenAIPrompt() {
  const [prompt, setPrompt] = useState<string>("")
  const [apiKey, setApiKey] = useState<string>("")
  const { toast, dismiss } = useToast()
  const { response, isLoading, generateAIResponse } = useOpenAIPrompt()

  const handleToast = ({
    title,
    description,
  }: {
    title: string
    description: string
  }) => {
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
        title: "An Error Occurred",
        description:
          "An error occurred while generating the AI response. Please try again later.",
      })
    }
  }

  return (
    <Card className="w-full pt-6">
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleGenerateResponse}>
          <Label htmlFor="apiKey">OpenAI API Key</Label>
          <Input
            id="apiKey"
            required
            pattern="sk-[a-zA-Z0-9]{48}"
            type="password"
            placeholder="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Type your prompt here."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="relative">
            <Label htmlFor="response">Response</Label>
            <Textarea
              readOnly
              className="mt-2 h-60"
              placeholder="Your AI response will appear here."
              value={response}
            />
            {response && (
              <CopyToClipboard text={response}>
                <span
                  className="absolute right-2 top-8 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-muted p-2 hover:bg-accent"
                  onClick={() =>
                    handleToast({
                      title: "AI response copied to clipboard",
                      description:
                        "You can now paste the response anywhere you want.",
                    })
                  }
                >
                  <FaCopy className="text-muted-foreground" />
                </span>
              </CopyToClipboard>
            )}
          </div>
          <Button
            variant="default"
            disabled={isLoading || !prompt}
            type="submit"
          >
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </form>{" "}
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">OpenAI</h3>
          <p className="text-center text-sm text-muted-foreground">
            <LinkComponent
              isExternal
              className="font-bold"
              href={"https://platform.openai.com/account/api-keys"}
            >
              Get your API keys
            </LinkComponent>{" "}
            to interact with OpenAI.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
