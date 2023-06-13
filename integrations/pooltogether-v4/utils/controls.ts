export const controls = [
  {
    formfieldName: 'deposit',
    component: 'input',
    label: 'Amount',
    placeholder: '',

    attribute: { type: 'number' },
  },
  {
    formfieldName: 'approve',
    component: 'checkbox',
    label: 'Approve',
    placeholder: 'Place Prompt here',
  },
]

export const withDrawControls = [
  {
    formfieldName: 'withdraw',
    component: 'input',
    label: 'Amount',
    placeholder: '',

    attribute: { type: 'number' },
  },
]
