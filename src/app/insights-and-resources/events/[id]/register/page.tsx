import RegisterEvent from '@/components/RegisterEvent/RegisterEvent'
import { API_URLS } from '@/constants/ApiRoutes'
import moment from 'moment'

async function getEventDetails(id: string) {
  try {
    const res = await fetch(`${API_URLS.GET_EVENTS_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
      cache: 'no-store',
    })

    const responseData = await res.json()

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return responseData?.data
  } catch (error) {
    return null
  }
}
const Page = async ({ params }: any) => {
  const { id } = params

  const EventDetails = await getEventDetails(id)
  return (
    <main className="w-full h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-md 2xl:max-w-screen-lg mx-auto w-full h-full">
        <div className="bg-[#252525] md:rounded-[0.625rem] mb-[3rem]">
          <div className="bg-transparent px-[1rem] md:px-[2.25rem] py-[1.5rem] md:py-[3rem] flex flex-col gap-[1rem]">
            <button className="bg-[#F00018] rounded-[0.625rem] text-white py-[0.625rem] w-[8.75rem] text-[1rem]">
              LIVESTREAM
            </button>
            <h2 className="font-medium text-[1rem]">
              {moment(EventDetails?.event_date).format('DD MMMM YYYY')}
            </h2>
            <h1 className="text-[1.5rem]">{EventDetails?.name}</h1>
            <h2 className="font-medium text-[1rem] text-primary">
              {EventDetails?.event_time}
            </h2>
          </div>
        </div>
        <RegisterEvent id={params?.id} />
      </section>
    </main>
  )
}

export default Page
