'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right',
  delay: number,
  postiton: number,
) => {
  return {
    hidden: {
      y: direction === 'up' ? postiton : direction === 'down' ? -postiton : 0,
      x:
        direction === 'left' ? postiton : direction === 'right' ? -postiton : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  }
}

const AboutContainer = ({ data, services }: any) => {
  const servicesList = services?.slice(0, 4)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  const router = useRouter()

  return (
    <main className="w-full h-auto relative py-[55px] 2xl:py-[120px] about-background">
      {/* <div className="w-full absolute h-full overflow-hidden ">
        <img
          src={'/images/about-background.png'}
          alt="logo"
          className="absolute -bottom-[5rem] -right-[25rem] w-auto h-full max-w-full max-h-full object-contain rotate-180 about-animated-box opacity-40 z-[100]"
        />
      </div> */}
      <div className="w-full absolute h-full overflow-hidden ">
        <img
          src={'/images/about-background.png'}
          alt="logo"
          className="absolute bottom-[60%] -right-[25rem] w-auto h-full max-w-full max-h-[400px] object-contain rotate-180 about-animated-box opacity-40 z-[100]"
        />
      </div>
      <div className="w-full absolute h-full overflow-hidden ">
        <img
          src={'/images/about-background.png'}
          alt="logo"
          className="absolute bottom-0 -left-[25rem] w-auto h-full max-w-full max-h-[400px] object-contain rotate-180 about-animated-box opacity-40 z-[100]"
        />
      </div>
      <div className="eclipse-gradient absolute top-1/3 -left-[20%]"></div>

      <div className="w-full h-[220px] rounded-[2452px] bg-black blur-[50px] absolute -top-24 z-50"></div>
      <section className="max-w-screen-lg 2xl:max-w-screen-ml 3xl:max-w-screen-xl mx-auto w-full h-full  relative z-[100] px-4 lg:px-0">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[2rem] lg:gap-[8rem]">
          <div className="flex flex-col gap-y-[1.5rem] ">
            <h1 className="text-[2rem] font-medium font-clash-display">
              About Us
            </h1>
            <p className="text-[1rem] font-montserrat">
              {data?.description ??
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem repellat optio sequi. Id sint tempore ipsum numquam iusto accusamus sed saepe officiis impedit ratione sapiente, tempora magni quis necessitatibus ab earum modi temporibus reprehenderit tenetur assumenda sunt aliquam consequuntur? Quaerat?'}
            </p>
          </div>
          <div className="relative h-[300px] w-full ">
            <motion.div
              // initial={{
              //   opacity: 0,
              //   x: 200,
              //   y: -100,
              //   visibility: 'hidden',
              // }}
              // whileInView={{ opacity: 1, x: 0, y: 0, visibility: 'visible' }}
              // transition={{ duration: 0.8 }}
              variants={fadeIn('down', 0.2, 100)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ amount: 0.1, once: true }}
              className="absolute top-0 left-[2rem] w-[13.5rem] h-[8.5rem] p-[10px] flex justify-center items-center shrink-0 font-clash-display card-gradient-style"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="font-medium text-[3.5rem]">
                  {data?.client_number ?? 85} +
                </div>
                <div className="text-[1.25rem]">Client</div>
              </div>
            </motion.div>
            <motion.div
              // initial={{
              //   opacity: 0,
              //   x: -200,
              //   y: 100,
              //   visibility: 'hidden',
              // }}
              // whileInView={{ opacity: 1, x: 0, y: 0, visibility: 'visible' }}
              // transition={{ duration: 0.8 }}
              // viewport={{ amount: 0, once: true }}
              variants={fadeIn('right', 0.4, 100)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ amount: 0.1, once: true }}
              className="absolute top-[9.5rem] left-0 -translate-x-1/5 w-[12.5rem] h-[10.5rem] p-[10px] flex justify-center items-center shrink-0 font-clash-display card-gradient-style"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="font-medium text-[3.5rem]">
                  {data?.years ?? 2} +
                </div>
                <div className="text-[1.25rem]">Years</div>
              </div>
            </motion.div>
            <motion.div
              // initial={{
              //   opacity: 0,
              //   x: 200,
              //   y: 100,
              //   visibility: 'hidden',
              // }}
              // whileInView={{ opacity: 1, x: 0, y: 0, visibility: 'visible' }}
              // transition={{ duration: 0.8 }}
              // viewport={{ amount: 0.5, once: true }}
              variants={fadeIn('left', 0.6, 100)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ amount: 0.1, once: true }}
              className="absolute top-[10rem] left-[13rem] min-w-[10.5rem] h-[8.5rem] p-[10px] flex justify-center items-center shrink-0 font-clash-display card-gradient-style"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="font-medium text-[3.5rem]">
                  {data?.industries ?? 20} +
                </div>
                <div className="text-[1.25rem]">Industries</div>
              </div>
            </motion.div>
          </div>
        </div>
        {services?.length != 0 && (
          <div className="pt-[4rem] md:pt-[18.75rem] w-full">
            <div className="w-full md:h-[650px] grid grid-cols-1 md:grid-cols-6 md:grid-rows-6 gap-[1.5rem]">
              <motion.h1
                // initial={{
                //   opacity: 0,
                //   y: -200,
                //   visibility: 'hidden',
                // }}
                // whileInView={{ opacity: 1, y: 0, visibility: 'visible' }}
                // transition={{ duration: 0.3 }}
                // viewport={{ amount: 0.8, once: true }}
                variants={fadeIn('down', 0.2, 200)}
                initial={isMobile ? 'show' : 'hidden'}
                whileInView={'show'}
                viewport={{ amount: 0.5, once: true }}
                className="text-[2rem] md:text-[2.25rem] font-medium font-clash-display col-span-1 row-span-1 md:col-span-2 md:row-span-1 leading-10"
              >
                Key Services
              </motion.h1>
              {servicesList?.[0]?.id && (
                <motion.div
                  variants={fadeIn('down', 0.4, 200)}
                  initial={isMobile ? 'show' : 'hidden'}
                  whileInView={'show'}
                  viewport={{ amount: 0.5, once: true }}
                  className="flex flex-col justify-center items-center gap-y-[1.5rem] card-gradient-style col-span-1 md:col-span-2 md:row-span-3 py-8 md:py-0"
                >
                  <div className="flex flex-col gap-[2rem]  justify-center items-center md:items-start px-6">
                    <h1 className="text-[1.75rem] font-normal font-clash-display">
                      {servicesList?.[0]?.name}
                    </h1>
                    <p
                      className="link-button font-montserrat "
                      onClick={() =>
                        router.push(
                          `/services?selected=${servicesList?.[0]?.id}`,
                        )
                      }
                    >
                      View details<i className="bx bx-chevron-right ml-1"></i>
                    </p>
                  </div>
                </motion.div>
              )}
              {servicesList?.[1]?.id && (
                <motion.div
                  variants={fadeIn('left', 0.6, 100)}
                  initial={isMobile ? 'show' : 'hidden'}
                  whileInView={'show'}
                  viewport={{ amount: 0.1, once: true }}
                  className="flex flex-col justify-center items-center  gap-y-[1.5rem] col-span-1 row-span-1 md:col-span-2 md:row-span-3 card-gradient-style py-8 md:py-0"
                >
                  <div className="flex flex-col gap-[2rem] justify-center items-center md:items-start px-6">
                    <h1 className="text-[1.75rem] font-normal font-clash-display  break-words">
                      {servicesList?.[1]?.name}
                    </h1>
                    <p
                      className="link-button font-montserrat"
                      onClick={() =>
                        router.push(
                          `/services?selected=${servicesList?.[1]?.id}`,
                        )
                      }
                    >
                      View details<i className="bx bx-chevron-right ml-1"></i>
                    </p>
                  </div>
                </motion.div>
              )}
              {servicesList?.[2]?.id && (
                <motion.div
                  variants={fadeIn('up', 0.6, 100)}
                  initial={isMobile ? 'show' : 'hidden'}
                  whileInView={'show'}
                  viewport={{ amount: 0.1, once: true }}
                  className="flex flex-col justify-center items-center gap-y-[1.5rem] col-span-1 row-span-1 md:col-span-2 md:row-span-3 card-gradient-style py-8 md:py-0"
                >
                  <div className="flex flex-col gap-[2rem] justify-center items-center md:items-start px-6">
                    <h1 className="text-[1.75rem] font-normal font-clash-display">
                      {servicesList?.[2]?.name}
                    </h1>
                    <p
                      className="link-button font-montserrat"
                      onClick={() =>
                        router.push(
                          `/services?selected=${servicesList?.[2]?.id}`,
                        )
                      }
                    >
                      View details<i className="bx bx-chevron-right ml-1"></i>
                    </p>
                  </div>
                </motion.div>
              )}
              {servicesList?.[3]?.id && (
                <motion.div
                  variants={fadeIn('left', 0.6, 100)}
                  initial={isMobile ? 'show' : 'hidden'}
                  whileInView={'show'}
                  viewport={{ amount: 0.1, once: true }}
                  className="flex flex-col justify-center items-center gap-y-[1.5rem] col-span-1 row-span-1 md:col-span-3 md:row-span-3 card-gradient-style py-8 md:py-0"
                >
                  <div className="flex flex-col gap-[2rem]  justify-center items-center md:items-start px-6">
                    <h1 className="text-[1.75rem] font-normal font-clash-display">
                      {servicesList?.[3]?.name}
                    </h1>
                    <p
                      className="link-button font-montserrat"
                      onClick={() =>
                        router.push(
                          `/services?selected=${servicesList?.[3]?.id}`,
                        )
                      }
                    >
                      View details <i className="bx bx-chevron-right ml-1 "></i>
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default AboutContainer
