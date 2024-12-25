export const InquiryColumn = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Email Address',
    key: 'email',
  },
  {
    label: 'Phone Number',
    key: 'phone',
  },
  {
    label: 'Nationality',
    key: 'nationality',
  },

  {
    label: 'Action',
    buttons: [
      {
        type: 'view',
        link: (id: string) => `/dashboard/quick-enquiry/${id}`,
      },
      {
        type: 'delete',
      },
    ],
  },
]
export const InquiryColumnSeen = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Email Address',
    key: 'email',
  },
  {
    label: 'Phone Number',
    key: 'phone',
  },
  {
    label: 'Nationality',
    key: 'nationality',
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
