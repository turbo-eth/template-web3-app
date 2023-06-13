export const openaiPromptControls = [
  {
    formfieldName: 'apiKey',
    component: 'input',
    label: 'OpenAI API Key',
    placeholder: 'sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'OpenAI API Key is needed here',

    attribute: { pattern: 'sk-[a-zA-Z0-9]{48}', type: 'password', required: 'true' },
  },
  {
    formfieldName: 'prompt',
    component: 'textArea',
    label: 'Prompt',
    placeholder: 'Place Prompt here',
  },
]
