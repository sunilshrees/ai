'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

const AboutHeroSection = ({ data }: any) => {
  const historyData = useMemo(
    () => data?.find((deta: any) => deta?.name == 'History'),
    [data],
  )

  return (
    <main className="w-full min-h-[80svh] md:min-h-[80vh] 4xl:h-auto relative">
      {/* <img
        src="/images/about-animated-bg.gif"
        className="w-full h-full absolute object-cover -z-[1] blur-[5px]"
      /> */}
      <img
        src="/images/about-img.png"
        className="w-full h-full absolute object-cover -z-[1] blur-[5px]"
      />
      <section className="max-w-screen-lg 2xl:max-w-screen-ml 3xl:max-w-screen-xl mx-auto w-full h-full py-[55px] 2xl:py-[110px] relative z-[1] flex justify-center items-center">
        <div className=" px-4 2xl:px-0 relative h-full flex  flex-col justify-start items-start max-w-[780px] pt-[4rem]">
          <motion.div
            initial={{
              opacity: 0,
              x: -400,
              visibility: 'hidden',
            }}
            animate={{
              opacity: 1,
              x: 0,
              visibility: 'visible',
            }}
            transition={{ duration: 0.4 }}
            className="text-[2rem]  font-clash-display font-normal text-white mb-[1rem] md:leading-[60px] "
          >
            History and Mission of the Company
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 400,
              visibility: 'hidden',
            }}
            animate={{
              opacity: 1,
              x: 0,
              visibility: 'visible',
            }}
            transition={{ duration: 0.4 }}
            className="font-montserrat text-white mb-[2.25rem]"
          >
            <h1 className="text-[1.75rem] mb-[1.25rem] font-clash-display">
              History
            </h1>
            {!!historyData && (
              <div className="text-[1rem] max-h-[19.5rem] h-full overflow-y-scroll pb-32 text-justify">
                <div className="text-justify text-p3 2xl:text-p2">
                  <div
                    className="break-words text-editor-content"
                    dangerouslySetInnerHTML={{
                      __html: historyData?.description,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default AboutHeroSection
