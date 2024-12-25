'use client'

import { cn } from '@/utils/utils'
import { useEffect, useState } from 'react'
import DetailSection from './DetailSection'

const IndustriesSection = ({ data }: any) => {
  const [selected, setSelected] = useState<any>(null)

  const handleChange = (deta: any) => {
    setSelected(deta)
  }

  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(data?.[0])
    }
  }, [data])

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem]">
      <section className="max-w-screen-md 2xl:max-w-screen-lg 3xl:max-w-screen-ml mx-auto w-full h-full z-[1] flex justify-center items-center  ">
        <div className="flex justify-between items-center gap-[0.5rem] md:gap-[1rem] py-2 scrollbar_show_on_hover overflow-x-scroll">
          {data?.map((options: any, index: number) => (
            <button
              className={cn(
                'inactive-service-card !px-[1rem] md:!px-[2rem] whitespace-nowrap',
                {
                  'active-service-card': selected?.id == options.id,
                },
              )}
              onClick={() => {
                handleChange(options)
              }}
              key={index}
            >
              {options.name}
            </button>
          ))}
        </div>
      </section>
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full py-[3.5rem] md:py-[7rem] z-[1] relative ">
        <div className="w-[1px] h-full absolute left-4 lg:left-0 -top-8 bg-primary rounded-full"></div>
        <div className="w-[0.5rem] h-[0.5rem] absolute left-[0.75rem] lg:-left-[0.25rem] top-[4.5rem] lg:top-[8rem] bg-primary rounded-full"></div>

        <div className="ml-12">
          <DetailSection data={selected} />
        </div>
      </section>
    </main>
  )
}

export default IndustriesSection
