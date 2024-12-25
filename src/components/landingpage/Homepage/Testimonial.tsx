'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../../ButtonComponent'
import GetLatestUpdates from '../../GetLatestUpdates'
import Link from 'next/link'

const Testimonial = (props: any) => {
  const { data } = props

  console.log(data, 'data')
  return (
    <main className="w-full h-auto relative py-[2rem] md:py-[55px] 2xl:py-[100px] service-background ">
      <div className="bg-black absolute -top-10 h-[150px] blur-[40px] w-full"></div>
      <div className="eclipse-gradient-testimonial absolute top-[20rem] left-[20%] hidden md:block"></div>
      <section className="max-w-screen-lg 2xl:max-w-screen-ml 3xl:max-w-screen-xl mx-auto w-full h-full  relative px-4 lg:px-0">
        <div className="">
          <h1 className="text-[2.25rem] font-medium font-clash-display col-span-2 row-span-1 leading-10 text-center mb-[3.25rem]">
            Testimonials
          </h1>
          <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-[1rem] lg:gap-[3.5rem]">
            {data?.length > 0 &&
              data?.map((deta: any, i: number) => (
                <div
                  className="h-auto max-h-[350px]  gap-y-[1.5rem] card-gradient-style-2 rounded-[1.50rem] p-[1.875rem]"
                  key={i}
                >
                  <div className="flex gap-x-[0.875rem] w-full h-full">
                    <div className="w-[3.5rem] h-[3.5rem] relative overflow-hidden rounded-full">
                      <Image
                        src={deta?.image}
                        alt="hero image"
                        fill
                        className="w-full h-full object-cover object-top aspect-video"
                        priority
                      />
                    </div>
                    <div className="flex-1 h-full flex flex-col justify-between gap-4 text-[0.875rem] font-montserrat">
                      <h1 className="text-[1.125rem] font-clash-display">
                        {deta?.name}
                      </h1>
                      <p
                        className="break-words text-editor-content"
                        dangerouslySetInnerHTML={{
                          __html: deta?.stories,
                        }}
                      ></p>
                      <h2>Dico user, 2021.03.02</h2>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <Link
          href={'/testimonials'}
          className="w-full flex justify-end items-center my-[1.75rem]"
        >
          <Button variant={'secondary'} className="!w-auto px-[1rem]">
            Explore More
          </Button>
        </Link>
        <GetLatestUpdates />
      </section>
    </main>
  )
}

export default Testimonial
