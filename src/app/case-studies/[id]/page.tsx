import { API_URLS } from '@/constants/ApiRoutes'
import Image from 'next/image'

async function getCaseStudiesDetails(id: string) {
  try {
    const res = await fetch(`${API_URLS.GET_CASE_STUDIES_API}`, {
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
  const caseStudiesDetails = await getCaseStudiesDetails(params.id)

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[3rem]">
      <section className=" max-w-screen-md 2xl:max-w-screen-lg mx-auto w-full h-full px-4 md:px-0">
        <div className="text-[2rem] mb-[1.25rem] font-clash-display font-medium leading-[30px] md:leading-[40px] ">
          {caseStudiesDetails?.title}
        </div>

        <div className="w-full h-full aspect-video relative overflow-hidden !z-20 cursor-pointer transition-all duration-300 ease-in-out mb-[20px]">
          <Image
            src={caseStudiesDetails?.image}
            alt={caseStudiesDetails?.title}
            fill
            className="w-full h-full object-cover object-bottom aspect-video"
          />
        </div>
        <div className="text-justify text-p3 2xl:text-p2">
          <div
            className="break-words text-editor-content"
            dangerouslySetInnerHTML={{
              __html: caseStudiesDetails?.description,
            }}
          ></div>
        </div>
      </section>
    </main>
  )
}

export default Page
