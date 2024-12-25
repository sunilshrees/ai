import { Button } from '@/components/ButtonComponent'
import Events from '@/components/landingpage/Insights/Events'
import InsightSlider from '@/components/landingpage/Insights/InsightsSlider'
import StorySliderComponent from '@/components/StoriesSliderComponent/StorySliderComponent'
import { API_URLS } from '@/constants/ApiRoutes'
import { cn, truncateString } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getBlogList() {
  try {
    const res = await fetch(`${API_URLS.GET_BLOG_API}`, {
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
async function getResourcesData() {
  try {
    const res = await fetch(`${API_URLS.GET_EBOOKS_API}`, {
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
async function getEventsImagesData() {
  try {
    const res = await fetch(`${API_URLS.LIST_EVENT_IMAGES_API}`, {
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

const Index = async () => {
  const blogData = await getBlogList()
  const resourcesData = await getResourcesData()
  const eventsImagesData = await getEventsImagesData()

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full px-4 lg:px-0">
        <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center  ">
          <h1 className="text-[1.75rem] font-clash-display">Blog & Articles</h1>
          <p>Articles on industry trends, AI technology, and company news.</p>
        </div>

        <div className="w-full my-[3rem] md:my-[6.25rem] grid grid-cols-1 md:grid-cols-3 gap-y-[1.75rem] md:gap-y-0 gap-x-[1.75rem]">
          {blogData &&
            blogData?.length > 0 &&
            blogData?.map((blog: any, index: number) => {
              return (
                <div className="grid " key={index}>
                  <Link
                    href={`/insights-and-resources/blog/${blog.id}`}
                    className={cn(
                      'insights-bg-1 p-[2rem] md:p-[3.125rem]  flex flex-col justify-center md:items-center gap-y-[2rem] order-2 bg-red-700',
                      {
                        'order-1 ': index % 3 != 1,
                      },
                    )}
                  >
                    <img
                      src="/images/blog-icon.svg"
                      className="w-[3rem] h-[3rem]"
                      alt=""
                    />
                    <div className="">
                      <h1 className="text-[1.75rem] mb-[1.25rem] font-clash-display font-semibold leading-8">
                        {blog?.name}
                      </h1>
                      <div className="text-justify text-[1rem]">
                        <div
                          className="break-words text-editor-content"
                          dangerouslySetInnerHTML={{
                            __html: truncateString(blog?.description, 250),
                          }}
                        ></div>
                      </div>
                    </div>
                  </Link>

                  <div
                    className={cn(
                      'py-[2rem] order-1 hidden md:block',

                      {
                        'order-2': index % 3 != 1,
                      },
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[70%] mx-auto w-full h-[6px] bg-[#66BF2B] rounded-[1.25rem]',
                      )}
                    ></div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="faq-bg-2 w-full py-[4.5rem] mb-[6.25rem] relative">
          <div className="eclipse-gradient absolute top-1/3 -left-[25%]"></div>

          <h1 className="text-[1.75rem] font-clash-display text-center mb-[3rem]">
            Whitepapers & E-books:
          </h1>

          <div className="w-full my-[3rem] grid grid-cols-1 md:grid-cols-3 gap-y-[1.75rem] md:gap-y-0 gap-x-[1.75rem] justify-items-center ">
            {resourcesData &&
              resourcesData?.length > 0 &&
              resourcesData?.map((resources: any, index: number) => (
                <a
                  className="flex flex-col justify-center items-center gap-4 font-montserrat text-[1rem] z-50"
                  key={index}
                  href={resources?.attached_files}
                  target="_blank"
                >
                  <Button variant={'primary'} className="!w-auto px-[1.5rem]">
                    Downloadable resources
                  </Button>

                  <h1 className="font-normal font-montserrat">
                    {resources?.name}
                  </h1>
                </a>
              ))}
          </div>
        </div>

        <Events />

        {/* <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center mb-[1.75rem] ">
          <h1 className="text-[1.75rem] font-clash-display">
            Employee Stories
          </h1>
        </div>
        <div className="w-full h-[350px] px-8 relative">
          <StorySliderComponent data={team} />
        </div> */}
        {eventsImagesData && (
          <>
            <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center my-[6.25rem] ">
              <h1 className="text-[1.75rem] font-clash-display">
                Events at Catech.Ai
              </h1>
              <p>{eventsImagesData?.description ?? ''}</p>
            </div>
            <React.Suspense
              fallback={<div className="text-lg">Loading...</div>}
            >
              <InsightSlider data={eventsImagesData?.images} />
            </React.Suspense>
          </>
        )}
      </section>
    </main>
  )
}

export default Index
