'use client'

import { useEffect, useRef, useState } from 'react'
// import Card from '../components/card/index';

import { AnimatePresence, motion, useCycle } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Story } from './Story'

// import 'swiper/css/effect-coverflow';

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
}

const CardSlider = ({ sliderData }: any) => {
  console.log(sliderData, 'slider')
  return (
    <AnimatePresence>
      <motion.p
        // whileHover={{ scale: 1.1 }}
        variants={itemVariants}
        key={sliderData?.id}
        style={{
          height: '100%',
          width: '100%',
        }}
        className="pb-[30px] md:pb-[40px] "
      >
        <Story data={sliderData} />
      </motion.p>
    </AnimatePresence>
  )
}

const HolidayIdeasSlider = ({ data }: any) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    setWindowWidth(window.innerWidth)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ position: 'relative', paddingBottom: '40px' }}>
      <div
        style={{ margin: 0, width: '100%' }}
        className="holiday-recommended-slider relative px-16"
      >
        <button
          ref={prevRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 z-50 w-12 h-12 p-[1rem] bg-[#36363696] rounded-full cursor-pointer"
        >
          <img
            src="/images/right-arrow.svg"
            className="!rotate-180 "
            alt="carousel-prev"
          />
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 right-0 -translate-y-1/2 z-50 w-12 h-12 p-[1rem] bg-[#36363696] rounded-full cursor-pointer"
        >
          <img
            src="/images/right-arrow.svg"
            className="cursor-pointer"
            alt="carousel-next"
          />
        </button>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          effect={'fade'}
          slidesPerView={windowWidth < 768 ? 1 : 2}
          slideActiveClass="swiper-slide-active-custom"
          loop
          onSwiper={(swiper: any) => {
            // Delay execution for the refs to be set properly
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef?.current
              swiper.params.navigation.nextEl = nextRef?.current
              swiper.navigation.update()
            })
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{ pauseOnMouseEnter: true }}
          // pagination={{ clickable: true }}
        >
          {data.map((deta: any) => (
            <SwiperSlide key={deta?.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                key={deta?.id}
              >
                <CardSlider sliderData={deta} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default HolidayIdeasSlider
