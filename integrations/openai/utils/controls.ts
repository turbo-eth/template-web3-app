export const openaiPromptControls = [
  {
    formfieldName: 'apiKey',
    component: 'input',
    label: 'OpenAI API Key',
    placeholder: 'sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'OpenAI API Key needed here',

    attribute: { pattern: 'sk-[a-zA-Z0-9]{48}', type: 'password', required: 'true' },
  },
  {
    formfieldName: 'prompt',
    component: 'textArea',
    label: 'Prompt',
    placeholder: 'Place Prompt here',
    description: 'This is the propmt of the deployable.',
  },
  {
    formfieldName: 'result',
    component: 'textArea',
    label: 'Prompt',
    placeholder: 'Your AI response will appear here',
    description: 'This is the propmt of the deployable.',

    attribute: { readOnly: 'true' },
  },
]
