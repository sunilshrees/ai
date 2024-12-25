import React from 'react'

const DetailServiceSection = ({ data }: any) => {
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
      <div className="w-full h-full px-4 md:px-0">
        <img
          src={'/images/service-bg-right.png'}
          alt="logo"
          className="absolute top-1/3 right-0 w-auto h-full max-w-full max-h-[31rem] z-10 hidden md:block"
        />
        <img
          src={'/images/service-bg-left.png'}
          alt="logo"
          className="absolute bottom-0 left-0 w-auto h-full max-w-full max-h-[31rem] z-10 hidden md:block"
        />
        {data?.details &&
          data?.details?.length > 0 &&
          data?.details?.map((detail: any, index: number) => (
            <div
              className="flex justify-between items-center relative z-20"
              key={detail?.id}
            >
              {(index + 1) % 2 != 1 && <div></div>}
              <div className="mb-[7.5rem] max-w-[40rem] w-full pl-0 md:pl-4 lg:pl-0 ">
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
      </div>
    </>
  )
}

export default DetailServiceSection
