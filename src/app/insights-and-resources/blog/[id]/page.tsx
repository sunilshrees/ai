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
async function getBlog(id: string) {
  try {
    const res = await fetch(`${API_URLS.GET_BLOG_API}`, {
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
  const blogDetails = await getBlog(params.id)
  const blogData = await getBlogList()

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-md 2xl:max-w-screen-lg mx-auto w-full h-full px-4 md:px-0">
        <div className="text-[1.75rem] mb-[1.25rem] font-clash-display font-semibold leading-[30px] md:leading-[40px]">
          {blogDetails?.name}
        </div>

        <div className="w-full h-full aspect-video relative overflow-hidden !z-20 cursor-pointer transition-all duration-300 ease-in-out mb-[20px]">
          <Image
            src={blogDetails?.image}
            alt={blogDetails?.title}
            fill
            className="w-full h-full object-cover object-bottom aspect-video"
          />
        </div>
        <div className="text-justify text-p3 2xl:text-p2">
          <div
            className="break-words text-editor-content"
            dangerouslySetInnerHTML={{
              __html: blogDetails?.description,
            }}
          ></div>
        </div>
      </section>

      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full px-4 md:px-0">
        <div className="w-full my-[6.25rem] grid grid-cols-1 md:grid-cols-3 gap-y-[1.75rem] md:gap-y-0 gap-x-[1.75rem] relative">
          <div className="eclipse-gradient absolute top-1/3 -left-[25%]"></div>

          {blogData?.slice(0, 3)?.map((blog: any, index: number) => {
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
      </section>
    </main>
  )
}

export default Page
