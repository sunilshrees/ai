'use client'

import { cn } from '@/utils/utils'
import React, { useEffect, useMemo, useState } from 'react'
import DetailServiceSection from './DetailServiceSection'
import { useRouter, useSearchParams } from 'next/navigation'

const ServiceSection = ({ data }: any) => {
  const searchparams = useSearchParams()
  const router = useRouter()

  const selected = useMemo(() => searchparams.get('selected'), [searchparams])

  const handleChange = (deta: any) => {
    router.push(`?selected=${deta?.id}`)
  }

  useEffect(() => {
    if (!selected && data && data.length > 0) {
      router.push(`?selected=${data?.[0]?.id}`)
    }
  }, [data, selected])

  const selectedData = useMemo(
    () => data?.find((deta: any) => deta?.id == selected),
    [selected, data],
  )

  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem]">
      <section className="max-w-screen-md 2xl:max-w-screen-lg 3xl:max-w-screen-ml mx-auto w-full h-full z-[1] flex justify-center items-center px-4 lg:px-0">
        <div className="flex justify-between items-center gap-[0.5rem] md:gap-[1rem] py-2 scrollbar_show_on_hover overflow-x-scroll">
          {data?.map((options: any, index: number) => (
            <button
              className={cn(
                'inactive-service-card !px-[1rem] md:!px-[2rem] whitespace-nowrap ',
                {
                  'active-service-card': selected == options.id,
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
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full py-[55px] 2xl:py-[110px] z-[1]">
        <React.Suspense fallback={<div className="text-lg">Loading...</div>}>
          <DetailServiceSection data={selectedData} />
        </React.Suspense>
      </section>
    </main>
  )
}

export default ServiceSection
