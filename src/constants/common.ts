export const ServiceOptions = [
  {
    label: 'Consulting Services',
    value: 'consulting-services',
  },
  {
    label: 'Implementation Services',
    value: 'implementation-services',
  },
  {
    label: 'Product Development',
    value: 'product-development',
  },
  {
    label: 'Data Analytics',
    value: 'data-analytics',
  },
]
export const IndustriesOptions = [
  {
    label: 'Healthcare',
    value: 'healthcare',
  },
  {
    label: 'Finance',
    value: 'finance',
  },
  {
    label: 'Manufacturing',
    value: 'manufacturing',
  },
]

export const TOUList = [
  {
    label: 'Terms of Use (ToU)',
    value: 'terms-of-use',
  },
  {
    label: 'Privacy Policy',
    value: 'privacy-policy',
  },
]

export const BookedEventListColumn = [
  {
    label: 'First Name',
    key: 'first_name',
  },
  {
    label: 'Last Name',
    key: 'last_name',
  },
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Phone Number',
    key: 'phone',
  },
  {
    label: 'Action',
    buttons: [
      {
        type: 'delete',
      },
    ],
  },
]

export const InquiryColumn = [
  {
    label: 'Firstname',
    key: 'first_name',
  },
  {
    label: 'Lastname',
    key: 'last_name',
  },
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Phone Number',
    key: 'phone',
  },
  {
    label: 'Message',
    key: 'message',
  },
  {
    label: 'Action',
    buttons: [
      {
        type: 'delete',
      },
      {
        type: 'seen',
      },
    ],
  },
]
export const JOB_COLUMN = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Location',
    key: 'location',
  },
  {
    label: 'Job Type',
    key: 'job_type',
  },

  {
    label: 'Action',
    buttons: [
      {
        type: 'view',
        link: (id: string) => `/dashboard/careers/job/${id}`,
      },
      {
        type: 'delete',
      },
      {
        type: 'edit',
      },
      {
        type: 'expiry',
      },
    ],
  },
]
export const JOB_APPLICATION_COLUMN = [
  {
    label: 'Name',
    key: 'name',
  },

  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Number',
    key: 'number',
  },
  {
    label: 'Address',
    key: 'address',
  },
  {
    label: 'Action',
    buttons: [
      {
        type: 'download',
      },
    ],
  },
]

export const socialColumn = [
  {
    label: 'Icon',
    key: 'icon',
    type: 'image',
  },
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'URL',
    key: 'url',
  },
  {
    label: 'Number',
    key: 'number',
  },
  {
    label: 'Action',
    buttons: [
      {
        type: 'edit',
      },
      {
        type: 'delete',
      },
    ],
  },
]
