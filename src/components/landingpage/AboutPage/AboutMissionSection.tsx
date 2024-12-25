'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const AboutMissionSection = ({ data }: any) => {
  const Missiondata = useMemo(
    () => data?.find((deta: any) => deta?.name == 'Mission'),
    [data],
  )
  const ValuesData = useMemo(
    () => data?.find((deta: any) => deta?.name == 'Values'),
    [data],
  )
  const VisionData = useMemo(
    () => data?.find((deta: any) => deta?.name == 'Vision'),
    [data],
  )
  return (
    <main className="w-full relative ">
      <div className="w-full h-[220px] rounded-[2452px] bg-black blur-[50px] absolute -top-48 z-50"></div>

      <div className="eclipse-gradient absolute top-1/3 -left-[5%]"></div>
      <section className="max-w-screen-lg 2xl:max-w-screen-ml 3xl:max-w-screen-xl mx-auto w-full h-full relative z-[60] flex justify-center items-center">
        <div className=" px-4 2xl:px-0 relative h-full flex  flex-col justify-start items-start max-w-[780px]">
          <motion.div className="font-montserrat text-white mb-[2.25rem] lg:p-[1.25rem]">
            <h1 className="text-[1.75rem] mb-[1.25rem] font-clash-display">
              Mission
            </h1>

            {!!Missiondata && (
              <div className="text-[1rem] ">
                <div
                  className="break-words text-editor-content"
                  dangerouslySetInnerHTML={{
                    __html: Missiondata?.description,
                  }}
                ></div>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-2 grid-rows-5 relative z-10">
            <motion.img
              //   initial={{
              //     opacity: 0,
              //     x: -100,
              //     visibility: 'hidden',
              //   }}
              //   animate={{
              //     opacity: 1,
              //     x: 0,
              //     visibility: 'visible',
              //   }}
              //   transition={{ duration: 0.5 }}
              src="/images/green-star.svg"
              className="absolute left-[50%] top-16 -translate-x-[50%]"
              alt=""
            />
            <motion.div className="font-montserrat text-white mb-[2.25rem] row-span-2 border-b border-[#474747] p-[1.25rem] relative">
              <h1 className="text-[2rem] mb-[1.25rem] font-clash-display text-[#D9D9D9] ">
                Vision And <br /> Values
              </h1>
            </motion.div>
            <motion.div className="font-montserrat text-white mb-[2.25rem] row-span-5 border-l border-[#474747] p-[1.25rem]">
              <h1 className="text-[1.5rem] mb-[1.25rem] font-clash-display">
                Vision
              </h1>
              {!!VisionData && (
                <div className="text-[1rem] ">
                  <div
                    className="break-words text-editor-content"
                    dangerouslySetInnerHTML={{
                      __html: VisionData?.description,
                    }}
                  ></div>
                </div>
              )}
            </motion.div>
            <motion.div className="font-montserrat text-white mb-[2.25rem] row-span-3 p-[1.25rem]">
              <h1 className="text-[1.5rem] mb-[1.25rem] font-clash-display">
                Value
              </h1>
              {!!ValuesData && (
                <div className="text-[1rem] ">
                  <div
                    className="break-words text-editor-content"
                    dangerouslySetInnerHTML={{
                      __html: ValuesData?.description,
                    }}
                  ></div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutMissionSection
