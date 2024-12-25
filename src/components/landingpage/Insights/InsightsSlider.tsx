'use client'

import React from 'react'
import { motion } from 'framer-motion'
import TeamSlider from '../../TeamSliderComponent/TeamSliderComponent'
import HolidayIdeasSlider from '@/components/TeamSliderComponent/newTest'
import Slider from './Slider'

const InsightSlider = (props: any) => {
  const { data: team } = props

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 10,
    slidesToShow: 2,
    slidesToScroll: 2,
    waitForAnimate: false,
  }
  return (
    <main className="w-full relative my-[6rem]">
      <div className="eclipse-gradient absolute top-1/3 -left-[5%]"></div>
      <section className="max-w-screen-lg 2xl:max-w-screen-2xl mx-auto w-full h-full relative z-[1] flex flex-col gap-[5rem]">
        <div className="w-full h-[350px] px-8 relative">
          <Slider data={team} />
        </div>
      </section>
    </main>
  )
}

export default InsightSlider
