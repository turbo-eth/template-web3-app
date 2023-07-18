/**
 * GPT models can understand and generate natural language or code.
 * For more details, access https://platform.openai.com/docs/models/gpt-3-5
 */
export const models = ['gpt-4', 'gpt-3.5-turbo', 'text-davinci-003', 'text-davinci-002', 'code-davinci-002'] as const

/**
 * OpenAI API model configuration.
 * See more details at https://platform.openai.com/docs/api-reference/chat/create
 */
export interface ModelConfig {
  model: typeof models[number]
  /**
   * A list of messages describing the conversation so far.
   */
  messages: {
    role: 'system' | 'user' | 'assistant'
    content: string
    name?: string
  }[]
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or top_p but not both.
   */
  temperature?: number
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
   */
  frequency_penalty?: number
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
   */
  presence_penalty?: number
  /**
   * The maximum number of tokens to generate in the completion.
   * The token count of your prompt plus max_tokens cannot exceed the model's context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
   */
  max_tokens?: number
  /**
   * Whether to stream back partial progress. If set, tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
   */
  stream?: boolean
  /**
   * How many completions to generate for each prompt.
   * Whether to stream back partial progress. If set, tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
   */
  n?: number
}
