'use client'

import { cn } from '@/utils/utils'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DetailOtherSection from './DetailOtherSection'
import { AnimatedLoader } from '@/components/Loader/Loading'

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
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full grid grid-cols-9 gap-[3rem]">
        <div className="w-full flex flex-col items-start text-center mb-[1.25rem] col-span-2 gap-[1rem]">
          {data?.map((options: any, index: any) => (
            <button
              className={cn('inactive-service-card !whitespace-nowrap', {
                'active-service-card': selected == options.id,
              })}
              onClick={() => {
                handleChange(options)
              }}
              key={index}
            >
              {options.name}
            </button>
          ))}
        </div>

        <div className="w-full col-span-7">
          <React.Suspense fallback={<AnimatedLoader />}>
            <DetailOtherSection data={selectedData} />
          </React.Suspense>
        </div>
      </section>
    </main>
  )
}

export default ServiceSection
