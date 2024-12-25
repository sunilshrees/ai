import { Button } from '@/components/ButtonComponent'
import { API_URLS } from '@/constants/ApiRoutes'
import Image from 'next/image'
import Link from 'next/link'

async function getCaseStudies() {
  try {
    const res = await fetch(`${API_URLS.GET_CASE_STUDIES_API}`, {
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
  const data = await getCaseStudies()

  const gridCssClass = (index: number) => {
    switch (index) {
      case 0:
        return 'md:col-span-6'

      case 1:
      case 2:
        return 'md:col-span-3'

      case 3:
      case 4:
        return 'md:col-span-4'

      default:
        return ''
    }
  }

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full px-4 lg:px-0">
        <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center mb-[3rem] ">
          <h1 className="text-[1.75rem] font-clash-display">
            Featured Case Studies
          </h1>
        </div>

        <div className="w-full h-fit md:h-[500px] grid-cols-1 grid md:grid-cols-12 md:grid-rows-2  gap-[1.5rem]">
          {data?.map((deta: any, index: number) => (
            <div
              className={`flex flex-col justify-center items-start gap-y-[1.5rem] card-gradient-style  rounded-[1.50rem]  relative py-12 md:py-0 ${gridCssClass(
                index,
              )}`}
              key={index}
            >
              <div className="absolute w-full h-full overflow-hidden">
                <div className="w-full h-full relative rounded-[1.25rem] overflow-hidden vignette">
                  <Image
                    src={deta?.image}
                    alt="hero image"
                    fill
                    className="w-full h-full object-cover object-top aspect-video"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col px-[1.875rem] justify-start items-start z-10">
                <h1 className="text-[1.25rem] font-medium font-clash-display">
                  {deta?.title}
                </h1>
                <h1 className="text-[1rem] font-medium font-clash-display text-[#64BC30]">
                  Case study
                </h1>
                <Link
                  href={`/case-studies/${deta?.id}`}
                  className="link-button font-montserrat text-[0.75rem]"
                >
                  View details<i className="bx bx-chevron-right ml-1"></i>
                </Link>
              </div>
            </div>
          ))}
          {/* <Link
            href={'/case-studies/1'}
            className="flex flex-col justify-center items-start  gap-y-[1.5rem] md:col-span-3 card-gradient-style rounded-[1.50rem] relative py-12 md:py-0"
          >
            <div className="absolute w-full h-full">
              <div className="w-full h-full relative rounded-[1.25rem] overflow-hidden vignette">
                <Image
                  src={'/images/featured.jpg'}
                  alt="hero image"
                  fill
                  className="w-full h-full object-cover object-top aspect-video"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col px-[1.875rem]  justify-center items-start z-10">
              <h1 className="text-[1.25rem] font-medium font-clash-display  break-words">
                Implementation Services
              </h1>
              <h1 className="text-[1rem] font-medium font-clash-display text-[#64BC30]">
                Case study
              </h1>
              <p className="link-button font-montserrat text-[0.75rem]">
                View details<i className="bx bx-chevron-right ml-1"></i>
              </p>
            </div>
          </Link>
          <Link
            href={'/case-studies/1'}
            className="flex flex-col justify-center items-start gap-y-[1.5rem] md:col-span-3 card-gradient-style rounded-[1.50rem] py-12 md:py-0"
          >
            <div className="absolute w-full h-full">
              <div className="w-full h-full relative rounded-[1.25rem] overflow-hidden vignette">
                <Image
                  src={'/images/featured.jpg'}
                  alt="hero image"
                  fill
                  className="w-full h-full object-cover object-top aspect-video"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col px-[1.875rem] justify-start items-start z-10">
              <h1 className="text-[1.25rem] font-medium font-clash-display">
                Data Analytics
              </h1>
              <h1 className="text-[1rem] font-medium font-clash-display text-[#64BC30]">
                Case study
              </h1>
              <p className="link-button font-montserrat text-[0.75rem]">
                View details<i className="bx bx-chevron-right ml-1"></i>
              </p>
            </div>
          </Link>
          <Link
            href={'/case-studies/1'}
            className="flex flex-col justify-center items-start gap-y-[1.5rem] md:col-span-4 card-gradient-style rounded-[1.50rem] py-12 md:py-0"
          >
            <div className="absolute w-full h-full">
              <div className="w-full h-full relative rounded-[1.25rem] overflow-hidden vignette">
                <Image
                  src={'/images/featured.jpg'}
                  alt="hero image"
                  fill
                  className="w-full h-full object-cover object-top aspect-video"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col px-[1.875rem] justify-center items-start z-10">
              <h1 className="text-[1.25rem] font-medium font-clash-display">
                Product Development
              </h1>
              <h1 className="text-[1rem] font-medium font-clash-display text-[#64BC30]">
                Case study
              </h1>
              <p className="link-button font-montserrat text-[0.75rem]">
                View details <i className="bx bx-chevron-right ml-1 "></i>
              </p>
            </div>
          </Link>
          <Link
            href={'/case-studies/1'}
            className="flex flex-col justify-center items-start gap-y-[1.5rem] md:col-span-4 card-gradient-style rounded-[1.50rem] py-12 md:py-0"
          >
            <div className="absolute w-full h-full">
              <div className="w-full h-full relative rounded-[1.25rem] overflow-hidden vignette">
                <Image
                  src={'/images/featured.jpg'}
                  alt="hero image"
                  fill
                  className="w-full h-full object-cover object-top aspect-video"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col px-[1.875rem] justify-start items-start z-10">
              <h1 className="text-[1.25rem] font-medium font-clash-display">
                Product Development
              </h1>
              <h1 className="text-[1rem] font-medium font-clash-display text-[#64BC30]">
                Case study
              </h1>
              <p className="link-button font-montserrat text-[0.75rem]">
                View details <i className="bx bx-chevron-right ml-1 "></i>
              </p>
            </div>
          </Link>
          <Link
            href={'/case-studies/1'}
            className="flex flex-col justify-center items-start gap-y-[1.5rem] md:col-span-4 card-gradient-style rounded-[1.50rem] py-12 md:py-0"
          >
            <div className="absolute w-full h-full">
              <div className="w-full h-full relative rounded-[1.25rem] overflow-hidden vignette">
                <Image
                  src={'/images/featured.jpg'}
                  alt="hero image"
                  fill
                  className="w-full h-full object-cover object-top aspect-video"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col px-[1.875rem] justify-start items-start z-10">
              <h1 className="text-[1.25rem] font-medium font-clash-display">
                Product Development
              </h1>
              <h1 className="text-[1rem] font-medium font-clash-display text-[#64BC30]">
                Case study
              </h1>
              <p className="link-button font-montserrat text-[0.75rem]">
                View details <i className="bx bx-chevron-right ml-1 "></i>
              </p>
            </div>
          </Link> */}
        </div>
      </section>
    </main>
  )
}

export default Index
