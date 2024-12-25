import Loader from '@/components/Loader/Loader'
import { AnimatedLoader } from '@/components/Loader/Loading'
import { API_URLS } from '@/constants/ApiRoutes'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const UpcomingSection = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUpcomming() {
      try {
        setLoading(true)
        let formData = new FormData()

        formData.append('type', 'upcomming')

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
        setLoading(false)

        setData([])
      }
    }

    getUpcomming()
  }, [])

  if (loading)
    return (
      <div className="w-full flex justify-center items-center">
        {/* <Loader /> */}
        <AnimatedLoader />
      </div>
    )
  return (
    <div className="w-full grid md:grid-cols-2 gap-[3rem] ">
      {(!data || (data && data.length == 0)) && !loading && (
        <div className="w-full flex justify-center items-center col-span-full">
          No Events data available.
        </div>
      )}

      {!loading &&
        data &&
        data.length != 0 &&
        data?.map((Us: any, index: any) => (
          <div key={index} className="w-full rounded-[0.625rem]">
            <div className="bg-[#1B1B1B] rounded-[0.625rem]">
              <div className="bg-transparent px-[2.25rem] py-[3rem] flex flex-col gap-[1.25rem] font-clash-display">
                <div className="w-[8.125rem] h-[8.75rem] relative overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={Us?.image}
                    alt=""
                    fill
                    className="w-full h-full object-cover object-top aspect-video"
                  />
                </div>
                <div className="font-normal text-[1.25rem]">
                  <h1>Priya Sharma</h1>
                  <h1>Chief Technology Officer (CTO)</h1>
                </div>

                {/* <div className="text-[1.5rem]">Webinars</div> */}
                <div className="w-full flex gap-2 overflow-x-auto scrollbar_show_on_hover cursor-pointer">
                  {Us?.type?.map((ty: any, index: number) => (
                    <div
                      className="border border-white rounded-[0.625rem] p-[0.5rem] w-fit text-white text-[1rem]"
                      key={index}
                    >
                      {ty?.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#252525] rounded-[0.625rem]">
                <div className="bg-transparent px-[2.25rem] py-[3rem] flex flex-col gap-[1.25rem]">
                  <h2 className="font-medium text-[1.25rem]">
                    {moment(Us?.event_date).format('DD MMMM YYYY')}
                  </h2>
                  <h1 className="text-[1.5rem]">{Us?.name}</h1>
                  <Link href={`/insights-and-resources/events/${Us?.id}`}>
                    <button className="bg-[#3A3A3A] rounded-[0.625rem] text-white py-[0.625rem] w-[8.75rem] text-[1rem]">
                      Register Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default UpcomingSection
