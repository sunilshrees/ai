import React from 'react'

const DetailSection = ({ data }: any) => {
  return (
    <>
      <div className="mb-[1.5rem] md:mb-[3rem]  mx-auto w-full ">
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

      {data?.details &&
        data?.details?.length > 0 &&
        data?.details?.map((detail: any) => (
          <div className="md:max-w-[90%] mx-auto w-full" key={detail?.id}>
            <div className="mb-[7.5rem] max-w-[40rem] w-full ">
              <h1 className="text-[1.75rem] mb-[1.25rem] font-clash-display service-heading">
                {detail?.name}
              </h1>
              <div
                className="break-words text-editor-content"
                dangerouslySetInnerHTML={{
                  __html: detail?.description,
                }}
              ></div>
            </div>
          </div>
        ))}
    </>
  )
}

export default DetailSection
