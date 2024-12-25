import StorySliderComponent from '@/components/StoriesSliderComponent/StorySliderComponent'
import StorySliderComponent1 from '@/components/StoriesSliderComponent/TestSlider'
import { API_URLS } from '@/constants/ApiRoutes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getCareerOverview() {
  try {
    const res = await fetch(`${API_URLS.GET_CAREERS_OVERVIEW_API}`, {
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
async function getJobList() {
  try {
    const res = await fetch(`${API_URLS.GET_JOBS_API}`, {
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

const Careers = async () => {
  const data = await getCareerOverview()
  const jobList = await getJobList()
  const storiesList = await getEmployeeStories()

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full px-4 md:px-0">
        <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center  ">
          <h1 className="text-[1.75rem] font-clash-display">
            growing. Grow with Us.
          </h1>
          <p>
            If you&apos;re looking to craft a Careers or Join Our Team page for
            a company or organization, here&apos;s a structured overview of what
            it could include:
          </p>
        </div>

        <div className="w-full my-[3rem] md:my-[6.25rem]">
          {(!data || data.length === 0) && <></>}
          {data &&
            data.length != 0 &&
            data?.map((deta: any, index: number) => (
              <div
                className="insights-bg-1 px-8 md:px-[6.25rem] py-4 md:py-[3.125rem] mb-[1.5rem] md:mb-[3rem]"
                key={deta?.id}
              >
                <h1 className="text-[1.75rem] mb-[1.25rem] font-clash-display">
                  {deta?.name}
                </h1>

                <div className="text-justify text-[1rem]">
                  <div
                    className="break-words text-editor-content"
                    dangerouslySetInnerHTML={{
                      __html: deta?.description,
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>

        <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center mb-[3rem] md:mb-[6.25rem] px-4 md:px-0">
          <h1 className="text-[1.75rem] font-clash-display">
            Current Job Openings
          </h1>
          <p>
            We have exciting opportunities across various departments. Explore
            the roles that best match your skills and career aspirations.
          </p>
        </div>

        {jobList && jobList?.length != 0 && (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[3.125rem] my-[6.25rem]">
              {jobList?.map((data: any, index: number) => (
                <div
                  className="insights-bg-1 p-[1.75rem] h-[16.15rem] flex flex-col justify-between"
                  key={index}
                >
                  <h1 className="text-[1.25rem] mb-[1.25rem] font-clash-display service-heading">
                    {data?.name}
                  </h1>
                  <div>
                    <div>{data?.location}</div>
                    <div>{data?.job_type}</div>
                  </div>
                  <div className="w-full flex justify-end items-center">
                    <Link href={`/careers/${data?.id}`}>
                      <div className="w-auto h-auto py-[0.75rem] px-[1rem] bg-[#36363696] rounded-[1.25rem] cursor-pointer">
                        <img src="/images/right-arrow.svg" alt="" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center mb-[1.75rem] ">
          <h1 className="text-[1.75rem] font-clash-display">
            Employee Stories
          </h1>
        </div>
        <div className="w-full md:h-[350px] md:px-8 relative">
          {storiesList && <StorySliderComponent1 data={storiesList} />}
        </div>
      </section>
    </main>
  )
}

export default Careers
