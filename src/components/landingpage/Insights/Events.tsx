'use client'

import { Button } from '@/components/ButtonComponent'
import { cn } from '@/utils/utils'
import React, { useState } from 'react'
import UpcomingSection from './UpcomingSection'
import PastSection from './PastSection'

const Events = () => {
  const [selected, setSelected] = useState('upcoming')
  return (
    <>
      <div className="max-w-[50rem] mx-auto w-full flex flex-col justify-center items-center text-center gap-y-[3rem] my-[3rem]">
        <h1 className="text-[1.75rem] font-clash-display">Webinars & Events</h1>
        <p>
          Connect, engage, and learn from the worlds top experts on AI & Machine
          Learning.
        </p>
      </div>
      <div className="flex justify-center items-center gap-[1rem] mb-[3rem]">
        <button
          className={cn(
            'inactive-button-insights transition-all duration-200 ease-in-out',
            {
              'active-button-insights': selected == 'upcoming',
            },
          )}
          onClick={() => setSelected('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={cn(
            'inactive-button-insights transition-all duration-200 ease-in-out',
            {
              'active-button-insights': selected == 'past',
            },
          )}
          onClick={() => setSelected('past')}
        >
          Past
        </button>
      </div>
      <div>
        {selected === 'upcoming' ? <UpcomingSection /> : <PastSection />}
      </div>
    </>
  )
}

export default Events
