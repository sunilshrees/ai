import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
  const router = useRouter()
  return (
    <div
      className="w-[2rem] h-[2rem] rounded-full bg-[#E3E3E3] flex justify-center items-center cursor-pointer"
      onClick={() => {
        router.back()
      }}
    >
      <img src="/icons/left-icon.svg" alt="back icon" />
    </div>
  )
}

export default BackButton
