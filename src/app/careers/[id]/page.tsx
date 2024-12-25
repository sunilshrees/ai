import JobApplyButton from '@/components/JobApplyButton'
import { API_URLS } from '@/constants/ApiRoutes'
import React from 'react'

async function getJobDetails(id: string) {
  try {
    const res = await fetch(`${API_URLS.GET_JOBS_API}`, {
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
  const JobDetails = await getJobDetails(params.id)

  if (!JobDetails) return <>Something went wrong</>

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full grid grid-cols-1 md:grid-cols-6 gap-[1rem] md:gap-[3rem] relative px-4 md:px-0">
        <div className="w-full mb-[1.25rem] md:col-span-2 gap-[1rem] md:sticky top-[12rem] md:h-[18.75rem]">
          <div className="flex flex-col justify-between">
            <h1 className="text-[1.5rem] mb-[1.5rem] font-clash-display service-heading">
              {JobDetails?.name}
            </h1>
            <div className="flex gap-2 mb-1">
              <img src="/images/location.svg" alt="" />
              <h1> {JobDetails?.location}</h1>
            </div>
            <div className="mb-[1.75rem]">
              {/* <div>Public Sector</div> */}
              <div> {JobDetails?.job_type}</div>
            </div>
            <JobApplyButton id={JobDetails?.id} />
          </div>
        </div>

        <div className="w-full md:col-span-4">
          <div className="w-full text-justify text-[1rem]">
            <div
              className="break-words text-editor-content"
              dangerouslySetInnerHTML={{
                __html: JobDetails?.description,
              }}
            ></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
