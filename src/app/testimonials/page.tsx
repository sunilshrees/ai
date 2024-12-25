import { API_URLS } from '@/constants/ApiRoutes'
import Image from 'next/image'
import React from 'react'

async function getEmployeeStories() {
  try {
    const res = await fetch(`${API_URLS.GET_STORIES_API}`, {
      cache: 'no-store',
    })
    const response = await res.json()

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return response?.data
  } catch (error) {
    return null
  }
}
const Testimonials = async () => {
  const storiesList = await getEmployeeStories()

  return (
    <main className="w-full min-h-screen h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full">
        <div className="w-full flex justify-center items-center text-center mb-[1.25rem] ">
          <h1 className="text-[1.75rem] font-clash-display">Testimonials</h1>
        </div>
        <div className="grid grid-cols-2 gap-[1.75rem]">
          {storiesList &&
            storiesList?.length > 0 &&
            storiesList?.map((data: any, i: number) => (
              <div
                className="h-auto max-h-[350px]  gap-y-[1.5rem] card-gradient-style-2 rounded-[1.50rem] p-[1.875rem]"
                key={i}
              >
                <div className="flex gap-x-[0.875rem] w-full h-full">
                  <div className="w-[3.5rem] h-[3.5rem] relative overflow-hidden rounded-full">
                    <Image
                      src={data?.image}
                      alt="hero image"
                      fill
                      className="w-full h-full object-cover object-top aspect-video"
                      priority
                    />
                  </div>
                  <div className="flex-1 h-full flex flex-col justify-between gap-4 text-[0.875rem] font-montserrat">
                    <h1 className="text-[1.125rem] font-clash-display">
                      {data?.name}
                    </h1>
                    <p
                      className="break-words text-editor-content"
                      dangerouslySetInnerHTML={{
                        __html: data?.stories,
                      }}
                    ></p>
                    <h2>Dico user, 2021.03.02</h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  )
}

export default Testimonials
