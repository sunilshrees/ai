'use client'

import Image from 'next/image'
import React from 'react'
import BrandSliderComponent from '../../BrandSliderComponent'
import { Button } from '../../ButtonComponent'
import Link from 'next/link'

const FeaturedContainer = ({ data, brand }: any) => {
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
    <main className="w-full h-auto relative py-[2rem] md:py-[55px] lg:py-[100px]  service-background ">
      <div className="eclipse-gradient-featured absolute top-[10rem] left-1/3 hidden ml:block"></div>
      <section className="max-w-screen-lg 2xl:max-w-screen-ml 3xl:max-w-screen-xl mx-auto w-full h-full px-4 lg:px-0 relative ">
        <div className="">
          <h1 className="text-[2.25rem] font-medium font-clash-display col-span-2 row-span-1 leading-10 text-center mb-[3.25rem]">
            Featured Case Studies
          </h1>
          <div className="w-full h-fit md:h-[500px] grid-cols-1 grid md:grid-cols-12 md:grid-rows-2  gap-[1.5rem]">
            {data?.slice(0, 5)?.map((caseStudies: any, index: number) => (
              <div
                className={`flex flex-col justify-center items-start gap-y-[1.5rem] card-gradient-style rounded-[1.50rem]  relative py-12 md:py-0 ${gridCssClass(
                  index,
                )}`}
                key={index}
              >
                <div className="absolute w-full h-full overflow-hidden">
                  <div className="w-full h-full relative rounded-[1.25rem] overflow-hidden vignette">
                    <Image
                      src={caseStudies?.image ?? '/images/featured.jpg'}
                      alt="hero image"
                      fill
                      className="w-full h-full object-cover object-top aspect-video"
                      priority
                    />
                  </div>
                </div>
                <div className="flex flex-col px-[1.875rem] justify-start items-start z-10">
                  <h1 className="text-[1.25rem] font-medium font-clash-display">
                    {caseStudies?.title}
                  </h1>
                  <h1 className="text-[1rem] font-medium font-clash-display text-[#64BC30]">
                    Case study
                  </h1>
                  <Link
                    href={`/case-studies/${caseStudies?.id}`}
                    className="link-button font-montserrat text-[0.75rem]"
                  >
                    View details<i className="bx bx-chevron-right ml-1"></i>
                  </Link>
                </div>
              </div>
            ))}

            <div className="flex flex-col justify-center items-start gap-y-[1.5rem] md:col-span-4 card-gradient-style rounded-[1.50rem] more-feature-card py-12 md:py-0">
              <div className="flex flex-col px-[1.875rem] justify-start items-start z-10">
                <h1 className="text-[1.25rem] font-medium font-clash-display">
                  100+ <br /> Case Study
                </h1>
                <Link href={'/case-studies'}>
                  <Button variant={'secondary'} className="!w-auto px-[1rem]">
                    Explore More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[6rem] md:pt-[9.375rem]">
          <h1 className="text-[2.25rem] font-medium font-clash-display md:col-span-2 md:row-span-1 leading-10 text-center mb-[3.25rem]">
            Trusted by leading brands worldwide
          </h1>
          <div className="w-full h-auto grid grid-cols-2 md:grid-cols-4 place-content-center place-items-center gap-[1.5rem]">
            <BrandSliderComponent brand={brand} />
          </div>
        </div>
      </section>
    </main>
  )
}

export default FeaturedContainer
