import { OpenAIStream } from '@/integrations/openai/openai-stream'
import { ModelConfig } from '@/integrations/openai/types'

export async function POST(req: Request) {
  const { prompt, apiKey } = (await req.json()) as {
    prompt?: string
    apiKey?: string
  }
  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 })
  }

  const payload: ModelConfig = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 600,
    stream: true,
    n: 1,
  }

  const stream = await OpenAIStream(payload, apiKey)
  return new Response(stream)
}
