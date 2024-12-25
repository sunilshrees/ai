'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './TeamSlider.css'
import { Team } from './Team'

const TeamSlider: React.FC<any> = ({ data }) => {
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
      <img
        src="/images/carousel-next.svg"
        className="absolute left-0 top-1/2 z-[100] -translate-y-1/2 !rotate-180 cursor-pointer"
        alt="carousel-prev"
        onClick={() => {
          setDirection(1)
          setCurrentSlide(
            (prevSlide) => (prevSlide - 2 + data.length) % data.length,
          )
        }}
      />
      <img
        src="/images/carousel-next.svg"
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 cursor-pointer"
        alt="carousel-next"
        onClick={() => {
          setDirection(1)
          setCurrentSlide((prevSlide) => (prevSlide + 2) % data.length)
        }}
      />
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
            <Team {...data?.[currentSlide]} />
            {data?.[currentSlide + 1] && <Team {...data?.[currentSlide + 1]} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TeamSlider
