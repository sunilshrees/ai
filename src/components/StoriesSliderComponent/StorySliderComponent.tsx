'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './TeamSlider.css'
import { Story } from './Story'

const StorySliderComponent: React.FC<any> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const variants = {
    enter: (direction: number) => ({
      // x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute' as const,
    }),
    center: {
      // x: 0,
      opacity: 1,
      position: 'absolute' as const,
    },
    exit: (direction: number) => ({
      // x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute' as const,
    }),
  }
  if (!data) return null

  return (
    <div className="team-slider !px-16">
      <div
        className="w-auto h-auto p-[1rem] bg-[#36363696] rounded-full absolute left-0 top-1/2 z-20 -translate-y-1/2 cursor-pointer"
        onClick={() => {
          setDirection(1)
          setCurrentSlide(
            (prevSlide) => (prevSlide - 2 + data.length) % data.length,
          )
        }}
      >
        <img src="/images/right-arrow.svg" className="!rotate-180 " alt="" />
      </div>

      <div
        className="w-auto h-auto p-[1rem] bg-[#36363696] rounded-full absolute right-0 top-1/2 z-20 -translate-y-1/2 cursor-pointer"
        onClick={() => {
          setDirection(1)
          setCurrentSlide((prevSlide) => (prevSlide + 2) % data.length)
        }}
      >
        <img src="/images/right-arrow.svg" alt="" />
      </div>
      <div className="team-container">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="team-wrapper"
          >
            <Story {...data?.[currentSlide]} />
            {data?.[currentSlide + 1] && (
              <Story {...data?.[currentSlide + 1]} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default StorySliderComponent
