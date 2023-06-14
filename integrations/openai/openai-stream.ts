import { ParsedEvent, ReconnectInterval, createParser } from 'eventsource-parser'
import { z } from 'zod'

import { env } from '@/env.mjs'

import { ModelConfig } from './utils/types'

const readableStreamSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  model: z.string(),
  choices: z.array(
    z.object({
      delta: z.object({
        content: z.string().optional(),
      }),
      index: z.number(),
      finish_reason: z.string().nullable(),
    })
  ),
})

/**
 * OpenAI API model configuration.
 * The implementation was inspired by https://github.com/Nutlope/twitterbio
 * See more details at https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions
 * You can either use an OpenAI API key from env variable OPENAI_API_KEY or pass it as a second argument.
 * @param payload Model configuration. See more details at https://platform.openai.com/docs/api-reference/chat/create
 * @param customApiKey Custom API key. If not set, the default API key from env variable OPENAI_API_KEY will be used.
 * @returns A readable stream of text data from OpenAI API.
 */
export async function OpenAIStream(payload: ModelConfig, customApiKey?: string) {
  const apiKey = customApiKey ?? env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('No OpenAI API key provided')
  }

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  let counter = 0

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Error from OpenAI API: ${res.status} ${res.statusText}`)
  }

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = readableStreamSchema.parse(JSON.parse(data))
            const text = json.choices[0].delta?.content || ''
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            counter++
          } catch (e) {
            controller.error(e)
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks & invoke an event for each SSE event stream
      const parser = createParser(onParse)

      if (res.body) {
        // https://web.dev/streams/#asynchronous-iteration
        for await (const chunk of res.body as unknown as BufferSource[]) {
          parser.feed(decoder.decode(chunk))
        }
      }
    },
  })

  return stream
}
