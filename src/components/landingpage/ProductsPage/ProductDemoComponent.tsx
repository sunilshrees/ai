'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/utils/utils'
import Link from 'next/link'

const ProductDemoComponent = ({ demoData }: any) => {
  const [hovered, setHovered] = useState<null | number>(null)

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[1.125rem] my-[6.25rem]">
      {demoData?.map((data: any, index: any) => (
        <div
          className="w-full h-[20rem] relative rounded-[5px]"
          key={index}
          onMouseEnter={() => {
            setHovered(index)
          }}
          onMouseLeave={() => {
            setHovered(null)
          }}
        >
          <div
            className={cn(
              'w-full h-full relative overflow-hidden mb-[1.25rem] transition-all duration-200 ease-in-out rounded-[5px]',
              {
                vignette: hovered == index,
              },
            )}
          >
            <Image
              src={data?.image}
              alt="product"
              fill
              className="w-full h-full object-cover object-top aspect-video"
            />
          </div>
          {hovered == index && (
            <>
              {/* {hovered == index && (
                <div className=" z-[100] absolute top-[1rem] right-[1rem] ">
                  <div className="bg-black/30 p-4 rounded-[5px] cursor-pointer shadow-md">
                    <img src="/images/right-arrow.svg" alt="" />
                  </div>
                </div>
              )} */}
              <div className=" z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-[1.25rem]">
                {data?.demo_url && (
                  <a href={data?.demo_url} target="_blank">
                    <button className="px-[1.25rem] py-[0.625rem] bg-black/30 text-[1rem] rounded-[5px] whitespace-nowrap">
                      View Demo
                    </button>
                  </a>
                )}
                {data?.video_url && (
                  <a href={data?.video_url} target="_blank">
                    <button className="px-[1.25rem] py-[0.625rem] bg-black/30 text-[1rem] rounded-[5px] whitespace-nowrap ">
                      View Video
                    </button>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProductDemoComponent
