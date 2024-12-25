import { API_URLS } from '@/constants/ApiRoutes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Loader from '@/components/Loader/Loader'
import { AnimatedLoader } from '@/components/Loader/Loading'

const PastSection = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getPastEvents() {
      try {
        setLoading(true)

        let formData = new FormData()

        formData.append('type', 'past')

        const res = await fetch(`${API_URLS.GET_EVENTS_API}`, {
          method: 'POST',
          body: formData,
        })
        const response = await res.json()
        setLoading(false)

        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }

        setData(response.data)
      } catch (error) {
        setData([])
        setLoading(false)
      }
    }

    getPastEvents()
  }, [])

  if (loading)
    return (
      <div className="w-full flex justify-center items-center">
        {/* <Loader /> */}
        <AnimatedLoader />
      </div>
    )
  return (
    <div className="w-full grid md:grid-cols-3 gap-[3rem] ">
      {(!data || (data && data.length == 0)) && !loading && (
        <div className="w-full flex justify-center items-center col-span-full">
          No Events data available.
        </div>
      )}
      {data &&
        !loading &&
        data.length != 0 &&
        data?.map((Us: any, index: any) => (
          <div
            key={index}
            className="w-full h-full rounded-[0.625rem] bg-[#1B1B1B]"
          >
            <div className="w-full h-[15rem] relative overflow-hidden rounded-t-[0.625rem]">
              <Image
                src={Us?.image}
                alt=""
                fill
                className="w-full h-full object-cover object-top aspect-video"
              />
            </div>
            <div className="bg-transparent px-[2.25rem] py-[2rem] flex flex-col gap-[.5rem]">
              <div className="w-full flex gap-2 overflow-x-auto scrollbar_show_on_hover py-2 cursor-pointer">
                {Us?.type?.map((ty: any, index: number) => (
                  <div
                    className="border border-white rounded-[0.625rem] p-[0.5rem] w-fit text-white text-[1rem]"
                    key={index}
                  >
                    {ty?.name}
                  </div>
                ))}
              </div>
              <h2 className="font-medium text-[1rem]">
                {moment(Us?.event_date).format('DD MMMM YYYY')}
              </h2>
              <h1 className="text-[1rem]">{Us?.name}</h1>
              <Link href={`/insights-and-resources/events/${Us?.id}`}>
                <button className="bg-[#3A3A3A] rounded-[0.625rem] text-white py-[0.5rem] w-[8.75rem] text-[1rem]">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  )
}

export default PastSection
