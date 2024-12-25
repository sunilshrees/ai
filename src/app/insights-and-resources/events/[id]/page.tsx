import { API_URLS } from '@/constants/ApiRoutes'
import { cn } from '@/utils/utils'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getEventDetails(id: string) {
  try {
    const res = await fetch(`${API_URLS.GET_EVENTS_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
      cache: 'no-store',
    })

    const responseData = await res.json()

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return responseData?.data
  } catch (error) {
    return null
  }
}

const Page = async ({ params }: any) => {
  const { id } = params

  const EventDetails = await getEventDetails(id)

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-md 2xl:max-w-screen-lg mx-auto w-full h-full">
        <div className="bg-[#252525] md:rounded-[0.625rem] mb-[3rem] md:mb-[6.25rem]">
          <div className="bg-transparent px-[1rem] md:px-[2.25rem] py-[1.5rem] md:py-[3rem] flex flex-col gap-[1rem]">
            <button className="bg-[#F00018] rounded-[0.625rem] text-white py-[0.625rem] w-[8.75rem] text-[1rem]">
              LIVESTREAM
            </button>
            <h2 className="font-medium text-[1rem]">
              {moment(EventDetails?.event_date).format('DD MMMM YYYY')}
            </h2>
            <h1 className="text-[1.5rem]">{EventDetails?.name}</h1>
            <h2 className="font-medium text-[1rem] text-primary">
              {EventDetails?.event_time}
            </h2>

            {EventDetails?.upcoming && (
              <Link href={`/insights-and-resources/events/${id}/register`}>
                <button className="bg-[#3A3A3A] rounded-[0.625rem] text-white py-[0.625rem] w-[8.75rem] text-[1rem]">
                  Register Now
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="w-full mb-[3rem] md:mb-[6.25rem] px-4 md:px-0">
          <h1 className="font-semibold mb-4 text-[1.5rem]">Speakers</h1>

          <div className="grid md:grid-cols-2 gap-[3rem]">
            {EventDetails?.speaker?.length > 0 &&
              EventDetails?.speaker?.map((speaker: any, index: number) => (
                <div
                  className="bg-[#1B1B1B] px-[2.25rem] py-[3rem] flex flex-col gap-[1.25rem] font-clash-display rounded-[0.625rem]"
                  key={index}
                >
                  <div className="w-[8.125rem] h-[8.75rem] relative overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={speaker?.image}
                      alt=""
                      fill
                      className="w-full h-full object-cover object-top aspect-video"
                    />
                  </div>
                  <div className="font-normal text-[1.25rem]">
                    <h1>{speaker?.name}</h1>
                    <h1>{speaker?.position}</h1>
                  </div>

                  <div className="text-[2rem]">Webinars</div>

                  <div className="font-normal text-[1.25rem]">
                    <h1>2024 AI Readiness Report</h1>
                    <h1>Insight and Strategies for Enterprise Success</h1>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="relative px-4 md:px-0">
          <div className="eclipse-gradient absolute top-1/3 -left-[25%]"></div>

          <div className="w-full text-justify text-[1rem]">
            <div
              className="break-words text-editor-content"
              dangerouslySetInnerHTML={{
                __html: EventDetails?.description,
              }}
            ></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
