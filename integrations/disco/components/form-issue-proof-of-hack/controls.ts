export const issueProofOfHackFormControls = [
  {
    formfieldName: 'eventDate',
    component: 'input',
    label: 'Event Date',
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
    attribute: { type: 'date', name: 'expDate' },
  },
  {
    formfieldName: 'recipientDid',
    component: 'input',
    label: 'Recipient DID',
    placeholder: 'Place Recipient DID here',
  },
]
