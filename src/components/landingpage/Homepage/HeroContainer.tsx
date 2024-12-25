import Image from 'next/image'
import React from 'react'
import { Button } from '../../ButtonComponent'
import HeroImage from '../../../../public/images/hero-image.png'
import { API_BASE, API_URLS } from '@/constants/ApiRoutes'

async function getHeroDetails() {
  try {
    const res = await fetch(`${API_URLS.GET_HERO_SECTION_API}`, {
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
const HeroContainer = async () => {
  const data = await getHeroDetails()

  console.log(data, 'data')

  return (
    <main className="w-full h-[90dvh] md:h-[90vh] relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full absolute object-cover -z-[1] blur-[3px]"
      >
        <source
          src={data?.video ?? '/images/hero-video.mp4'}
          type="video/mp4"
        />
      </video>
      <section className="max-w-screen-lg 2xl:max-w-screen-ml 3xl:max-w-screen-xl mx-auto w-full h-full py-[55px] 2xl:py-[110px] relative z-[1]">
        <div className=" px-4 2xl:px-0 relative h-full">
          <div className="max-w-full md:max-w-[60%] h-full flex flex-col justify-center lg:pl-8">
            <div className="text-[3rem]  font-clash-display font-normal text-white mb-[1rem] leading-[45px] md:leading-[60px] text-gradient-clip">
              {data?.title ? (
                <span>{data?.title}</span>
              ) : (
                <span>
                  Empowering Businesses with <br /> AI-Driven Solutions
                </span>
              )}
            </div>
            <div className="font-montserrat text-white mb-[2.25rem]">
              {data?.description ? (
                <span>{data?.description}</span>
              ) : (
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent et vulputate tortor, in posuere nibh. Praesent sit
                  amet metus porttitor mi consectetur pellentesque in at leo.
                </span>
              )}
            </div>
            <Button className="!w-[9.5rem]">Get Started</Button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 hidden md:block">
          <div className="w-[30rem] h-[36rem] 2xl:w-[38rem] 2xl:h-[44rem] relative overflow-hidden !z-20 cursor-pointer ">
            <Image
              src={data?.image ?? HeroImage}
              alt="logo"
              fill
              className="w-full h-full object-cover object-center aspect-video"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default HeroContainer
