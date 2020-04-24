
export const fieldSettings = [
    {
        name: 'featured',
        type: 'checkbox',
        inputType: 'checkbox',
        label: 'Featured',
        validation: true
    },
    {
        name: 'logo',
        inputType: 'checkbox',
        type: 'checkbox',
        label: 'Logo',
        validation: true
    },
    {
        name: 'screenshot',
        inputType: 'checkbox',
        type: 'checkbox',
        label: 'Screenshot',
        validation: true
    },
    {
        name: 'title',
        type: 'text',
        placeholder: 'Title',
        validation: true
    },
    {
        name: 'description',
        type: 'textarea',
        rows: 10,
        placeholder: 'Description',
        validation: true
    },
    {
        name: 'logoImg',
        inputType: 'file',
        label: 'Logo Img',
        validation: true
    },
    {
        name: 'screenshotImg',
        inputType: 'file',
        label: 'Screenshot Img',
        validation: true
    },
    {
        label: 'tags',
        name: 'tags',
        inputType: 'multiselect',
        validation: true
    },
    {
        name: 'details',
        inputType: 'array',
    },
]

export const fieldSettings2 = [
    {
        name: 'text',
        type: 'textarea',
        rows: 10,
        placeholder: 'Description',
        validation: true
    },
    {
        name: 'image',
        inputType: 'file',
        label: 'Image To Text',
        validation: true
    },
]