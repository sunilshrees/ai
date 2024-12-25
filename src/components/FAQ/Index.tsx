'use client'

import { cn } from '@/utils/utils'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FAQ = ({ data }: any) => {
  const [selected, setSelected] = useState<null | number>(null)

  if (data && data.length == 0) return null
  return (
    <>
      {data?.map((item: any, index: any) => (
        // <div
        //   key={index}
        //   className={cn('mb-[2.5rem] faq-bg w-full h-[5rem] ', {
        //     'h-auto': selected == index,
        //   })}
        // >
        <AnimatePresence key={index} initial={false}>
          <motion.div
            className={cn('mb-[2.5rem] faq-bg w-full overflow-hidden', {
              'border-[#66BF2B] border-2': selected == index,
              'border-[#131313] border': selected != index,
            })}
            initial={{ height: '5rem' }}
            animate={{
              height: selected === index ? 'auto' : '5rem',
            }}
            exit={{ height: '5rem' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center w-full h-[5rem]">
              <h1 className="px-[1rem] md:px-[2rem]">
                {index + 1 <= 9 ? `0${index + 1}` : index + 1}
              </h1>
              <h2 className="">{item.question}</h2>
              <button
                className={cn(
                  'w-[5rem] h-full rounded-r-[8px] flex justify-center items-center cursor-pointer',
                  {
                    'bg-[#66BF2B]': selected == index,
                    'bg-[#131313]': selected != index,
                  },
                )}
                onClick={() => setSelected(selected === index ? null : index)}
              >
                <img
                  src={
                    selected === index
                      ? '/images/remove-icon.svg'
                      : '/images/add-icon.svg'
                  }
                  alt=""
                />
              </button>
            </div>
            {selected == index && (
              <motion.div
                className="max-w-[70%] mx-auto py-[1.5rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {item.answer}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      ))}
    </>
  )
}

export default FAQ
