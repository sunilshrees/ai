import React from 'react'

const DetailOtherSection = ({ data }: any) => {
  return (
    <>
      <div className="mb-[7.5rem] max-w-[50rem] mx-auto w-full px-4 md:px-0">
        <h1 className="text-[1.75rem] mb-[1.25rem] font-clash-display">
          {data?.name}
        </h1>
        <div className="text-justify text-p3 2xl:text-p2">
          <div
            className="break-words text-editor-content"
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
          ></div>
        </div>
      </div>
    </>
  )
}

export default DetailOtherSection
