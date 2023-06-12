# OpenAI API - React Hook Integration

This React Hook integrates with the [OpenAI API](https://beta.openai.com/), allowing users to generate AI responses directly from their browser. The `useOpenAIPrompt` hook handles API calls and streaming responses from the OpenAI API, and the provided `FormOpenAIPrompt` component enables users to input their API key, a prompt, and displays the generated AI response. The integration accepts the API key either as an environment variable `OPENAI_API_KEY` or through an API key provided by the user as an argument to the `generateAIResponse` function from the `useOpenAIPrompt` hook.

The integration also adds a new API endpoint `openai/ask` that makes a POST request on the OpenAI API using the   `OpenAIStream` helper.

## Features
- Generates AI responses from the OpenAI API based on user-input prompts
- AI response streams using Edge runtime
- Copy-to-clipboard functionality for the generated AI response
- Toast notifications for copy-to-clipboard actions and error handling

## API
`useOpenAIPrompt`
A custom React hook that provides state and methods to interact with the OpenAI API. It includes the following properties and methods:

- `response`: The AI-generated response as a string
- `isLoading`: A boolean indicating whether the API call is in progress
- `generateAIResponse(prompt, apiKey)`: A method to generate an AI response from a given prompt and optional apiKey

## Components
`FormOpenAIPrompt`
A React component that renders a form to collect the user's OpenAI API key and prompt. It handles the submission and displays the generated AI response, along with a copy-to-clipboard button.

## Environment Variables
To use the OpenAI API with a predefined API key, you need to set the `OPENAI_API_KEY` environment variable in your `.env` file:
```
OPENAI_API_KEY=<your_openai_api_key>
```

## File Structure
```
integrations/openai
├─ components/
│  ├─ form-openai-prompt.tsx
├─ hooks/
│  ├─ use-openai-prompt.ts
├─ openai-stream.ts
├─ types.ts
├─ README.md
```
