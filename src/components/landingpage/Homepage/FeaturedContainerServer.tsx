import { API_URLS } from '@/constants/ApiRoutes'
import React from 'react'
import FeaturedContainer from './FeaturedContainer'

async function getCaseStudies() {
  try {
    const res = await fetch(`${API_URLS.GET_CASE_STUDIES_API}`, {
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

async function getBrandDetails() {
  try {
    const res = await fetch(`${API_URLS.GET_CLIENT_SECTION_API}`, {
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

const FeaturedContainerServer = async () => {
  const data = await getCaseStudies()
  const brandList = await getBrandDetails()

  return <FeaturedContainer data={data} brand={brandList} />
}

export default FeaturedContainerServer
