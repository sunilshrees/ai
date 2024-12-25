'use client'

import ApplyJobComponent from '@/container/careers/job/ApplyJobComponent'
import { openModal } from '@/utils/openModal'
import React from 'react'

const JobApplyButton = ({ id }: any) => {
  const handleClickAdd = () => {
    openModal(
      ApplyJobComponent,
      { id },
      {
        height: '80vh',
        width: '600px',
        borderRadius: '8px',
        background: '#1E1E1E',

        closeOnClickOutside: false,
      },
    )
  }
  return (
    <button
      className="w-fit px-8 py-4 bg-[#1E1E1E] rounded-[0.625rem]"
      onClick={handleClickAdd}
    >
      Apply Now
    </button>
  )
}

export default JobApplyButton
