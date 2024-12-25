'use client'

import React from 'react'
import { motion } from 'framer-motion'
import TeamSlider from '../../TeamSliderComponent/TeamSliderComponent'
import HolidayIdeasSlider from '@/components/TeamSliderComponent/newTest'

const AboutTeamSection = ({ data: team }: any) => {
  return (
    <main className="w-full relative my-[6rem]">
      <div className="eclipse-gradient absolute top-1/3 -left-[5%]"></div>
      <section className="max-w-screen-lg 2xl:max-w-screen-2xl mx-auto w-full h-full relative z-[1] flex flex-col gap-[5rem]">
        <div className="flex justify-center items-center text-center text-[2rem] font-clash-display">
          Leadership Team
        </div>
        <div className="w-full h-[350px] px-8 relative">
          {/* <TeamSlider data={team} /> */}
          <HolidayIdeasSlider data={team} />
        </div>
      </section>
    </main>
  )
}

export default AboutTeamSection
