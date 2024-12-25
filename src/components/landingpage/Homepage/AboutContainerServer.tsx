import { API_URLS } from '@/constants/ApiRoutes'
import React from 'react'
import AboutContainer from './AboutContainer'

async function getAboutDetails() {
  try {
    const res = await fetch(`${API_URLS.GET_COMPANY_INTRO_SECTION_API}`, {
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

async function getServiceDetails() {
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

const AboutContainerServer = async () => {
  const data = await getAboutDetails()
  const services = await getServiceDetails()

  return <AboutContainer data={data} services={services} />
}

export default AboutContainerServer
