'use client'

import { cn } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Page = () => {
  const [hovered, setHovered] = useState<null | number>(null)

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[3rem]">
      <section className=" max-w-screen-md 2xl:max-w-screen-lg mx-auto w-full h-full px-4 md:px-0">
        <div className="text-[2rem] mb-[1.25rem] font-clash-display font-medium">
          Healthcare Videos
        </div>

        <div className="w-full grid grid-cols-1 gap-[1rem] relative">
          {new Array(2).fill(null)?.map((data, index) => (
            <div
              className="w-full h-[25rem] relative rounded-[5px]"
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
                  src={'/images/product-demo.jpg'}
                  alt="product"
                  fill
                  className="w-full h-full object-cover object-top aspect-video"
                />
              </div>
              {hovered == index && (
                <>
                  <div className=" z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-[1.25rem]">
                    {/* <Link href={'/products/demo/1'}> */}
                    <button className="px-[1.25rem] py-[0.625rem] bg-black/30 text-[1rem] rounded-[5px]">
                      View Website
                    </button>
                    {/* </Link> */}
                  </div>
                  {hovered == index && (
                    <div className=" z-[100] absolute bottom-[1rem] right-[1rem] ">
                      <div className="bg-black/30 p-2 rounded-[5px] cursor-pointer shadow-md">
                        <img src="/images/expand-icon.svg" alt="" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Page
