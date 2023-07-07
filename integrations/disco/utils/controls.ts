export const discoControls = [
  // {
  //   formfieldName: 'apiKey',
  //   component: 'input',
  //   label: 'OpenAI API Key',
  //   placeholder: 'sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   description: 'OpenAI API Key is needed here',

  //   attribute: { pattern: 'sk-[a-zA-Z0-9]{48}', type: 'password', required: 'true' },
  // },
  {
    formfieldName: 'eventDate',
    component: 'input',
    label: 'Event Date',
    // placeholder: 'Place Event Date here',
    attribute: { type: 'date', required: 'true', name: 'eventDate' },
  },
  {
    formfieldName: 'eventName',
    component: 'input',
    label: 'Event Name',
    placeholder: 'Place Event Name here',
    attribute: { required: 'true' },
  },
  {
    formfieldName: 'place',
    component: 'input',
    label: 'Place',
    placeholder: 'Place Place here',
  },
  {
    formfieldName: 'projectName',
    component: 'input',
    label: 'Project Name',
    placeholder: 'Place Project Name here',
    attribute: { required: 'true' },
  },
  {
    formfieldName: 'sourceCodeUrl',
    component: 'input',
    label: 'Source Code Url',
    placeholder: 'Place Source Code Url here',
  },
  {
    formfieldName: 'teamName',
    component: 'input',
    label: 'Team Name',
    placeholder: 'Place Team Name here',
  },
  {
    formfieldName: 'usageLink',
    component: 'input',
    label: 'Usage Link',
    placeholder: 'Place Usage Link here',
  },
  {
    formfieldName: 'expDate',
    component: 'input',
    label: 'Expiration Date',
    // placeholder: 'Place Event Date here',
    attribute: { type: 'date', name: 'expDate' },
  },
  {
    formfieldName: 'id',
    component: 'input',
    label: 'Recipient DID',
    placeholder: 'Place Recipient DID here',
  },
]
