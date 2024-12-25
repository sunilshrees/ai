import ServiceSection from '@/components/landingpage/ServicePage/ServiceSection'
import { API_URLS } from '@/constants/ApiRoutes'
import React from 'react'

async function getServices() {
  try {
    const res = await fetch(`${API_URLS.GET_SERVICE_API}`, {
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
  const data = await getServices()

  return (
    <React.Suspense fallback={<div className="text-lg">Loading...</div>}>
      <ServiceSection data={data} />
    </React.Suspense>
  )
}

export default Service
