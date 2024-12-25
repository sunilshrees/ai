import { API_URLS } from '@/constants/ApiRoutes'
import { Suspense } from 'react'

async function getData(id: string) {
  try {
    const res = await fetch(`${API_URLS.GET_OTHERS_API}`, {
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

const Others = async ({ params }: any) => {
  const data = await getData(params.id)

  return (
    <main className="w-full min-h-screen h-full relative pt-[3rem] md:pt-[6.875rem] pb-[50px]">
      <section className=" max-w-screen-lg 2xl:max-w-screen-ml mx-auto w-full h-full grid grid-cols-9 gap-[3rem]">
        <div className="w-full col-span-7">
          <div className="w-full">
            <h1 className="text-[1.75rem] font-clash-display mb-[3rem] font-semibold">
              {data?.name}
            </h1>
            <div className="text-justify text-[1.25rem]">
              <div
                className="break-words text-editor-content"
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Others
