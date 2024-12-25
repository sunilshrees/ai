import OtherSection from '@/components/landingpage/othersPage/OtherSection'
import { AnimatedLoader } from '@/components/Loader/Loading'
import { API_URLS } from '@/constants/ApiRoutes'
import React from 'react'

async function getOthers() {
  try {
    const res = await fetch(`${API_URLS.GET_OTHERS_API}`, {
      cache: 'no-store',
    })
    const response = await res.json()

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return response?.data
  } catch (error) {
    return null
  }
}
const Service = async () => {
  const data = await getOthers()

  return (
    <React.Suspense fallback={<AnimatedLoader />}>
      <OtherSection data={data} />
    </React.Suspense>
  )
}

export default Service
