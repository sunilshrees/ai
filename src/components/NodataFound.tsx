import React from 'react'

const NodataFound = ({ content }: { content?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <img
        src={'/images/empty.png'}
        alt="empty"
        className="w-[100px] h-[100px]"
      />
      <div className="font-poppins text-[18px] font-semibold">
        {content ?? 'No data Found'}
      </div>
    </div>
  )
}

export default NodataFound
